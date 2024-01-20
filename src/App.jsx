import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const cardImages = [
  { src: "/img/cake1.png", matched: false },
  { src: "/img/cake2.png", matched: false },
  { src: "/img/cake3.png", matched: false },
  { src: "/img/cake4.png", matched: false },
  { src: "/img/cake5.png", matched: false },
  { src: "/img/cake6.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)  
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle user's choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  // set the window size for the confetti
  const { width, height } = useWindowSize()

  return (
    <div className="App">
      <h1>Cake Memory</h1>
      <p>Turns: {turns}</p>
      <button onClick={shuffleCards}>Restart Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {cards.every(card => card.matched) && <Confetti width={width} height={height}/>}
    </div>
  );
}

export default App;
