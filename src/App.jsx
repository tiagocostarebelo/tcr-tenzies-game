import Dice from './components/Dice'
import { useState } from 'react'

function App() {
  const [diceNumbers, setDiceNumbers] = useState(randomDice());

  function randomDice() {
    const numbersArray = [];
    while (numbersArray.length < 10) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      numbersArray.push(randomNumber);
    }
    return numbersArray;
  }


  const newDices = diceNumbers.map((number, index) => {
    return <Dice key={index} value={number} />
  })


  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <div className="dice-container">
        {newDices}
      </div>
    </main>
  )
}

export default App
