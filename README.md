# Cake Memory Game
🎂🍰🎂🎂
🎂🎂🎂🎂
🎂🎂🍰🎂

This is a fun memory game to match up the different cakes!

# How I Built This Game

### 1. Create the Card Images array 
- Outside of the App function, create an Array called cardImages. 
-   This will hold each cake image its own object with a key of "src".

App.jsx

            const cardImages = [
                { "src": "/img/cake1.png"},
                { "src": "/img/cake2.png"},
                { "src": "/img/cake3.png"},
                { "src": "/img/cake4.png"},
                { "src": "/img/cake5.png"},
                { "src": "/img/cake6.png"},
            ]

            function App() {
                return()
            }

### 2. Create the Shuffle Cards Function
- Create a function called shuffleCards
- Inside the function, create a variable called shuffledCards
    - Inside an array, spread the cardImages twice to create two copies, this will give the user two matches to find.
    - Attach a sort method to shuffledCards array as well as a Math.random method to randomized the sort (if is a negative number the items stay the in the same order, else the items are shuffled)
    - Isolate each card with the map method, this will create a new array for only that card and it's properties. 
    - Inside the map method, add on a new id property to give each card its own random id to access. 

App.jsx

            const shuffleCards = () => {
                const shuffledCards =  [...cardImages, ...cardImages]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card, id: Math.random() }))
            }

### 3. Add a State Variable for the cards
- import the { useState } hook from React
- Store the cards in a state variable
- Set the initial value to an empty array
- Update the state, call the setCards state and pass in the shuffledCards variable to set the new state.

App.jsx

        function App(){
            const [cards, setCards] = useState([])
        
        //shuffle cards
        const shuffleCards = () => {
                const shuffledCards =  [...cardImages, ...cardImages]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card, id: Math.random() }))

            setCards(shuffledCards)    
        }
        return(
           .
           .
           .     
        )
        }

### 4. Add a State Variable for the player's turns
- Store the turns in a new state variable
- Set the initial value to zero 
- Call the SetTurns state and pass in the value of zero, this will assure it will always start at zero when the "restart" button is clicked, which will call the shuffleCards function

App.jsx

        function App(){
            const [cards, setCards] = useState([])
            const [turns, setTurns] = useState(0)

            //shuffle cards
            const shuffleCards = () => {
                const shuffledCards =  [...cardImages, ...cardImages]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card, id: Math.random() }))

            setCards(shuffledCards)   
            setTurns(0) 
        }
        return(
           .
           .
           .     
        )
        }

### 5. Add the Button Functionality
-  add an onClick attribute the the button element

        <button onClick={shuffleCards}>Restart Game</button>

### 6. Display Cards in a Grid
- Create a div with a className of "card-grid"
- Inside the "card-grid" div:
- map through the cards state (current array of cards)
- Inside the "card-grid", create a div with a className of "card"
- Attach a key to the div and pass it the {card.id} property from the shuffledCards mapped array
- Inside the "card" div, create another div to hold the front and back images of the card

App.jsx

        <div className="card-grid">
            {cards.map(card => (
            <div className="card" key={card.id}>
              <div>
                <img className="front" src={card.src} alt="card-front" />
                <img className="back" src="/img/cake.png" alt="card-back" />
              </div>
            </div>
          ))}
        </div>

### 7. Style the Card Grid
- Target the "card-grid" class
- Display the grid with a grid template that gives it four columns 
- Give it a gap of 20 px 

App.css

        .card-grid {
            margin-top: 40px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
        }

### 8. Create a Single Card Component
- copy and paste the "card" div to a new file 
- remove the key property 
- pass in props to gain access to the "card"

SingleCard.jsx

        import React from "react";

        const SingleCard = ({ card }) => {
        return (
            <div className="card">
            <div>
                <img className="front" src={card.src} alt="card-front" />
                <img className="back" src="/img/cake.png" alt="card-back" />
            </div>
            </div>
        );
        };

        export default SingleCard;

### 9. Update the Card Grid Div
- pass in the new component to replace the SingleCard
- add the key property 
- add props to give the SingleCard component access to each card

App.jsx

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard key={card.id} card={card}/>
          ))}
        </div>

### 10. Style the cards
- Create a stylesheet for the SingleCard component: SingleCard.css
- Target the "card" to set a position
- Target the "card img" to set nicer styling
- import the style file in the SingleCard component

SingleCard.css

        .card {
            position: relative;
        }

        .card img {
            width: 100%;
            display: block;
            border: 2px solid #fff;
            border-radius: 6px;
        }

### 11. Setup the Click Functionality 
- Add a click event to the back of each card

    SingleCard.jsx

        <img className="back" src="/img/cake.png" onClick={handleClick} alt="card-back" />

- Add a function to handle the user's choice called: handleChoice
- The handleChoice function will take in a card as a parameter to evaluate the choice

    App.jsx

        const handleChoice = (card) => {
            console.log(card)
        }
- Pass in a prop to the SingleCard component to gain access to the handleChoice function 
    
    App.jsx

        <SingleCard key={card.id} card={card} handleChoice={handleChoice}/>

- Pass in the prop to the SingleCard function
- Add the handleClick function to update state in the App component
- Call the handleChoice function inside the handleClick and pass in the "card"

    SingleCard.jsx

        const SingleCard = ({ card, handleChoice }) => {
            handleChoice(card)
        }

### 12. Store User's Card Choices to Compare 
- Create two more state variables to hold the choices 
- Set the initial state to null

App.jsx

        const [choiceOne, setChoiceOne] = useState(null)
        const [choiceTwo, setChoiceTwo] = useState(null)

