const express = require('express')
const controller = require('../controllers/vote.js')

exports.router = (() => {
  const vote = express.Router()
  vote.route('/').get(controller.votes)
  vote.route('/:id').post(controller.vote)
  vote.route('/create').post(controller.create)
  vote.route('/:id').delete(controller.removeVote)

  return vote
})()