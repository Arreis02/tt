// Audio import moved for sandbox safety
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Temporarily disable audio for sandbox compatibility
let spinSound = null;
let revealSound = null;

const promptData = [
  {
    topic: "The sexiest thing I…",
    prompts: ["Did", "Wore", "Saw", "Experienced"],
    mode: "playful"
  },
  {
    topic: "My first passionate kiss was…",
    prompts: ["Awkward", "Tonsil hockey", "Steamy", "Place"],
    mode: "playful"
  },
  // [...additional prompt objects...]
];

function Timer({ resetTrigger }) {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setSecondsLeft(120);
    setFlash(false);
    document.body.classList.remove("flash-screen");
  }, [resetTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev > 0 ? prev - 1 : 0;
        if (next === 0) {
          setFlash(true);
          document.body.classList.add("flash-screen");
          setTimeout(() => document.body.classList.remove("flash-screen"), 500);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <span className={\`transition-all duration-300 \${flash ? 'bg-white text-black rounded-full px-2' : ''}\`}>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </span>
  );
}

export default function SexPromptGame() {
  const [screen, setScreen] = useState("menu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const currentPrompt = promptData[currentIndex % promptData.length];

  return (
    screen === "menu" ? (
      <div
        className="relative flex flex-col items-center justify-center min-h-screen text-white"
        style={{ backgroundImage: 'url("/bgcover.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0" />
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-pink-500 drop-shadow-md mb-2">Truth or Tease</h1>
          <p className="italic text-white text-lg mb-4">A Game of Seduction, Subversion, and Secrets</p>
          <div className="space-y-3">
            <Button className="w-48 bg-black text-pink-500 font-bold border border-pink-500 shadow-md hover:shadow-pink-500/50" onClick={() => setScreen('game')}>Playful</Button>
            <Button className="w-48 bg-black text-pink-500 font-bold border border-pink-500 shadow-md hover:shadow-pink-500/50" onClick={() => setScreen('game')}>Wild</Button>
            <Button className="w-48 bg-black text-pink-500 font-bold border border-pink-500 shadow-md hover:shadow-pink-500/50" onClick={() => setScreen('game')}>Mixed</Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center relative">
        <h2 className="text-3xl font-bold text-pink-400 mb-4 animate-pulse">{currentPrompt.topic}</h2>
        <motion.div className="space-y-2 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="text-lg font-semibold">{currentPrompt.prompts[0]}</div>
          <div className="text-lg font-semibold">{currentPrompt.prompts[1]}</div>
          <div className="text-lg font-semibold">{currentPrompt.prompts[2]}</div>
          <div className="text-lg font-semibold">{currentPrompt.prompts[3]}</div>
        </motion.div>
        <div className="flex space-x-6 mb-6">
          <Button className="text-lg font-bold px-6 py-3 bg-black text-white border-white border hover:bg-white hover:text-black rounded-full">Truth</Button>
          <Button className="text-lg font-bold px-6 py-3 bg-black text-white border-white border hover:bg-white hover:text-black rounded-full">Lie</Button>
        </div>
        <div className="flex space-x-4 mb-8">
          <Button onClick={() => {
            setCurrentIndex((currentIndex - 1 + promptData.length) % promptData.length);
            setResetKey(prev => prev + 1);
          }} className="px-4 py-2 text-white border border-white rounded-full">Back</Button>
          <Button onClick={() => {
            setCurrentIndex((currentIndex + 1) % promptData.length);
            setResetKey(prev => prev + 1);
          }} className="px-4 py-2 text-white border border-white rounded-full">Next</Button>
        </div>
        <div className="absolute top-6 right-6 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-lg font-bold">
          <Timer resetTrigger={resetKey} />
        </div>
      </div>
    )
  );
}
