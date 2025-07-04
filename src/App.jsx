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

  const newDices = diceNumbers.map((item, index, isHeld) => {
    return <Dice key={item.id} value={item.value} isHeld={item.isHeld} />
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
