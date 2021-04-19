const { json } = require("body-parser")

module.exports = {
  users(req, res) { //Users
    return res.status(201).send({
      success: true,
      users : [
        {
          name : "toto",
          _id: "1"
        },
        {
          name: "titi",
          _id: "2"
        }
      ]
    })
  },

  user(req, res) {  //User
    //Récuperer id : req.params.id
    return res.status(201).send({
      success: true,
      user : {
        name : "toto",
        _id: "1"
      }
    })
  }
}