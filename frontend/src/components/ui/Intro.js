import React from 'react';

const Intro = ({ claimToken, readyToPlay }) => (
  <div className={`introductory-container ${readyToPlay ? 'animate-out': ''}`}>
    <div>
      <h1>artifaqts</h1>
      <h3>?&#191;? how to play &#191;?&#191;</h3>
      <ol>
        <li>download Cipher or Status Browser on mobile</li>
        <li>enter thy confession into the unholy terminal</li>
        <li>scan the qr code to collect thy token</li>
        <li>solve the puzzle to save thy soul</li>
      </ol>
      <button onClick={() => claimToken()}>claim token</button>
    </div>
  </div>
);

export default Intro;