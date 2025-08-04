"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface TourStep {
  id: string;
  elementId: string;
  position: { x: number; y: number };
  message: string;
  action?: string;
}

export default function PixelGuide() {
  const [mode, setMode] = useState<'intro' | 'tour' | 'chat'>('intro');
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [characterPosition, setCharacterPosition] = useState({ x: 100, y: 400 });
  const [isWalking, setIsWalking] = useState(false);
  const [facingDirection, setFacingDirection] = useState<'left' | 'right'>('right');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setSpeechText] = useState("");
  
  // Chat state (when in chat mode)
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: "intro",
      elementId: "home",
      position: { x: 100, y: 400 },
      message: "Hello there! I'm Pixel, your AI portfolio guide 🤖 Ready to explore Ryan's work together?",
    },
    {
      id: "journey-start",
      elementId: "about", 
      position: { x: 150, y: 300 },
      message: "Let's dive into Ryan's story! Follow me as we discover his skills and background 🚶‍♂️✨",
    },
    {
      id: "journey-deep",
      elementId: "about",
      position: { x: 250, y: 350 },
      message: "Look at this impressive skill set! Ryan's expertise spans web dev, AI, and so much more 📚",
    },
    {
      id: "projects-arrival",
      elementId: "projects",
      position: { x: 200, y: 280 },
      message: "Now for the exciting part - Ryan's projects! Each one showcases different skills 🎯",
    },
    {
      id: "compli-spotlight",
      elementId: "projects",
      position: { x: 100, y: 200 },
      message: "👈 Check out Compli right here! This AI-powered job prep platform is Ryan's latest work!",
    },
    {
      id: "projects-explore",
      elementId: "projects",
      position: { x: 350, y: 320 },
      message: "From interactive games to AI-powered platforms - such creative diversity! 🚀",
    },
    {
      id: "contact-finale",
      elementId: "contact",
      position: { x: 300, y: 250 },
      message: "Interested in collaborating? Here's how you can connect with Ryan! 📧",
    },
    {
      id: "end",
      elementId: "contact",
      position: { x: 1200, y: 600 }, // Will be dynamically calculated
      message: "Tour complete! 🎉 I'll be here if you have questions about Ryan's work 🤖",
    },
  ];

  const portfolioData = {
    skills: ["TypeScript", "Python", "React", "Next.js", "Tailwind", "Java", "JavaScript", "HTML", "CSS", "Node.js", "OpenCV", "Arduino"],
    projects: projects,
    about: "Ryan is a passionate software developer with experience in web development, game development, AI, and computer vision.",
    contact: "You can reach Ryan through his portfolio contact section or connect with him on linkedin.",
  };

  useEffect(() => {
    if (mode === 'intro') {
      setTimeout(() => {
        setShowSpeechBubble(true);
        setSpeechText("Hi! I'm Pixel 🤖 Would you like me to show you around Ryan's portfolio?");
      }, 1000);
    }
  }, [mode]);

  const startTour = () => {
    console.log('Tour starting - Pixel takes control!');
    setMode('tour');
    setShowSpeechBubble(false);
    
    // Pixel introduces himself first
    setTimeout(() => {
      console.log('Pixel introducing himself...');
      setShowSpeechBubble(true);
      setSpeechText("Hello there! I'm Pixel, your AI portfolio guide 🤖 Ready to explore Ryan's work together?");
      
      // Then automatically starts the journey after introduction
      setTimeout(() => {
        console.log('Starting independent journey...');
        setShowSpeechBubble(false);
        // Start with step 1 (first movement step)
        setCurrentTourStep(1);
        // Wait a bit for state to update, then move
        setTimeout(() => {
          moveToStep(1);
        }, 100);
      }, 3000); // 3 seconds to read introduction
    }, 500);
  };

  const startChatMode = () => {
    setMode('chat');
    setShowSpeechBubble(false);
    // Position in bottom right corner
    const bottomRightX = typeof window !== 'undefined' ? window.innerWidth - 150 : 1200;
    const bottomRightY = typeof window !== 'undefined' ? window.innerHeight - 150 : 600;
    setCharacterPosition({ x: bottomRightX, y: bottomRightY });
    setMessages([{
      id: "welcome",
      text: "Hey there! 🤖 I'm here to chat about Ryan's projects and answer any questions!",
      isUser: false,
      timestamp: new Date(),
    }]);
    
    // Show a brief message when entering chat mode directly
    setTimeout(() => {
      setShowSpeechBubble(true);
      setSpeechText("Ready to chat! 🤖 Ask me anything about Ryan's work!");
      setTimeout(() => {
        setShowSpeechBubble(false);
      }, 3000);
    }, 500);
  };

  const moveToStep = (stepIndex: number) => {
    if (stepIndex >= tourSteps.length) return;
    
    const step = tourSteps[stepIndex];
    console.log('Pixel walking to step', stepIndex, ':', step.id, 'Position:', step.position);
    
    const currentPos = characterPosition;
    const targetPos = step.position;
    
    // Determine walking direction
    setFacingDirection(targetPos.x > currentPos.x ? 'right' : 'left');
    setIsWalking(true);
    
    // Calculate distance and walking time
    const distance = Math.sqrt(
      Math.pow(targetPos.x - currentPos.x, 2) + 
      Math.pow(targetPos.y - currentPos.y, 2)
    );
    const walkingTime = Math.max(1500, distance * 3); // Minimum 1.5s, scale with distance
    
    // Start walking - immediate visual feedback
    setTimeout(() => {
      // Simulate step-by-step walking with intermediate positions
      const steps = 8;
      const stepDelay = walkingTime / steps;
      
      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          const progress = i / steps;
          const currentX = currentPos.x + (targetPos.x - currentPos.x) * progress;
          const currentY = currentPos.y + (targetPos.y - currentPos.y) * progress;
          
          // Add slight vertical bounce for walking effect
          const bounceY = Math.sin(progress * Math.PI * 4) * 3;
          
          setCharacterPosition({ 
            x: currentX, 
            y: currentY + bounceY 
          });
        }, i * stepDelay);
      }
      
      // Page scrolls to follow Pixel while he's walking
      setTimeout(() => {
        const element = document.getElementById(step.elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, walkingTime / 3); // Page follows early in the walk
      
    }, 200);
    
    // Pixel arrives and stops walking
    setTimeout(() => {
      setIsWalking(false);
      setCharacterPosition(targetPos); // Ensure exact final position
      
      // Special highlighting for Compli spotlight step
      if (step.id === 'compli-spotlight') {
        // Add spotlight effect to first project card (Compli)
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
          const compliCard = projectCards[0] as HTMLElement; // First card should be Compli
          compliCard.style.transform = 'scale(1.05)';
          compliCard.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)';
          compliCard.style.border = '3px solid #3b82f6';
          compliCard.style.transition = 'all 0.5s ease';
          compliCard.style.zIndex = '10';
          compliCard.style.position = 'relative';
          
          // Remove highlight after tour step ends
          setTimeout(() => {
            compliCard.style.transform = '';
            compliCard.style.boxShadow = '';
            compliCard.style.border = '';
            compliCard.style.zIndex = '';
            compliCard.style.position = '';
          }, 8000); // Remove after 8 seconds
        }
      }
      
      // Brief pause before speaking
      setTimeout(() => {
        setShowSpeechBubble(true);
        setSpeechText(step.message);
        
        // Pixel automatically continues his journey
        setTimeout(() => {
          setShowSpeechBubble(false);
          const nextStep = stepIndex + 1;
          if (nextStep < tourSteps.length) {
            setCurrentTourStep(nextStep);
            setTimeout(() => moveToStep(nextStep), 1000);
                  } else {
          // Journey complete - Pixel walks to bottom right corner
          setTimeout(() => {
            setMode('chat');
            setFacingDirection('right'); // Face right when going to bottom right
            setIsWalking(true);
            setTimeout(() => {
              // Calculate bottom right corner position
              const bottomRightX = typeof window !== 'undefined' ? window.innerWidth - 150 : 1200;
              const bottomRightY = typeof window !== 'undefined' ? window.innerHeight - 150 : 600;
              setCharacterPosition({ x: bottomRightX, y: bottomRightY });
              setTimeout(() => {
                setIsWalking(false);
                setShowSpeechBubble(true);
                setSpeechText("All done! 🤖 Click me anytime if you want to chat about Ryan's projects!");
                
                // Hide the message after 4 seconds
                setTimeout(() => {
                  setShowSpeechBubble(false);
                }, 4000);
              }, 1500);
            }, 300);
          }, 1000);
        }
        }, step.id === 'compli-spotlight' ? 5000 : 3500); // Longer time for Compli spotlight
      }, 500);
    }, walkingTime + 400); // Walking time + small buffer
  };

  const moveToNextStep = () => {
    moveToStep(currentTourStep);
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("tour") || message.includes("guide") || message.includes("show")) {
      return "Want another tour? Just refresh the page and I'll be happy to show you around again! 🚶‍♂️";
    }
    
    if (message.includes("project") || message.includes("work")) {
      if (message.includes("compli")) {
        const compli = projects.find(p => p.id === "project6");
        return `Compli is fascinating! ${compli?.description} It's built with ${compli?.tags.join(", ")} and really showcases Ryan's full-stack abilities.`;
      }
      if (message.includes("proofit")) {
        return `ProofIt is brilliant for renters! It helps document property conditions with photos and generates clean PDF reports. Built with React, Next.js, and modern web tech.`;
      }
      return `Ryan has created ${projects.length - 1} diverse projects! From his creative Hollow Knight game to the practical Compli job prep platform. Each one demonstrates different skills - which type interests you?`;
    }

    if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      return `Ryan's tech stack is impressive! He's proficient in ${portfolioData.skills.slice(0, 6).join(", ")} and more. He excels at both frontend and backend development, plus has great experience with AI and computer vision!`;
    }

    if (message.includes("contact") || message.includes("hire") || message.includes("reach")) {
      return "Interested in working with Ryan? You can reach him through the contact form on this page, or connect via LinkedIn! He's always open to exciting opportunities. 🚀";
    }

    if (message.includes("experience") || message.includes("background")) {
      return "Ryan has hands-on experience across web development, game creation, AI platforms, and computer vision projects. His work shows both technical depth and creative problem-solving!";
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Great to chat with you! I'm here to help you learn about Ryan's work. What would you like to know? 😊";
    }

    const responses = [
      "Interesting question! I'd love to tell you about Ryan's projects, skills, or experience. What interests you most? 🤖",
      "I'm here to help! Ask me about Ryan's latest projects like Compli and ProofIt, or his technical expertise! 💡",
      "Good question! Want to know about his development experience, tech stack, or specific projects? 🛠️",
      "I'd be happy to help! Try asking about his work in web development, AI, or game creation! ✨",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Pixel Art Character */}
      <div
        className={`fixed z-50 cursor-pointer ${
          isWalking 
            ? 'animate-walk' 
            : 'transition-all duration-300'
        }`}
        style={{
          left: `${characterPosition.x}px`,
          top: `${characterPosition.y}px`,
          transform: facingDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          transition: isWalking 
            ? 'left 2s ease-in-out, top 2s ease-in-out' 
            : 'all 0.3s ease'
        }}
        onClick={() => {
          console.log('Character clicked! Mode:', mode);
          if (mode === 'chat' && !isChatOpen) {
            setIsChatOpen(true);
          }
        }}
      >
        {/* Pixel Robot Character */}
        <div className="relative w-14 h-18" style={{ imageRendering: 'pixelated' }}>
          {/* Robot Head */}
          <div className="absolute top-0 left-3 w-8 h-8 bg-gray-400 border-2 border-gray-600 rounded-sm">
            {/* Head Details */}
            <div className="absolute top-1 left-1 w-6 h-2 bg-gray-500 border border-gray-600"></div>
            
            {/* Glowing Blue Eyes */}
            <div className="absolute top-2 left-1 w-2 h-2 bg-cyan-400 border border-cyan-500 rounded-sm shadow-lg robot-eyes"></div>
            <div className="absolute top-2 right-1 w-2 h-2 bg-cyan-400 border border-cyan-500 rounded-sm shadow-lg robot-eyes"></div>
            
            {/* Mouth/Speaker Grille */}
            <div className="absolute top-5 left-2 w-4 h-1 bg-gray-600"></div>
            <div className="absolute top-5.5 left-2.5 w-3 h-0.5 bg-gray-700"></div>
          </div>
          
          {/* Robot Body/Torso */}
          <div className="absolute top-7 left-2 w-10 h-8 bg-gray-500 border-2 border-gray-700 rounded-sm">
            {/* Chest Panel */}
            <div className="absolute top-1 left-2 w-6 h-4 bg-gray-400 border border-gray-600"></div>
            {/* Central Core */}
            <div className="absolute top-2 left-4 w-2 h-2 bg-blue-400 border border-blue-500 rounded-sm"
                 style={{ boxShadow: '0 0 3px #2196f3' }}></div>
            {/* Side Vents */}
            <div className="absolute top-3 left-1 w-1 h-2 bg-gray-600"></div>
            <div className="absolute top-3 right-1 w-1 h-2 bg-gray-600"></div>
          </div>
          
          {/* Robot Arms */}
          <div className={`absolute top-8 left-0 w-3 h-6 bg-gray-400 border border-gray-600 rounded-sm ${mode === 'tour' && currentTourStep === 3 ? 'pixel-pointing' : ''}`}>
            {/* Shoulder Joint */}
            <div className="absolute top-0 left-1 w-1 h-1 bg-gray-600 rounded-full"></div>
            {/* Arm Segments */}
            <div className="absolute top-2 left-0 w-3 h-1 bg-gray-300 border-t border-gray-500"></div>
          </div>
          <div className="absolute top-8 right-0 w-3 h-6 bg-gray-400 border border-gray-600 rounded-sm">
            {/* Shoulder Joint */}
            <div className="absolute top-0 right-1 w-1 h-1 bg-gray-600 rounded-full"></div>
            {/* Arm Segments */}
            <div className="absolute top-2 left-0 w-3 h-1 bg-gray-300 border-t border-gray-500"></div>
          </div>
          
          {/* Robot Legs */}
          <div className={`absolute top-14 left-3 w-3 h-6 bg-gray-600 border border-gray-800 rounded-sm ${isWalking ? 'walking-legs' : ''}`}>
            {/* Knee Joint */}
            <div className="absolute top-3 left-1 w-1 h-1 bg-gray-400 rounded-full"></div>
            {/* Foot */}
            <div className="absolute bottom-0 left-0 w-4 h-2 bg-gray-700 border border-gray-900 rounded-sm"></div>
          </div>
          <div className={`absolute top-14 right-3 w-3 h-6 bg-gray-600 border border-gray-800 rounded-sm ${isWalking ? 'walking-legs' : ''}`} 
               style={{animationDelay: '0.2s'}}>
            {/* Knee Joint */}
            <div className="absolute top-3 left-1 w-1 h-1 bg-gray-400 rounded-full"></div>
            {/* Foot */}
            <div className="absolute bottom-0 left-0 w-4 h-2 bg-gray-700 border border-gray-900 rounded-sm"></div>
          </div>
          
          {/* Glowing Effect for Movement */}
          {isWalking && (
            <div className="absolute top-12 left-1 w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-pulse"
                 style={{ boxShadow: '0 0 6px #ff9800' }}></div>
          )}
          {isWalking && (
            <div className="absolute top-12 right-1 w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-pulse"
                 style={{ boxShadow: '0 0 6px #ff9800', animationDelay: '0.3s' }}></div>
          )}
        </div>
      </div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-40 bg-white rounded-lg shadow-lg border-2 border-gray-300 p-3 max-w-xs"
            style={{
              left: Math.min(characterPosition.x + 60, (typeof window !== 'undefined' ? window.innerWidth - 320 : 1000)),
              top: characterPosition.y - 20,
            }}
          >
            <div className="text-sm text-gray-800">{speechText}</div>
            {/* Speech bubble tail */}
            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white"></div>
            
            {mode === 'intro' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    console.log('User wants to follow Pixel!');
                    startTour();
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors"
                >
                  Show me around! 🚶‍♂️✨
                </button>
                <button
                  onClick={() => {
                    console.log('User prefers to stay and chat!');
                    startChatMode();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors"
                >
                  Maybe later 💬
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface (when in chat mode) */}
      <AnimatePresence>
        {mode === 'chat' && isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 left-4 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-sm">Pixel Guide 🤖</h3>
                <p className="text-xs opacity-90">Ask me about Ryan's work!</p>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-blue-600 rounded p-1"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-xs ${
                      message.isUser
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about projects..."
                  className="flex-1 p-2 border border-gray-300 rounded text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded text-xs transition-colors"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}