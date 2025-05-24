import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  }
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
    <span className={`transition-all duration-300 ${flash ? 'bg-white text-black rounded-full px-2' : ''}`}>
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
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white bg-black">
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-pink-500 drop-shadow-md mb-2">Truth or Tease</h1>
          <p className="italic text-white text-lg mb-4">A Game of Seduction, Subversion, and Secrets</p>
          <div className="space-y-3">
            <button className="w-48 bg-black text-pink-500 font-bold border border-pink-500 shadow-md" onClick={() => setScreen('game')}>Playful</button>
            <button className="w-48 bg-black text-pink-500 font-bold border border-pink-500 shadow-md" onClick={() => setScreen('game')}>Wild</button>
            <button className="w-48 bg-black text-pink-500 font-bold border border-pink-500 shadow-md" onClick={() => setScreen('game')}>Mixed</button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center relative">
        <h2 className="text-3xl font-bold text-pink-400 mb-4 animate-pulse">{currentPrompt.topic}</h2>
        <motion.div className="space-y-2 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {currentPrompt.prompts.map((p, i) => (
            <div key={i} className="text-lg font-semibold">{p}</div>
          ))}
        </motion.div>
        <div className="flex space-x-6 mb-6">
          <button className="text-lg font-bold px-6 py-3 bg-black text-white border-white border">Truth</button>
          <button className="text-lg font-bold px-6 py-3 bg-black text-white border-white border">Lie</button>
        </div>
        <div className="flex space-x-4 mb-8">
          <button onClick={() => {
            setCurrentIndex((currentIndex - 1 + promptData.length) % promptData.length);
            setResetKey(prev => prev + 1);
          }} className="px-4 py-2 text-white border border-white rounded-full">Back</button>
          <button onClick={() => {
            setCurrentIndex((currentIndex + 1) % promptData.length);
            setResetKey(prev => prev + 1);
          }} className="px-4 py-2 text-white border border-white rounded-full">Next</button>
        </div>
        <div className="absolute top-6 right-6 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-lg font-bold">
          <Timer resetTrigger={resetKey} />
        </div>
      </div>
    )
  );
}
