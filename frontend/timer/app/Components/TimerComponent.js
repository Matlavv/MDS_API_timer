
import React, { useState, useEffect } from 'react';

export default function TimerComponent() {
  const [rondsRemplis, setRondsRemplis] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [meilleurTemps, setMeilleurTemps] = useState(null);
  const [message, setMessage] = useState('Appuyez sur le bouton start pour démarrer');

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn && timer !== 0) {
      clearInterval(interval);
      // Mettre à jour le meilleur temps si nécessaire
      if (meilleurTemps === null || timer < meilleurTemps) {
        setMeilleurTemps(timer);
      }
    }

    return () => clearInterval(interval);
  }, [timerOn, timer, meilleurTemps]);

  const toggleTimer = () => {
    if (!timerOn) {
      setTimer(0);
      setRondsRemplis(0);
      setMessage('Lorsque les 4 boutons sont blancs, appuyez sur le bouton le plus rapidement possible');
      const interval = setInterval(() => {
        setRondsRemplis((prev) => {
          if (prev >= 4) {
            clearInterval(interval);
            setTimerOn(true);
            return prev;
          }
          return prev + 1;
        });
      }, Math.random() * 3000 + 500);
    } else {
      setTimerOn(false);
      setMessage('Appuyez sur le bouton start pour démarrer');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const centiseconds = (time / 10) % 100;
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="space-y-8 ">
        {/* Ronds */}
        <div className="flex space-x-4 justify-center">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-20 w-20 rounded-full border-2 ${
                i < rondsRemplis ? 'bg-white' : 'border-gray-300'
              }`}
            ></div>
          ))}
        </div>

        {/* Timer et bouton */}
        <div className="text-center">
          <p className="text-2xl font-semibold">
            {formatTime(timer)}
          </p>
          <button 
            className="mt-4 bg-transparent text-white font-semibold hover:text-gray-500 py-2 px-4 border border-white hover:border-gray-500 rounded" 
            onClick={toggleTimer}>
            {timerOn ? 'Stop' : 'Start'}
          </button>
        </div>
        <h3 className='m-3 text-2xl font-semibold'>{message}</h3>
        {meilleurTemps !== null && (
          <p className='flex justify-center font-semibold'>Votre meilleur temps : {formatTime(meilleurTemps)}</p>
        )}
      </div>
    </main>
  );
}