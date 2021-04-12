const express = require('express')
const controller = require('../controllers/auth.js')

exports.router = (() => {
  const auth = express.Router()

  //Routes
  auth.route('/signup/').post(controller.signup)
  

  return auth
})()