- If there is no value, update choice one
- Else, update choice two 
- Add an evaluation to the handleChoice function using the ternary operator 

App.jsx

        const handleChoice = (card) => {
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        }

### 13. Compare the Two Cards
- Utilize the { useEffect } React hook 
- Pass in a function and a dependency array as the argument
- When a dependency changes from choice one or choice two, fire a function
- Only runs if both choiceOne and choiceTwo are both selected to compare
- if choiceOne.src and choiceTwo.src are the same then invoke the resetTurn function
- The resetTurn function will set the choices back to the null state values as well as set the state of setTurns by passing in a function of adding one to the previous turns 

App.jsx

        // compare 2 selected cards
        useEffect(() => {
            if(choiceOne && choiceTwo){

            if(choiceOne.src === choiceTwo.src){
                console.log('Those cards match!')
                resetTurn()
            } else {
                console.log('Those cards do not match 😢')
                resetTurn()
                }
            }
        }, [choiceOne, choiceTwo])

        // reset choices & increase turn 
        const resetTurn = () => {
            setChoiceOne(null)
            setChoiceTwo(null)
            setTurns(prevTurns => prevTurns + 1)
        }

### 14. Keep Track of Matched Cards in State
- Add a match property to the cardImages array and set it to false

App.jsx

        const cardImages = [
            { src: "/img/cake1.png", matched: false },
            { src: "/img/cake2.png", matched: false },
            { src: "/img/cake3.png", matched: false },
            { src: "/img/cake4.png", matched: false },
            { src: "/img/cake5.png", matched: false },
            { src: "/img/cake6.png", matched: false }
        ];
- Update the card's state, find the cards the user has selected and set the match property to true
- Invoke the setCards function in the evaluation when matching two cards, pass in the previous cards state as a parameter and return the new value of the cards inside the new mapped array
- Inside the mapped array, choiceOne and choiceTwo are going to have the matched property to be true.
- Return a new object that represents that card and spread out the card properties to gain access to the card properties and change the "match" to true. This will return a new card object instead of the original object if they match, else the original card is returned

App.jsx

        useEffect(() => {
            if(choiceOne && choiceTwo){
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

                resetTurn()
            }
            }
        }, [choiceOne, choiceTwo])


### 15. Flipping the Cards 
- Add a "flipped" prop to the SingleCard component call and check if it is true or false
- First evaluate the card and choiceOne
- Second evaluate the card and choiceTwo
- Third evaluate the card and the matched property

            flipped={card === choiceOne || card === choiceTwo || card.matched}
 

- Pass in the "flipped" prop to the SingleCard component function 

    const SingleCard = ({ card, handleChoice, flipped }) => 

- Use a dynamic ternary class to add to the div that holds the card images

        <div className={flipped? "flipped" : ""} >
           

### 16. Styling the Flipped Cards
- set the position to be relative to the card parent element so it sits on top of the back of the card
- To only show the back, hide by using the Y axis and set the rotation to 90 degrees using the transform property then switch it back to zero.

SingleCard.css

        .card .front {
            transform: rotateY(90deg);
            position: absolute;
        }

        .flipped .front {
            transform: rotateY(0deg);
        }

### 17. Set a Delay on the Flipped Cards that Do Not Match
- Use the setTimeOut function 
- Wait one second before firing the resetTurn function 

App.jsx

      else {
        setTimeout(() => resetTurn(), 1000)
      }

### 18. Add Animation to the Flipped Cards
- Use a combination of transition and transform to give a flip effect
- Only when the flipped class is activated, the card rotates with a delay

SingleCard.css

    /* front of card  - the picture */
    .card .front {
        transform: rotateY(90deg);
        transition: all ease-in 0.2s;
        position: absolute;
    }

    .flipped .front {
        transform: rotateY(0deg);
        transition-delay: 0.2s;
    }

    /* back of card - cover */
    .card .back {
        transition: all ease-in 0.2s;
        transition-delay: 0.2s;
    }
    .flipped .back {
        transform: rotateY(90deg);
        transition-delay: 0s;
    }

### 19. Disable Card Selections
- Create a new state variable for disable, set the initial value to FALSE

App.jsx

      const [disabled, setDisabled] = useState(false)

- Call the setDisabled state in the useEffect function and change the value to be TRUE while we check the other cards.

App.jsx

        useEffect(() => {
            if(choiceOne && choiceTwo){
            setDisabled(true)
            .
            .

- Once the comparison is done, setDisabled is set back to FALSE once the resetTurn function is invoked.

App.jsx

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

- Pass in a dynamic prop to the SingleCard component call and pass in the "disabled" value as the prop

App.jsx 

      disabled={disabled}

- Accept the "disabled" prop in the SingleCard component

SingleCard.jsx

    const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

- Evaluate the prop "disabled"
- Only when "disabled" is FAlSE and the card is not disabled, this will allow the handleChoice function to run and updates the choice state, which flips the card

SingleCard.jsx

    const handleClick = () => {
      if(!disabled) {
        handleChoice(card)
      }
    }

### 20. Auto Start the Game 
- Use a paragraph tag to add the Turns to the UI

App.jsx

    <p>Turns: {turns}</p>

- Add another useEffect React hook, to start a new game 

App.jsx

    useEffect(() => {
        shuffleCards()
    }, [])

- Reset choiceOne and choiceTwo in the shuffleCards function back to null.

App.jsx

      const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null)
        setChoiceTwo(null)  
        setCards(shuffledCards);
        setTurns(0);
    };


