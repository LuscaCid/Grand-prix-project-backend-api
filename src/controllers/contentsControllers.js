const knex = require('../database/knex')
const AppError =require('../utils/AppError')

class ContentsControllers{
  async createContent(req, res) {
    const user_id = req.user.id
    const {title, description, video_url, class_id } =  req.body

    const ContentId = await knex('contents')
    .insert({
      title, 
      description, 
      video_url, 
      class_id,
      teacher_id : user_id
    })
    .then(()=>{
      console.log("success")
      return res.status(201).json(ContentId)
    } )
    .catch(e => {
      console.log(e)
      return res.status(500).json({message : "deu ruim"})
    })
    //.finally(knex.destroy())

  }

  async updateContent(req, res){

  }
}

module.exports = ContentsControllers