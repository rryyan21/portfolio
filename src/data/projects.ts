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
    challenges: string[];
    achievements: string[];
  }
  
  export const projects: Project[] = [
    {
      id: "project1",
      title: "Janky Hollow Knight",
      image: "/assets/images/Project1.jpg",
      video: "/assets/images/Project1Demo.mp4",
      tags: ["Greenfoot", "Java", "JavaScript"],
      description:
        "An interactive game developed using Greenfoot, showcasing object-oriented programming and game mechanics.",
      github: "https://github.com/ryan/janky-hollow-knight",
      demo: "https://janky-knight-demo.vercel.app",
      year: "2024",
      category: "Game Development",
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
      github: "https://github.com/ryan/ai-tic-tac-toe",
      demo: "https://tic-ai.vercel.app",
      year: "2023",
      category: "AI",
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
      id: "project3",
      title: "W.A.I.L.A. - Automated Bus Safety System",
      image: "/assets/images/Project3.jpg",
      video: "/assets/images/Project3Demo.mp4",
      tags: ["Python", "OpenCV", "Arduino", "Computer Vision"],
      description:
        "Automatic Water Gun System for Bus Safety utilizing Computer Vision and Arduino.",
      github: "https://github.com/ryan/waila-system",
      demo: "https://waila.vercel.app",
      year: "2023",
      category: "Computer Vision",
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
      github: "https://github.com/ryan/grapple-game",
      demo: "https://grapple-online.vercel.app",
      year: "2022",
      category: "Game Dev",
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
  ];
  