// Import the neccesary modules.
const HorribleSubsAPI = require("../horriblesubs-api");

const horriblesubsAPI = new HorribleSubsAPI(undefined, false);

// Get all available shows on horriblesubs.
horriblesubsAPI.getAllAnime().then(res => {
  const data = res[0];
  console.log(data);

  // Get data including episodes from horriblesubs.
  horriblesubsAPI.getAnimeData(data)
    .then(res => console.log(require('util').inspect(res, { depth: null })));
}).catch(err => console.error(err));
