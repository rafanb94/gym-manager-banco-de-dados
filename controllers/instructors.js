const fs = require("fs");
const data = require("../data.json");
const { age, date } = require ("../utils")

exports.index = function(request, response) {
  return response.render("instructors/index", {instructors: data.instructors});
};
//create (post)
exports.create = function(request, response) {
  return response.render("instructors/create");
}
//show(get)
exports.show = function(request, response) {
  const { id } = request.params;

  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id;
  });
    if (!foundInstructor) return response.send("não encontrado");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat('en-GB').format(foundInstructor.created_at)
  };
  return response.render("instructors/show", { instructor });


};
//post (post)
exports.post = function(request, response) {
  const keys = Object.keys(request.body);
  //return response .send(keys)

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send("Preencha todos os campos");
    }
  }
  let { avatar_url, birth, name, services, gender } = request.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return response.send("Error ao gravar o arquivo");
    return response.redirect("/instructors");
  });
};
//edit (get)
exports.edit = function(request, response) {
  const { id } = request.params;

  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id;
  });
    if (!foundInstructor) return response.send("não encontrado");
    const instructor = {
      ...foundInstructor,
      birth: date(foundInstructor.birth).iso
    }
    return response.render('instructors/edit', {instructor})
}
//update (put)
exports.put = function (request, response) {
  const { id } = request.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function(instructor, foundIndex) {
    if (id == instructor.id) {
      index = foundIndex;
      return true
    }

  });
    if (!foundInstructor) return response.send("não encontrado");

    const instructor = {
      ...foundInstructor,
      ...request.body,
      birth: Date.parse(request.body.birth),
      id: Number(request.body.id)
    }
    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if (err) return response.send ("Não foi possivel gravar o arquivo")
      return response.redirect(`/instructors/${id}`) 
    } )
}
//delete(delete)
exports.delete = function (request, response){
    const { id } = request.body
    
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })
    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if (err) return response.send ("Não foi possivel gravar o arquivo")
      return response.redirect('/instructors/') 
    } )
}