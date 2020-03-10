const { age, date } = require ("../../lib/utils")

module.exports = {
  index (request, response){
    return response.render("members/index")
  },
  create (request, response){
    return response.render("members/create")
  },
  post (request, response){
    const keys = Object.keys(request.body);
    //return response .send(keys)
  
    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }
    return
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
