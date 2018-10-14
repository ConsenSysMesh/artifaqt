import React, { Component } from 'react';

import vid from './assets/flames.mp4';

class Video extends Component {
  render() {
    return (
      <div className="background-video">
        <video autoPlay playsInline loop muted className="video-container">
          <source src={vid} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Video;
