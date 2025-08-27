import { useRef, useState } from "react";

const LockGame = () => {
  const secretSequence = [
    { direction: "right", number: 10 },
    { direction: "left", number: 25 },
    { direction: "right", number: 5 },
    { direction: "left", number: 40 },
  ];

  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const turnDial = (direction: "left" | "right") => {
    setPosition((prev) => {
      let newPos = direction === "right" ? (prev + 1) % 50 : (prev + 49) % 50;

      const currentStep = secretSequence[step];
      if (
        currentStep &&
        currentStep.direction === direction &&
        newPos === currentStep.number
      ) {
        audioRef.current?.play();
        if (step + 1 === secretSequence.length) {
          setUnlocked(true);
        } else {
          setStep(step + 1);
        }
      }

      return newPos;
    });
  };

  const resetGame = () => {
    setPosition(0);
    setStep(0);
    setUnlocked(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <audio ref={audioRef} src="/lockOpen.wav" preload="auto" />

      <div className="relative w-48 h-48 rounded-full border-8 border-gray-600 flex items-center justify-center bg-black shadow-lg">
        <div className="absolute text-2xl font-bold">{position}</div>
      </div>

      <div className="flex gap-6 mt-6">
        <button
          onClick={() => turnDial("left")}
          className="px-6 py-3 bg-gray-700 rounded-full hover:bg-gray-600"
        >
          Gauche
        </button>
        <button
          onClick={() => turnDial("right")}
          className="px-6 py-3 bg-gray-700 rounded-full hover:bg-gray-600"
        >
          Droite
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-red-600 rounded-full hover:bg-red-500"
        >
          Reset
        </button>
      </div>

      {unlocked && (
        <div className="mt-6 text-green-400 text-2xl animate-bounce">
          Coffre déverrouillé !
        </div>
      )}
    </div>
  );
};

export default LockGame;
