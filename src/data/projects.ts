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
    features: string[];
    details: string[];
    challenges: string[];
    achievements: string[];
  }
  
    export const projects: Project[] = [
      {
        id: "project6",
        title: "Compli - AI-Powered job preparation",
        image: "/assets/images/Project6.jpg",
        video: "/assets/images/Project4Demo.mp4",
        tags: ["TypeScript", "Python", "React", "Next.js", "Tailwind"],
              description:
          "An all-in-one job preparation platform that helps you research companies and prepare for interviews.",
        github: "https://github.com/rryyan21/compli",
        demo: "/projects/project6/demo",
        year: "2025",
              category: "AI",
        details: [
          "Developed an all-in-one platform combining company research, interview preparation, and networking tools.",
          "Built with React and Next.js frontend, integrated with AI-powered search and data aggregation systems.",
          "Implemented secure user authentication with Google Sign-in and personal dashboard functionality.",
          "Deployed on modern cloud infrastructure with 99.99% uptime and industry-standard security practices.",
        ],
        features: [
          "Company search with instant access to official websites, summaries, and news",
          "Interview insights database with real questions, experiences, and prep plans",
          "Contact discovery to find LinkedIn profiles by company, role, or university",
          "Personal dashboard to save companies and track research progress",
          "Privacy-focused design with secure data handling",
        ],
        challenges: [
          "Integrating multiple data sources for comprehensive company information",
          "Building fast, reliable search functionality across diverse datasets",
          "Designing an intuitive interface that reduces job search complexity",
        ],
        achievements: [
          "Successfully launched beta version with positive user feedback",
          "Created a unified platform that eliminates tab-switching during job searches",
          "Implemented robust privacy and security measures for user data protection",
        ],
      },
    {
      id: "project5",
      title: "ProofIt",
      image: "/assets/images/Project5.jpg",
      video: "/assets/images/Project4Demo.mp4",
      tags: ["React", "Node.js", "TypeScript", "Next.js", "Tailwind"],
      description: "ProofIt helps renters document property conditions with photos and notes, then send clean PDF reports via one-click email.",
      github: "https://github.com/pereddysruthi21/ProofIt",
      demo: "/projects/project5/demo",
      year: "2025",
      category: "Web App",
      details: [
        "Developed with React + Next.js for a smooth user experience.",
        "Used Tailwind CSS for fast, responsive styling.",
        "Built a Node.js backend with Nodemailer for sending emails with attachments.",
        "Integrated PDF generation libraries to create clean, exportable reports.",
      ],
      features: [
        "Image uploads with annotations and notes",
        "PDF generation with room data and images",
        "One click email delivery with file attachments",
      ],
      challenges: [
        "Rendering images cleanly inside a generated PDF",
        "Sending emails with attachments through a backend",
      ],
      achievements: [
        "Used by first-time renters to secure deposits",
        "Designed for ease of use and professionalism",
      ],
    },
    {
      id: "project3",
      title: "W.A.I.L.A. - Automated Bus Safety System",
      image: "/assets/images/Project3.jpg",
      video: "/assets/images/Project3Demo.mp4",
      tags: ["Python", "OpenCV", "Arduino"],
      description:
        "Automatic Water Gun System for Bus Safety utilizing Computer Vision and Arduino.",
      github: "/projects/project3/demo",
      demo: "/projects/project3/demo",
      year: "2023",
      category: "Computer Vision",
      details: [
        "Combined OpenCV-based motion detection with servo actuation via Arduino.",
        "Processed live video feeds to detect objects near bus entry zones.",
        "Fired water jets at detected threats using programmed logic.",
        "Aimed at improving student safety in rough neighborhoods.",
      ],
      features: [
        "Motion detection with OpenCV",
        "Servo control with Arduino",
        "Real-time alerts and logs",
      ],
      challenges: [
        "Tuning CV models for outdoor conditions",
        "Integrating Python detection with Arduino firing",
      ],
      achievements: [
        "Worked in all weather conditions",
        "Used by school for pilot demo",
      ],
    },
    {
      id: "project4",
      title: "Multiplayer Grapple Game",
      image: "/assets/images/Project4.jpg",
      video: "/assets/images/Project4Demo.mp4",
      tags: ["JavaScript", "Node.js", "HTML", "CSS"],
      description:
        "Multiplayer web game featuring physics-based grappling hooks and real-time interaction.",
      github: "https://github.com/rryyan21/Grapple-Arena",
      demo: "/projects/project4/demo",
      year: "2022",
      category: "Game Dev",
      details: [
        "Built a custom WebSocket server in Node.js to handle real-time multiplayer.",
        "Implemented physics calculations for momentum-based grappling.",
        "Created multiple character skins and map variations.",
        "Tested for sync consistency, input lag, and cross-browser performance.",
      ],
      features: [
        "Real-time multiplayer with WebSockets",
        "Physics-based grappling and movement",
        "Custom maps and skins",
      ],
      challenges: [
        "Handling collisions in multiplayer",
        "Syncing inputs without lag",
      ],
      achievements: [
        "Playable by up to 4 users online",
        "Hosted and demoed at school hackathon",
      ],
    },
    {
      id: "project1",
      title: "Janky Hollow Knight",
      image: "/assets/images/Project1.jpg",
      video: "/assets/images/Project1Demo.mp4",
      tags: ["Greenfoot", "Java", "JavaScript"],
      description:
        "An interactive game developed using Greenfoot, showcasing object-oriented programming and game mechanics.",
      github: "https://github.com/rryyan21/Janky-Hollow-Knight-",
      demo: "/projects/project1/demo",
      year: "2024",
      category: "Game Development",
      details: [
        "Inspired by the Hollow Knight game, created using Greenfoot in Java.",
        "Focused on core OOP concepts like inheritance, polymorphism, and abstraction.",
        "Game included custom sprites, animations, and audio for a complete experience.",
        "Integrated JavaScript to extend certain UI elements and logic.",
      ],
      features: [
        "Custom character movement and physics system",
        "Enemy AI with different behavior patterns",
        "Health and damage system",
        "Collectible items and power-ups",
        "Level design and progression",
      ],
      challenges: [
        "Learning Greenfoot and its documentation",
        "Implementing smooth character movement",
        "Creating balanced enemy AI",
        "Designing engaging level layouts",
      ],
      achievements: [
        "Successfully completed the project within the deadline",
        "Created a fully playable game with multiple levels",
        "Implemented complex game mechanics from scratch",
      ],
    },
    {
      id: "project2",
      title: "AI Tic Tac Toe",
      image: "/assets/images/Project2.jpg",
      video: "/assets/images/Project2Demo.mp4",
      tags: ["Python", "HTML", "JavaScript"],
      description:
        "A full-stack web application built with Django, featuring user authentication and database management.",
      github: "/projects/project2/demo",
      demo: "/projects/project2/demo",
      year: "2023",
      category: "AI",
      details: [
        "Built with Python and Django for the backend; HTML/JS for the frontend.",
        "Minimax algorithm implemented for unbeatable AI gameplay.",
        "User login system with session tracking and personalized game history.",
        "Deployed frontend and backend using Vercel and PythonAnywhere (or similar).",
      ],
      features: [
        "AI opponent with minimax algorithm",
        "User authentication and sessions",
        "Live match logging and win tracking",
      ],
      challenges: [
        "Implementing AI logic in frontend",
        "Handling real-time state updates",
      ],
      achievements: [
        "Successfully deployed with Vercel",
        "Achieved 90% win rate against human testers",
      ],
    },
     {
       id: "WIP",
      title: "Work in progress",
      image: "/assets/images/WIP.png",
      video: "",
      tags: [],
      description: "",
      github: "",
      demo: "",
      year: "",
      category: "",
      details: [
      
      ],
      features: [
      ],
      challenges: [
      ],
      achievements: [
      ],
    }
    
  ];
  