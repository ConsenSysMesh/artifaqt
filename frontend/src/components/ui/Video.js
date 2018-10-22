import React, { Component } from 'react';

// import vid from '../../assets/flames.mp4';

class Video extends Component {
  render() {
    const hidden = this.props.readyToPlay ? '' : 'hidden';
        // <video autoPlay playsInline loop muted className="video-container">
        //   <source src={vid} type="video/mp4" />
        // </video>
    return (
      <div className={`background-video ${hidden}`}>
      </div>
    );
  }
}

export default Video;
