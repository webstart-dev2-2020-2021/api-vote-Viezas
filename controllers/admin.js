const { json } = require("body-parser")
const User = require("../models/user")

module.exports = {
  async users(req, res) { //Users
    const users = await User.find()
    return res.status(201).send({
      success: true,
      users : users
    })
  },

  async user(req, res) {  //User
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status('401').json({
        success : false,
        message : "L'id fournit est invalid !"
      })
    }
    return res.status(201).send({
      success: true,
      user : user
    })
  }
}