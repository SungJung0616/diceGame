import './App.css';
import Dice from './component/Dice';
import React,{useState, useEffect} from 'react';

const diceImages = [
  './images/dice1.png', './images/dice2.png', './images/dice3.png',
  './images/dice4.png', './images/dice5.png', './images/dice6.png'
];

function App() {
  const [headText, setHeadText] = useState("Welcome to Dice Game!!");
  const [showModal, setShowModal] = useState(true);
  const [player1Name, setPlayer1Name] = useState('player1');
  const [player2Name, setPlayer2Name] = useState('player2');
  const [player1Dice, setPlayer1Dice] = useState(diceImages[0]);
  const [player2Dice, setPlayer2Dice] = useState(diceImages[0]);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!showModal) { // 모달이 숨겨졌을 때만 헤드 텍스트를 업데이트
      setHeadText("Let's Play!!");
    }
  }, [showModal]);

  useEffect(() => {
    if (result !== "") { // 결과가 있을 때만 헤드 텍스트를 업데이트
      setHeadText(result);
    }
  }, [result]);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);    
  };

const getRoll =()=>{
  const rollsPerSecond = 10;
  const totalDuration = 2000; // 2초
  const numberOfRolls = rollsPerSecond * (totalDuration / 1000);

  for (let i = 0; i < numberOfRolls; i++) {
    setTimeout(() => {
      if (i === numberOfRolls - 1) {
        // 마지막 롤에서 결과 계산
        let player1Choice = randomChoice();
        let player2Choice = randomChoice();
        setPlayer1Dice(player1Choice);
        setPlayer2Dice(player2Choice);
        const finalResult = judgement(player1Choice, player2Choice);
        setResult(finalResult);
        setHeadText(finalResult);
      } else {
        // 중간 롤들에서는 주사위 이미지만 변경
        setPlayer1Dice(randomChoice());
        setPlayer2Dice(randomChoice());
      }
    }, (i * totalDuration) / numberOfRolls);
  }
  } 

  const randomChoice=()=>{
    let randomNumber = Math.floor(Math.random()*diceImages.length)
    console.log("randomNumber : ", randomNumber);
    return diceImages[randomNumber];
  }

  const judgement = (player1, player2) =>{
    if(player1 === player2){
      return "Tie";
    }else if(player1 > player2){
      return `🚩${player1Name} Wins!`;
    }else{
      return `${player2Name} Wins! 🚩`;
    }
  } 


  return (
    <div className="container">
      {showModal && (
        <div className="modal">
          <form onSubmit={handleNameSubmit}>
            <label htmlFor="player1" className="player-label">Player 1:</label>
            <input id="player1" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} required />
            <label htmlFor="player2" className="player-label">Player 2:</label>
            <input id="player2" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} required />
            <button type="submit">Start Game</button>
          </form>
        </div>
      )}
      
      <h1>{headText}</h1>

      <div className="dice">
        <Dice playerName={player1Name} img={player1Dice} />

        <Dice playerName={player2Name} img={player2Dice} />
      </div>      

      {!showModal &&
      <div className="btn-box">
        <button onClick={()=>getRoll()}>Roll Me</button>
      </div>
      }
    </div>
  );
}

export default App;
