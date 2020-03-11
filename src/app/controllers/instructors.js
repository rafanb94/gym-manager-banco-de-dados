const Instructor = require ("../models/Instructor")

module.exports = {
  index (request, response){

    Instructor.all(function(instructors) {
      return response.render("instructors/index", { instructors })
    })

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
    
    Instructor.create(response.body, function (instructor){
          return response.redirect(`/instructors/${instructor.id}`)
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
