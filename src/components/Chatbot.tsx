import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  IconButton
} from "@mui/material";
import { Mic, MicOff, DarkMode, LightMode } from "@mui/icons-material";
//defining explicitly type
declare global {
    interface Window {
      webkitSpeechRecognition: any;
    }
  }
  
const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [listening, setListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const recognitionRef = useRef<any>(null);
  
    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
          const recognition = new window.webkitSpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = "en-US";
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setUserInput(transcript);
          };
          recognitionRef.current = recognition;
        }
      }, []);
      
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const sendMessage = async () => {
      if (!userInput.trim()) return;
      setMessages([...messages, { role: "User", text: userInput }]);
      setLoading(true);

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCUGWS0iGNhAkKIXcgVrNDwKWbVToIPPaw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] })
          });

          const data = await response.json();
          const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    
          setMessages((prev) => [...prev, { role: "User", text: userInput }, { role: "AI", text: botReply }]);
        } catch (error) {
          console.error("Error fetching AI response:", error);
        } finally {
          setLoading(false);
          setUserInput("");
        }
      };
    
      const toggleListening = () => {
        if (recognitionRef.current) {
          if (listening) {
            recognitionRef.current.stop();
          } else {
            recognitionRef.current.start();
          }
          setListening(!listening);
        }
      };
    
      return (
        <Box sx={{ width: "100%", mx: "auto", mt: 2, p: 2, bgcolor: darkMode ? "#121212" : "#f5f5f5", color: darkMode ? "#fff" : "#000", minHeight: "100vh" }}>
          {/* Dark Mode Toggle */}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
    
          {/* Chat Window */}
          <Paper sx={{ p: 2, height: 500, overflowY: "auto", bgcolor: darkMode ? "#333" : "#fff", borderRadius: 2 }}>
            {messages.map((msg, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} sx={{ mb: 2, flexDirection: msg.role === "User" ? "row-reverse" : "row" }}>
                <Avatar sx={{ bgcolor: msg.role === "User" ? "primary.main" : "secondary.main" }}>
                  {msg.role === "User" ? "U" : "AI"}
                </Avatar>
                <Typography
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: msg.role === "User" ? "primary.light" : "secondary.light",
                    color: "black",
                    maxWidth: "70%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {loading && <CircularProgress size={24} sx={{ display: "block", mx: "auto" }} />}
            <div ref={messagesEndRef} />
          </Paper>
    
          {/* Input and Controls */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something..."
            />
            <IconButton onClick={toggleListening} color={listening ? "error" : "primary"}>
              {listening ? <MicOff /> : <Mic />}
            </IconButton>
            <Button variant="contained" color="primary" onClick={sendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      );
    };
    
    export default Chatbot;