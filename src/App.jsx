import Dice from './components/Dice'
import { useState } from 'react'

function App() {
  const [diceNumbers, setDiceNumbers] = useState(randomDice());

  function randomDice() {
    const numbersArray = [];
    while (numbersArray.length < 10) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbersArray.push({ value: randomNumber, isHeld: false });
    }
    return numbersArray;
  }

  function rollDice() {
    const newDiceRoll = randomDice();
    setDiceNumbers(newDiceRoll);
  }

  const newDices = diceNumbers.map((item, index) => {
    return <Dice key={index} value={item.value} />
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
