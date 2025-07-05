import Dice from './components/Dice'
import { useState } from 'react'
import { nanoid } from 'nanoid'

function App() {
  const [diceNumbers, setDiceNumbers] = useState(randomDice());

  function randomDice() {
    const numbersArray = [];
    while (numbersArray.length < 10) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbersArray.push({ id: nanoid(), value: randomNumber, isHeld: false });
    }
    return numbersArray;
  }

  function rollDice() {
    const newDiceRoll = randomDice();
    setDiceNumbers(newDiceRoll);
    console.log(diceNumbers)
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
      <h1 className="title">Tenzies</h1>
      <div className="dice-container">
        {newDices}
      </div>

      <button className="new-dice--btn" onClick={rollDice}>Roll new</button>
    </main>
  )
}

export default App
