'use strict'

// Import the neccesary modules.
const HorribleSubsAPI = require('../horriblesubs-api')

// Create a new instance of the module.
const horriblesubsAPI = new HorribleSubsAPI()

// Get all available shows on horriblesubs.
horriblesubsAPI.getAllAnime().then(res => {
  const data = res[0]
  console.log(data)

  // Get data including episodes from horriblesubs.
  horriblesubsAPI.getAnimeData(data)
    .then(res => console.log(res))
}).catch(err => console.error(err))
