const { json } = require("body-parser")
const User = require("../models/user")

module.exports = {
  async signup(req, res) {  //Signup
    const {name, password, email} = req.body
    try {
      const newUser = new User({name, password, email})
      const savedUser = await newUser.save()
      return res.status(201).send({
        sucess: true,
        name: savedUser.name,
        _id: savedUser._id
      })
    } catch (error) {
      console.log(error);
      return res.status(500).send('Erreur du seveur')
    }
  },

  signin(req, res) {  //Signin
    return res.status(201).send({
      success: true,
      user: {
        name: "toto",
        _id: "1",
      }
    })
  }

}