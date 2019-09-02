#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios')
const words = require('an-array-of-english-words')
const { jwtData } = require('../../server/middleware/session/__tests__/setSession.fixture')
const argv = require('yargs')
  .usage('Usage: manytags [numTags]')
  .command('manytags', 'Populate the database with the number of tags specified')
  .help('h')
  .alias('h', 'help')
  .argv

const API_URL = process.env.VLY_URL || 'http://localhost:3122'

const postTag = async word => {
  await axios.post(`${API_URL}/api/tags`, { tag: word }, { headers: { Cookie: `idToken=${jwtData.idToken}` } })
}

const createTags = async (numTags) => {
  for (let i = 0; i < numTags; i++) {
    await postTag(words[i])
  }
}

createTags(parseInt(argv._[0]))
