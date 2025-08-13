"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./chat-window";
import { Badge } from "@/components/ui/badge";

export function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true); // Simulate new message indicator

  const handleToggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setIsMinimized(false);
    } else {
      setIsChatOpen(true);
      setIsMinimized(false);
      setHasNewMessage(false); // Clear new message indicator when opened
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsChatOpen(false);
  };

  const handleClose = () => {
    setIsChatOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isMinimized && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mb-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsChatOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-primary shadow-lg hover:shadow-xl transition-shadow text-secondary"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Job Assistant
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          <Button
            onClick={handleToggleChat}
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary relative"
          >
            <motion.div
              animate={{ rotate: isChatOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isChatOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MessageCircle className="h-6 w-6" />
              )}
            </motion.div>
            <AnimatePresence>
              {hasNewMessage && !isChatOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -top-1 -right-1"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Badge className="h-5 w-5 p-0 bg-[primary] text-white text-xs flex items-center justify-center">
                      1
                    </Badge>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      <ChatWindow
        isOpen={isChatOpen}
        onClose={handleClose}
        onMinimize={handleMinimize}
      />
    </>
  );
}
