#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios')
const words = require('an-array-of-english-words')
const { sortedLocations } = require('../../server/api/location/locationData')
const { jwtData } = require('../../server/middleware/session/__tests__/setSession.fixture')
const argv = require('yargs')
  .usage('Usage: manyops [numOps]')
  .command('manyops', 'Populate the database with the number of ops specified')
  .help('h')
  .alias('h', 'help')
  .argv

const API_URL = process.env.VLY_URL || 'http://localhost:3122'

const postOp = async (word) => {
  // Generate random location for opportunity
  const randomLocation = sortedLocations[Math.floor(Math.random() * sortedLocations.length)]

  // Generate random tags for opportunity from words
  words.sort(function () { return 0.5 - Math.random() })

  // const maxSize = (tagIds.length > 10) ? 10 : tagIds.length
  const numberOfTags = 10 // Set the number of tags per opp (or randomise with Math.floor(Math.random() * maxSize))
  let randomTags = []

  for (let i = 0; i < numberOfTags; i++) {
    randomTags.push({ tag: words[i] })
  }

  // Generate random image size for opportunity (necessary for generating different images)
  const imageSize = Math.floor(Math.random() * (500 - 400)) + 400

  const op =
  {
    name: 'An opportunity based on: ' + word,
    subtitle: 'Subtitle on: ' + word,
    imgUrl: 'https://picsum.photos/' + imageSize,
    description: 'Description about: ' + word,
    duration: '12 weeks, 1 hour sessions',
    date: '20190401',
    location: randomLocation,
    status: 'active',
    tags: randomTags,
    requestor: '5ccbe4c26c285b7184bff574'
  }

  await axios.post(`${API_URL}/api/opportunities`, op,
    { headers: { Cookie: `idToken=${jwtData.idToken}` } })
}

const createOps = async (numOps) => {
  for (let i = 0; i < numOps; i++) {
    await postOp(words[i])
  }
}

createOps(parseInt(argv._[0]))
