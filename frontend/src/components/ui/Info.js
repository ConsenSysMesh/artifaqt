import React from 'react';

const Info = ({ displayTileInfo, activeTileInfo, closeOverlay, activeNumber, help }) => (
  <div
    className={`infomation-container ${displayTileInfo ? 'visible': ''}`}
  >
    <div className="how-top-play-container">
      <button onClick={() => closeOverlay()}>&times;</button>
    </div>
    {help
      ? <HelpInformation />
      : (
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


const HelpInformation = () => (
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
);

export default Info;