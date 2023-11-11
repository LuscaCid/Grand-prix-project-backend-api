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
  async deleteContent(req, res) {
    const {content_id} = req.body
    const content = await knex('contents')
    .where({id : content_id})
    .first()
    if(!content)throw new AppError('conteudo inexistente, nao foi possivel deletar', 401)
    await knex('contents')
    .where({id : content_id})
    .delete()
    
    return res.json()
  }
  async updateContent(req, res){//rota acessada pelo professor para atualizar seu proprio cont
    const {newTitle, newDescription, newUrl} = req.body
    const {content_id} = req.query
    const user_id = req.user.id

    const updatedContent = await knex('contents')
    .where({id : content_id})
    .where({teacher_id : user_id})
    if(!updatedContent)throw new AppError('conteudo de curso nao encontrado', 401)
    if(newTitle){
      await knex('contents')
      .where({id : content_id})
      .where({teacher_id : user_id})
      .update("title", newTitle)
    }
    if(newDescription){
      await knex('contents')
      .where({id : content_id})
      .where({teacher_id : user_id})
      .update("description", newDescription)
    }
    if(newUrl){
      await knex('contents')
      .where({id : content_id})
      .where({teacher_id : user_id})
      .update("video_url", newUrl)
    }
    return res.status(200).json({message : "updated with success"})
  }

  async viewAllContents(){//rota do professor para ver todos os conteudos lancados nas turmas
    const user_id = req.user.id
    
    const allContents = await knex('contents')
    .where({teacher_id : user_id})
    .orderBy('title')

    return res.status(200).json(allContents)
  }
}

module.exports = ContentsControllers