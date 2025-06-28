import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import OtptimerCard from './components/Otptimer';
import MyButton from './components/MyButton';
import MyCard from './components/MyCard';
function App() {
  return (
    <div className="App">
     <Chatbot />
     <OtptimerCard />
     <MyButton label="Click Me" variant="primary" size="md" fullWidth />
     <MyCard title="My Card Title" description="This is a description for the card."></MyCard>
    </div>
  );
}

export default App;
