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

interface PortfolioKnowledge {
  skills: string[];
  projects: typeof projects;
  about: string;
  contact: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm Ryan's AI assistant. Ask me anything about his projects, skills, or experience!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const portfolioData: PortfolioKnowledge = {
    skills: ["TypeScript", "Python", "React", "Next.js", "Tailwind", "Java", "JavaScript", "HTML", "CSS", "Node.js", "OpenCV", "Arduino"],
    projects: projects,
    about: "Ryan is a passionate software developer with experience in web development, game development, AI, and computer vision. He enjoys building innovative projects that solve real-world problems.",
    contact: "You can reach Ryan through his portfolio contact section or connect with him on GitHub.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Project-specific responses
    if (message.includes("project") || message.includes("work")) {
      if (message.includes("compli")) {
        const compli = projects.find(p => p.id === "project6");
        return `Compli is ${compli?.description} It's built with ${compli?.tags.join(", ")} and features ${compli?.features.slice(0, 2).join(" and ")}.`;
      }
      if (message.includes("game") || message.includes("hollow knight")) {
        const game = projects.find(p => p.id === "project1");
        return `The Janky Hollow Knight project is ${game?.description} Built with ${game?.tags.join(", ")}, it features ${game?.features.slice(0, 2).join(" and ")}.`;
      }
      if (message.includes("tic tac toe") || message.includes("ai")) {
        const tictactoe = projects.find(p => p.id === "project2");
        return `The AI Tic Tac Toe is ${tictactoe?.description} It uses ${tictactoe?.tags.join(", ")} and implements a minimax algorithm for unbeatable gameplay.`;
      }
      return `Ryan has worked on ${projects.length - 1} main projects including ${projects.slice(0, 3).map(p => p.title).join(", ")}. Each showcases different skills in web development, game development, and AI. Which project interests you most?`;
    }

    // Skills responses
    if (message.includes("skill") || message.includes("technology") || message.includes("language")) {
      return `Ryan is proficient in ${portfolioData.skills.join(", ")}. He has experience with frontend technologies like React and Next.js, backend with Node.js and Python, and specialized areas like computer vision with OpenCV.`;
    }

    // Experience responses
    if (message.includes("experience") || message.includes("background")) {
      return `Ryan has hands-on experience in full-stack web development, game development, AI/ML, and computer vision. He's built everything from multiplayer games to AI-powered job preparation platforms. His projects demonstrate both technical depth and practical problem-solving skills.`;
    }

    // Contact responses
    if (message.includes("contact") || message.includes("reach") || message.includes("hire")) {
      return "You can contact Ryan through the contact section on this portfolio, or check out his GitHub profile linked in his projects. He's always open to discussing new opportunities and collaborations!";
    }

    // Education responses
    if (message.includes("education") || message.includes("school") || message.includes("university")) {
      return "Ryan is currently focused on building practical projects and gaining hands-on development experience. His portfolio showcases his self-directed learning and ability to tackle complex technical challenges.";
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! Feel free to ask me about Ryan's projects, skills, or experience.",
      "I'd be happy to help! Try asking about specific projects like Compli, the Hollow Knight game, or his technical skills.",
      "Great question! You can ask me about Ryan's development experience, the technologies he uses, or any of his featured projects.",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          )}
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">Ryan's AI Assistant</h3>
              <p className="text-sm opacity-90">Ask me about projects & skills</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}