const stats = require('stats-lite');

module.exports = {
    displayGasStats: (gasList) => {
        console.log('Gas stats');
        console.log(`list: ${gasList}`);
        console.log(`sum: ${stats.sum(gasList)}`);
        console.log(`min: ${Math.min(...gasList)}`);
        console.log(`mean: ${stats.mean(gasList)}`);
        console.log(`max: ${Math.max(...gasList)}`);
        console.log(`50th percentile: ${stats.percentile(gasList, 0.50)}`);
    },
};
