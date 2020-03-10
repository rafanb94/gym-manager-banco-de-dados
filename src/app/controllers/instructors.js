const { date } = require ("../../lib/utils")
const  db = require ("../config/db")

module.exports = {
  index (request, response){
    return response.render("instructors/index")
  },
  create (request, response){
    return response.render("instructors/create")
  },
  post (request, response){
    const keys = Object.keys(request.body);
    //return response .send(keys)
  
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }    
    const query = `INSERT INTO instructors (
      name,
      avatar_url,
      gender,
      services,
      birth,
      created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

    const values = [
      request.body.name,
      request.body.avatar_url,
      request.body.gender,
      request.body.services,
      date(request.body.birth).iso,
      date(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
      if (err) return  response.send("DataBase Error")
      return response.redirect(`/instructors/${results.rows[0]}.id`)
    })

  
  },
  show (request, response){
  return
  },
  edit (request, response){
    return
  },
  put (request, response){
    const keys = Object.keys(request.body);
    //return response .send(keys)
  
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }
  },
  delete (request, response){
    return
  }
}
