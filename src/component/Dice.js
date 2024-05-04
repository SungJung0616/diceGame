import React from 'react'

const Dice = ({ playerName, img }) => {
  return (
    <div>
      <div>
        <p>{playerName || 'Player'}</p>
        <img className="img1" src={img} alt="dice1"/>
      </div>
    </div>
  )
}

export default Dice

