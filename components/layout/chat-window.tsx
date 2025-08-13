"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User, Minimize2 } from "lucide-react"
import { mockJobs } from "@/lib/mock-data"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
}

export function ChatWindow({ isOpen, onClose, onMinimize }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your job search assistant. I can help you find information about available jobs, requirements, and application deadlines. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // ... existing generateBotResponse function ...

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Job search queries
    if (message.includes("government") || message.includes("govt")) {
      const govJobs = mockJobs.filter((job) => job.category === "government")
      return `I found ${govJobs.length} government jobs available! Some popular positions include Software Engineer at Ministry of Technology, Data Analyst at Central Statistics Office, and Administrative Officer positions. Would you like details about any specific role?`
    }

    if (message.includes("private") || message.includes("company")) {
      const privateJobs = mockJobs.filter((job) => job.category === "private")
      return `There are ${privateJobs.length} private sector opportunities! Top roles include Full Stack Developer at TechCorp Solutions (₹60K-₹1.2L), Marketing Manager positions, and UI/UX Designer roles. Which field interests you most?`
    }

    if (message.includes("job fair") || message.includes("fair")) {
      const fairJobs = mockJobs.filter((job) => job.category === "job-fair")
      return `We have ${fairJobs.length} job fair events coming up! There's a Campus Recruitment Drive at Delhi University and an IT Job Fair 2024 in Bangalore with 50+ companies. Perfect for networking and multiple opportunities!`
    }

    if (message.includes("salary") || message.includes("pay")) {
      return "Salary ranges vary by role and experience. Government positions typically offer ₹35K-₹80K with excellent benefits. Private sector ranges from ₹40K-₹1.2L+ depending on skills and company. Would you like salary details for a specific role?"
    }

    if (message.includes("requirement") || message.includes("qualification")) {
      return "Requirements vary by position. Most government jobs need relevant degrees and sometimes competitive exams. Private roles focus on skills and experience. Job fairs welcome fresh graduates. What specific role are you interested in?"
    }

    if (message.includes("location") || message.includes("where")) {
      return "We have jobs across major cities! Delhi, Mumbai, Bangalore, Hyderabad, Chennai, and Pune have the most opportunities. Remote work options are also available in private sector. Which location do you prefer?"
    }

    if (message.includes("deadline") || message.includes("apply")) {
      return "Application deadlines are approaching! Most current postings close by mid-February 2024. I recommend applying soon to secure your spot. Would you like me to help you find jobs with upcoming deadlines?"
    }

    if (message.includes("help") || message.includes("how")) {
      return "I can help you with: 🔍 Finding jobs by category, location, or company 💰 Salary information 📋 Job requirements and qualifications ⏰ Application deadlines 📍 Location-based opportunities. What specific information do you need?"
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! I'm here to help you find the perfect job opportunity. Feel free to ask about any specific roles, companies, or requirements. Good luck with your job search!"
    }

    // Default responses
    const defaultResponses = [
      "I can help you find job opportunities! Try asking about government jobs, private companies, job fairs, salary ranges, or specific locations.",
      "Let me help you with your job search. You can ask about requirements, deadlines, locations, or specific job categories.",
      "I'm here to assist with job-related queries. Ask me about available positions, application processes, or career advice!",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto"
          >
            <Card className="w-96 h-[500px] shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  >
                    <Bot className="h-5 w-5" />
                  </motion.div>
                  <span className="text-lg">Job Assistant</span>
                </CardTitle>
                <div className="flex items-center space-x-1">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMinimize}
                      className="h-8 w-8 p-0 text-white hover:bg-primary"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="h-8 w-8 p-0 text-white hover:bg-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-[420px] p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.8 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={`flex items-start space-x-2 ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.sender === "bot" && (
                            <motion.div whileHover={{ scale: 1.1 }} className="bg-blue-100 p-2 rounded-full">
                              <Bot className="h-4 w-4 text-blue-600" />
                            </motion.div>
                          )}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className={`max-w-[280px] p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-blue-600 text-white rounded-br-sm"
                                : "bg-gray-100 text-gray-900 rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </motion.div>
                          {message.sender === "user" && (
                            <motion.div whileHover={{ scale: 1.1 }} className="bg-blue-600 p-2 rounded-full">
                              <User className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start space-x-2"
                        >
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                            <div className="flex space-x-1">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollArea>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="border-t p-4"
                >
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about jobs, requirements, deadlines..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send • Ask about jobs, salaries, requirements
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
