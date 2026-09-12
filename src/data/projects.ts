export type ProjectKind = "app" | "game" | "research";

export interface Project {
  id: string;
  title: string;
  image: string;
  video: string;
  tags: string[];
  description: string;
  github: string;
  demo: string;
  year: string;
  category: string;
  /** Archive filter category */
  kind: ProjectKind;
  features: string[];
  selected?: boolean;
  attribution?: { label: string; url: string };
  caseStudy: {
    problem: string;
    role: string;
    constraints: string;
    decisions: string;
    result: string;
    learned: string;
  };
}

export const projects: Project[] = [
  {
    id: "finsearch",
    title: "FinSearch",
    selected: true,
    image: "/assets/images/FinSearch.png",
    video: "",
    tags: ["Python", "FastAPI", "FAISS", "React", "SQLite", "BM25"],
    description:
      "Find the useful bits in long company reports, whether you know the exact words to search for or just have a question in mind.",
    github: "https://github.com/rryyan21/finsearch",
    demo: "",
    year: "2026",
    category: "Finding information",
    kind: "app",
    features: [
      "Search reports from 50 public companies in one place",
      "Try keyword search, search by meaning, or a mix of both",
      "Read the matching passages without digging through whole reports",
      "Compare how well the different search approaches work",
    ],
    caseStudy: {
      problem:
        "Company reports are long, and the information you want rarely sits neatly in one place. I wanted a way to find useful passages without reading every document from start to finish.",
      role: "Built FinSearch to collect company reports, make them searchable, and show the matching passages in a simple interface.",
      constraints:
        "People don’t always use the same words as the document they’re looking for. A search also needs to feel quick enough that trying another question is easy.",
      decisions:
        "Added three ways to search: matching exact words, matching meaning, and combining the two. Then I built a way to compare the results instead of judging the search by a few lucky examples.",
      result:
        "FinSearch searches more than 36,000 passages from 192 reports across 50 companies. You can switch between search approaches and see what each one finds.",
      learned:
        "Making search work is different from knowing whether it works well. Building a way to compare results became just as important as the search itself.",
    },
  },
  {
    id: "resumetailor",
    title: "ResumeTailor",
    selected: true,
    image: "/assets/images/ResumeTailor.png",
    video: "",
    tags: ["JavaScript", "WebAssembly", "LaTeX", "Web Workers"],
    description:
      "A friend’s resume tool, remade for my own LaTeX resume format with custom role presets, bullet choices, and PDF controls.",
    github: "https://github.com/rryyan21/resumetailor",
    demo: "",
    year: "2026",
    category: "Everyday tools",
    kind: "app",
    features: [
      "Choose a starting point for different kinds of roles",
      "Pick the experiences, projects, and bullets to include",
      "Preview and download a PDF, with a heads-up if it runs over one page",
      "Keep your selections between visits while leaving the master resume untouched",
    ],
    caseStudy: {
      problem:
        "My friend had built Resuméer, a tool for tailoring resumes. I took that as a starting point and remade it to work with my own LaTeX resume format and the way I apply to different roles.",
      role: "Reworked the editor around my resume structure and added features for my workflow: Quant, Big Tech, and Robotics presets, alternative bullet wording, a GPA toggle, and saved selections.",
      constraints:
        "Changing a selection should never damage the original resume. I also wanted the finished PDF to be made in the browser, without sending the document to a separate service.",
      decisions:
        "Kept one master resume and made the editor choose which parts to include. I added role-specific starting points and controls for individual bullets, then connected those choices to a PDF preview and download with a warning for documents longer than one page.",
      result:
        "A working editor that lets me assemble a resume for a role without maintaining another copy. It includes a GPA toggle and a warning when the document goes over one page.",
      learned:
        "Remaking an existing tool meant understanding what already worked and where my own resume needed something different. Keeping my master file intact made it easier to try changes without losing the original.",
    },
    attribution: {
      label: "Remade from my friend Vikram Anantha’s Resuméer",
      url: "https://github.com/vikramanantha/resumeer",
    },
  },
  {
    id: "project6",
    selected: true,
    caseStudy: {
      problem:
        "Preparing for an interview often means jumping between company websites, notes, questions, and profiles. I wanted to bring that work into one place.",
      role: "Built a workspace that connects company research, interview preparation, and contact discovery, with a personal dashboard for saved information.",
      constraints:
        "There’s plenty of information available. The challenge is organizing it so someone can turn it into useful preparation rather than another pile of tabs.",
      decisions:
        "Put company search, interview insights, and contacts around a dashboard that people could return to as their research grew.",
      result:
        "A beta workspace for researching companies, preparing for interviews, and keeping track of what you find.",
      learned:
        "Finding information is only the first step. Helping someone come back to it and use it is part of the product too.",
    },
    title: "Compli",
    image: "/assets/images/Project6.jpg",
    video: "",
    tags: ["TypeScript", "Python", "React", "Next.js", "Tailwind"],
    description:
      "A single workspace for company research, interview prep, and the people you want to connect with.",
    github: "https://github.com/rryyan21/compli",
    demo: "",
    year: "2025",
    category: "Job search",
    kind: "app",
    features: [
      "Look up company information and news",
      "Collect interview questions and preparation notes",
      "Find relevant professional contacts",
      "Save companies and come back to your research",
    ],
  },
  {
    id: "project5",
    selected: false,
    caseStudy: {
      problem:
        "Renters need a clear record of a property’s condition, but a folder of photos alone is difficult to explain or share.",
      role: "Worked on the React and Next.js interface and the workflow that turns room photos and notes into PDF reports with email delivery.",
      constraints:
        "Uploaded images must remain legible in generated documents, and report attachments need to survive the email workflow.",
      decisions:
        "Organized evidence by room, combined photos with notes, and used a Node.js email backend to deliver the finished PDF.",
      result:
        "A reporting workflow from property photos and annotations to an exportable, shareable PDF.",
      learned:
        "The quality of an export matters as much as the interface used to create it. Image layout and attachment delivery deserve their own attention.",
    },
    title: "ProofIt",
    image: "/assets/images/Project5.jpg",
    video: "",
    tags: ["React", "Node.js", "TypeScript", "Next.js", "Tailwind"],
    description:
      "Turn move-in photos and notes into a clear report you can keep or share with your landlord.",
    github: "https://github.com/pereddysruthi21/ProofIt",
    demo: "",
    year: "2025",
    category: "Web App",
    kind: "app",
    features: [
      "Image uploads with annotations and notes",
      "PDF generation with room data and images",
      "One click email delivery with file attachments",
    ],
  },
  {
    id: "project3",
    selected: false,
    caseStudy: {
      problem:
        "A bus-safety prototype needed to connect visual detection near an entry zone to a physical response.",
      role: "Combined Python and OpenCV motion detection with Arduino-controlled servos in a water-jet demonstration.",
      constraints:
        "Outdoor lighting affects detection, and the camera-to-servo loop crosses software and hardware boundaries.",
      decisions:
        "Separated video processing from Arduino actuation and tuned detection around the entry-zone demonstration.",
      result:
        "A hardware prototype linking camera input, motion detection, and servo-controlled water jets.",
      learned:
        "A working vision model is only one part of a physical system. Detection conditions and actuator behavior have to be tested together.",
    },
    title: "W.A.I.L.A.",
    image: "/assets/images/Project3.jpg",
    video: "/assets/images/Project3Demo.mp4",
    tags: ["Python", "OpenCV", "Arduino"],
    description:
      "A camera-and-Arduino experiment that connects motion near a bus entrance to a small water-jet response.",
    github: "",
    demo: "",
    year: "2023",
    category: "Computer Vision",
    kind: "research",
    features: [
      "Motion detection with OpenCV",
      "Servo control with Arduino",
      "Real-time alerts and logs",
    ],
  },
  {
    id: "project4",
    selected: false,
    caseStudy: {
      problem:
        "A grappling game needs movement to feel responsive while several players share the same world.",
      role: "Built a JavaScript browser game with a Node.js WebSocket server and momentum-based grappling mechanics.",
      constraints:
        "Collision handling, network timing, and player input all affect whether shared movement feels consistent.",
      decisions:
        "Used WebSockets for real-time communication and custom movement calculations for the grappling mechanic.",
      result:
        "A multiplayer prototype supporting up to four players, with map and character variations.",
      learned:
        "Multiplayer exposes assumptions that local gameplay hides. Movement rules and synchronization need to be designed together.",
    },
    title: "Multiplayer Grapple Game",
    image: "/assets/images/Project4.jpg",
    video: "",
    tags: ["JavaScript", "Node.js", "HTML", "CSS"],
    description:
      "A browser game where friends swing around with grappling hooks and share the same arena.",
    github: "https://github.com/rryyan21/Grapple-Arena",
    demo: "",
    year: "2022",
    category: "Game Dev",
    kind: "game",
    features: [
      "Real-time multiplayer with WebSockets",
      "Physics-based grappling and movement",
      "Custom maps and skins",
    ],
  },
  {
    id: "project1",
    selected: false,
    caseStudy: {
      problem:
        "Recreating a small action-game experience meant connecting movement, enemies, damage, and progression into one playable loop.",
      role: "Built a Hollow Knight-inspired game in Greenfoot and Java, including character movement, enemy behavior, and game-state logic.",
      constraints:
        "The project had to fit Greenfoot’s actor model while keeping character behavior and game rules understandable.",
      decisions:
        "Used object-oriented structures for actors and behavior, then connected sprites, animation, audio, and level progression.",
      result:
        "A playable learning project with enemies, health, collectibles, and multiple levels.",
      learned:
        "Inheritance is useful when behaviors truly overlap. Building a game made the tradeoffs in object-oriented design tangible.",
    },
    title: "Janky Hollow Knight",
    image: "/assets/images/Project1.jpg",
    video: "/assets/images/Project1Demo.mp4",
    tags: ["Greenfoot", "Java", "JavaScript"],
    description:
      "My take on a Hollow Knight-inspired game, with enemies, collectibles, and plenty of lessons in making movement feel right.",
    github: "https://github.com/rryyan21/Janky-Hollow-Knight-",
    demo: "",
    year: "2024",
    category: "Game Development",
    kind: "game",
    features: [
      "Custom character movement and physics system",
      "Enemy AI with different behavior patterns",
      "Health and damage system",
      "Collectible items and power-ups",
      "Level design and progression",
    ],
  },
  {
    id: "project2",
    selected: false,
    caseStudy: {
      problem:
        "Tic-tac-toe is a small enough game to explore how search decisions become an interactive opponent.",
      role: "Implemented minimax-based move selection and connected a Python/Django backend to an HTML and JavaScript interface.",
      constraints:
        "The game needed consistent board state across user input, AI turns, and saved match history.",
      decisions:
        "Kept move selection algorithmic and paired the game with user sessions and match logging.",
      result:
        "A browser-based AI gameplay experiment with authentication and game history.",
      learned:
        "A small game makes state-management mistakes visible quickly. The search algorithm and the interface need the same definition of a valid move.",
    },
    title: "AI Tic Tac Toe",
    image: "/assets/images/Project2.jpg",
    video: "/assets/images/Project2Demo.mp4",
    tags: ["Python", "HTML", "JavaScript"],
    description:
      "A tic-tac-toe game with a computer opponent that thinks ahead and keeps track of your matches.",
    github: "",
    demo: "",
    year: "2023",
    category: "AI",
    kind: "app",
    features: [
      "AI opponent with minimax algorithm",
      "User authentication and sessions",
      "Live match logging and win tracking",
    ],
  },
  {
    id: "WIP",
    selected: false,
    caseStudy: {
      problem: "",
      role: "",
      constraints: "",
      decisions: "",
      result: "",
      learned: "",
    },
    title: "Next chapter",
    image: "/assets/images/WIP.png",
    video: "",
    tags: [],
    description: "",
    github: "",
    demo: "",
    year: "",
    category: "",
    kind: "app",
    features: [],
  },
];
