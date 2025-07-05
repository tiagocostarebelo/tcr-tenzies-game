import Dice from './components/Dice'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [diceNumbers, setDiceNumbers] = useState(() => randomDice());

  const gameWon = diceNumbers.every(dice => dice.isHeld) &&
    diceNumbers.every(dice => dice.value === diceNumbers[0].value)

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
    } else {
      setDiceNumbers(randomDice())
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
      <div className="dice-container">
        {newDices}
      </div>

      <button className="new-dice--btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
