import React from 'react';

const Network = ({ loading }) =>(
  loading ? <div></div> :
  <div className="network">
    <div className="network-message">
      Hello darq passenger. It seems you are not using an
      appropriate Ethereum browser (check Cipher or 
      Status if needed), and make sure you 
      are qonnected to the MainNet.
    </div>
  </div> 
)

export default Network;
