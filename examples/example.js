// Import the neccesary modules.
const HorribleSubsAPI = require("../horriblesubs-api");

const horriblesubsAPI = new HorribleSubsAPI(undefined, false);

Get all available shows on eztv.
horriblesubsAPI.getAllAnime().then(res => {
  const data = res[0];
  console.log(data);

  // Get data including episodes from eztv.
  horriblesubsAPI.getAnimeData(data)
    .then(res => console.log(res));
}).catch(err => console.error(err));
