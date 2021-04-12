const { json } = require("body-parser")

module.exports = {
  signup(req, res) {
    return res.status(201).json({
      sucess : true,
      user : {
        id : 1,
        name: 'Viezas'
      }
    })
  }
}