import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  useTheme
} from "@mui/material";
//import { Mic, MicOff, DarkMode, LightMode } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
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
  //  const [darkMode, setDarkMode] = useState(false);
   // const [listening, setListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const recognitionRef = useRef<any>(null);
    const theme = useTheme();

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
  
    const startListening = () => {
        recognitionRef.current?.start();
      };
    const sendMessage = async () => {
      if (!userInput.trim()) return;
      setMessages([...messages, { role: "User", text: userInput }]);
      setLoading(true);
      console.log('sanjeet'+loading);
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB0llVseWMMQHnFQ8XGnlJ9MNjMUNGTipc", {
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
    
    //   const toggleListening = () => {
    //     if (recognitionRef.current) {
    //       if (listening) {
    //         recognitionRef.current.stop();
    //       } else {
    //         recognitionRef.current.start();
    //       }
    //       setListening(!listening);
    //     }
    //   };
    
      return (
        <Box
        sx={{
          margin: "auto",
          padding: 2,
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          AI Chatbot 🤖
        </Typography>
  
        {/* Chat Messages */}
        <Box sx={{ maxHeight: 300, overflowY: "auto", padding: 1 }}>
          {messages.map((msg, index) => (
            <Paper
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
                marginBottom: 1,
                backgroundColor:
                  msg.role === "User"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
            >
              <Avatar sx={{ marginRight: 1 }}>
                {msg.role === "User" ? "👤" : "🤖"}
              </Avatar>
              <Typography
                sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
              >
                {msg.text}
              </Typography>
            </Paper>
          ))}
        </Box>
  
        {/* Input & Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button onClick={startListening} sx={{ marginLeft: 1 }}>
            <MicIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ marginLeft: 1 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
      );
    };
    
    export default Chatbot;