const { json } = require("body-parser")
const Vote = require("../models/vote")
const jwt = require('jsonwebtoken')

module.exports = {
  async create(req, res) {  //Crée un vote
    const {name } = req.body
    if(!name)
    {
      return res.status('401').json({
        success : false,
        message : "Le champ : name est obligatoire !"
      })
    }
    console.log('dans le create');
    try {
      const newVote = new Vote({name})
      const savedVote = await newVote.save()

      return res.status(201).send({
        sucess: true,
        message : 'Nouveau vote crée avec succès !'
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success : false,
        message : "Il semblerait que nous rencontrions un problème, veuillez réessayer plus tard !"
      })
    }
  },

  async vote(req, res) {  //Voter
    const { id } = req.params
    try{
      const token =  req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const vote = await Vote.findById(id)

      if (vote.users.includes(decoded._id)) {
        return res.status(201).send({
          success: false,
          message : 'Vous avez déjà participer à ce vote !'
        })
      }
    
      const pushVote = await Vote.updateOne(
        { _id: id }, 
        { $push: { users: decoded._id } }
      )

      return res.status(201).send({
        success: true,
        message : "Merci d'avoir participé à ce vote !"
      })
    }
    catch(error){
      console.log(error)
      return res.status('500').json({
        success : false,
        message : "Il semblerait que nous rencontrons un problème !"
      })
    }
  },

  async votes(req, res) { //Votes
    const votes = await Vote.find({}, 'name users')   //Récupération des champs : name et users des votes
    return res.status(201).send({
      success: true,
      votes : votes
    })
  },

  async removeVote(req, res) {  //Retirer mon vote
    const { id } = req.params
    try{
      const token =  req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const vote = await Vote.findById(id)

      if (!vote.users.includes(decoded._id)) {
        return res.status(403).send({
          success: false,
          message : "Impossible de retirer votre vote car vous n'y avez pas participé !"
        })
      }
    
      const removeVote = await Vote.updateOne(
        { _id: id }, 
        { $pull: { users: decoded._id } }
      )

      return res.status(201).send({
        success: true,
        message : "Votre vote a été retiré !"
      })
    }
    catch(error){
      console.log(error)
      return res.status('500').json({
        success : false,
        message : "Il semblerait que nous rencontrons un problème !"
      })
    }
  }
}