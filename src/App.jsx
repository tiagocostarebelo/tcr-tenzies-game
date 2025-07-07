import Dice from './components/Dice'
import Stopwatch from './components/Stopwatch'
import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [diceNumbers, setDiceNumbers] = useState(() => randomDice());
  const [rolls, setRolls] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef(null);

  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('best-time');
    return saved ? Number(saved) : null;
  })

  const [bestRolls, setBestRolls] = useState(() => {
    const saved = localStorage.getItem('best-rolls');
    return saved ? Number(saved) : null;
  })

  const gameWon = diceNumbers.every(dice => dice.isHeld) &&
    diceNumbers.every(dice => dice.value === diceNumbers[0].value)

  useEffect(() => {
    if (isRunning && !gameWon) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, gameWon]);

  useEffect(() => {
    if (gameWon) {
      if (!bestTime || timer < bestTime) {
        localStorage.setItem('best-time', timer);
        setBestTime(timer);
      }
      if (!bestRolls || rolls < bestRolls) {
        localStorage.setItem('best-rolls', rolls);
        setBestRolls(rolls);
      }
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }, [gameWon])

  function randomDice() {
    const numbersArray = [];
    while (numbersArray.length < 10) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbersArray.push({ id: nanoid(), value: randomNumber, isHeld: false });
    }
    return numbersArray;
  }

  function rollDice() {
    if (!gameWon) {
      setDiceNumbers(oldDice => oldDice.map(item => item.isHeld ? item : { ...item, value: Math.floor(Math.random() * 6) + 1 }));
      setRolls(prev => prev + 1);
    } else {
      setDiceNumbers(randomDice());
      setRolls(0);
      setTimer(0);
      setIsRunning(true);
    }
  }

  function hold(id) {
    setDiceNumbers(prevDiceNumbers => prevDiceNumbers.map(item => {
      return item.id === id ? { ...item, isHeld: !item.isHeld } : item
    }))
  }

  const newDices = diceNumbers.map((item) => {
    return <Dice key={item.id} id={item.id} value={item.value} isHeld={item.isHeld} hold={hold} />
  })


  return (
    <main>
      {gameWon && <Confetti />}
      <div className="description">
        <h1 className="title">Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it as its current value between rolls.</p>
      </div>
      <Stopwatch currentTime={timer} bestTime={bestTime} currentRolls={rolls} bestRolls={bestRolls} />
      <div className="dice-container">
        {newDices}
      </div>

      <button className="new-dice--btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
