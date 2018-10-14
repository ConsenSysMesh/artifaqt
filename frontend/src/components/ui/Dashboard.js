import React from 'react';

import Station from '../containers/Station';

const size = Array.apply(null, Array(8))

const Dashboard = () => (
  <div className="dashboard">
  {size.map((n, i) => <Station key={i} number={i}/>)}
</div>
);

export default Dashboard;