import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

const SCOPES = [
  "user-read-recently-played",
  "user-read-currently-playing",
].join(" ");

const STATE_COOKIE = "spotify_oauth_state";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Missing SPOTIFY_CLIENT_ID or SPOTIFY_REDIRECT_URI. See .env.example.",
      },
      { status: 500 }
    );
  }

  const state = randomBytes(16).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return NextResponse.redirect(url);
}
