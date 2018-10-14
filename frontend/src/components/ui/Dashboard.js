import React from 'react';

import Station from '../containers/Station';

const size = Array.apply(null, Array(8))

const Dashboard = ({ fetchUserTokens }) => (
  <div className="dashboard">
  {size.map((n, i) => <Station 
                        key={i} 
                        number={i}
                        fetchUserTokens={fetchUserTokens}/>)}
</div>
);

export default Dashboard;