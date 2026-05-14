import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { exchangeSpotifyCode } from "@/lib/spotifyServer";

const STATE_COOKIE = "spotify_oauth_state";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const err = searchParams.get("error");

  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const expected = cookieStore.get(STATE_COOKIE)?.value;
  cookieStore.delete(STATE_COOKIE);

  if (!expected || expected !== state) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Server missing Spotify env vars" },
      { status: 500 }
    );
  }

  let refreshToken: string;
  try {
    const tokens = await exchangeSpotifyCode(
      code,
      redirectUri,
      clientId,
      clientSecret
    );
    if (!tokens.refresh_token) {
      return NextResponse.json(
        {
          error:
            "No refresh_token returned. Revoke app access in Spotify account settings and try again.",
        },
        { status: 400 }
      );
    }
    refreshToken = tokens.refresh_token;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Token exchange failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const tokenDisplay = escapeHtml(refreshToken);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Spotify connected</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 42rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    pre { word-break: break-all; background: #111; color: #eee; padding: 1rem; border-radius: 8px; font-size: 12px; }
    button { margin-top: 0.75rem; padding: 0.5rem 1rem; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Spotify OAuth complete</h1>
  <p>Copy this refresh token into <code>SPOTIFY_REFRESH_TOKEN</code> in your server environment (e.g. Vercel env, <code>.env.local</code>). Never commit it to git.</p>
  <pre id="token">${tokenDisplay}</pre>
  <button type="button" id="copy">Copy refresh token</button>
  <p><small>You can close this tab.</small></p>
  <script>
    document.getElementById("copy").onclick = function () {
      var t = document.getElementById("token").textContent;
      navigator.clipboard.writeText(t).then(function () { alert("Copied"); });
    };
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
