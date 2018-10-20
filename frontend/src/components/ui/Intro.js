import React from 'react';

const Intro = ({ displayTileInfo, activeTileInfo, readyToPlay, toggleInfo, activeNumber, help }) => (
  <div
    className={`introductory-container ${readyToPlay ? 'animate-out': ''} ${displayTileInfo ? 'visible': ''}`}
  >
    <div className="how-top-play-container">
      <button onClick={() => toggleInfo()}>&times;</button>
    </div>
    {help
      ?(
        <div>
          <h3>?&#191;?  how to play  ?&#191;?</h3>
          <br />
          <br />
          <br />
          <ol>
            <li>Download Cipher/Status browser on thy mobile device.</li>
            <li>Enter thy confession into the unholy terminal.</li>
            <li>Scan the qr code to collect thy token.</li>
            <li>Solve the puzzle to save thy soul.</li>
          </ol>
        </div>
      ) : (
        <div>
          <div className="title-section">
            <div className="tile-container">
              <div className={`tile tile-${activeNumber} tile-info`} />
            </div>
            <h2>{activeTileInfo.get('title')}</h2>
          </div>
          <p>{activeTileInfo.get('description')}</p>
        </div>
      )
    }
  </div>
);

export default Intro;