import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    
          setMessages([...messages, { role: "User", text: userInput }, { role: "AI", text: botReply }]);
        } catch (error) {
          console.error("Error fetching AI response:", error);
        } finally {
          setLoading(false);
          setUserInput("");
        }
      };
    
      return (
        <Box sx={{ width: "100%",  mx: "auto", mt: 4 }}>
          <Paper sx={{ p: 2, height: 400, overflowY: "auto", bgcolor: "#f5f5f5" }}>
            {messages.map((msg, index) => (
              <Typography
                key={index}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: msg.role === "User" ? "primary.light" : "secondary.light",
                  color: "black",
                  mb: 1,
                }}
              >
                <strong>{msg.role}:</strong> {msg.text}
              </Typography>
            ))}
            {loading && <CircularProgress size={24} />}
          </Paper>
    
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something..."
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      );
    };
    
    export default Chatbot;