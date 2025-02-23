import React, { useState, useEffect } from "react";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    JSON.parse(localStorage.getItem("chatHistory") || "[]")
  );
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages([...messages, { role: "User", text: userInput }]);
    setUserInput("");
    setIsTyping(true);

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCUGWS0iGNhAkKIXcgVrNDwKWbVToIPPaw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] })
          });

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setMessages((prev) => [...prev, { role: "AI", text: botReply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setIsTyping(false);
  };

  const startVoiceInput = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event: any) => {
      setUserInput(event.results[0][0].transcript);
    };
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <button onClick={toggleDarkMode} className="p-2 bg-blue-500 text-white rounded">
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-2 ${msg.role === "User" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg ${msg.role === "User" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              <strong>{msg.role}:</strong> {msg.text}
            </div>
          </div>
        ))}
        {isTyping && <p>AI is typing...</p>}
      </div>

      <div className="p-4 flex items-center gap-2">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={sendMessage} className="p-2 bg-green-500 text-white rounded">Send</button>
        <button onClick={startVoiceInput} className="p-2 bg-pink-500 text-white rounded">🎤</button>
      </div>
    </div>
  );
};

export default Chatbot;
