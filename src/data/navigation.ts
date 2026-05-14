export type NavLeaf = { readonly href: string; readonly label: string };

export type NavGroup = {
  readonly label: string;
  readonly children: readonly NavLeaf[];
};

export type MainNavEntry = NavLeaf | NavGroup;

export function isNavGroup(entry: MainNavEntry): entry is NavGroup {
  return "children" in entry;
}

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Story" },
  {
    label: "Hobbies",
    children: [
      { href: "/music", label: "Music" },
      { href: "/cooking", label: "Cooking" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly MainNavEntry[];

/** Home hero “chapter” menu — mirrors main nav with short hints */
export const titleMenu = [
  { num: "01", href: "/story", title: "Story", hint: "Experiences & stack" },
  { num: "02", href: "/music", title: "Soundtrack", hint: "What I play while building" },
  { num: "03", href: "/cooking", title: "Kitchen", hint: "Flavor, people, experiments" },
  { num: "04", href: "/projects", title: "Missions", hint: "Shipped work and experiments" },
  { num: "05", href: "/contact", title: "Comms", hint: "Say hello" },
] as const;
