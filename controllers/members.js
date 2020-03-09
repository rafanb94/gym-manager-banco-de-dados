const fs = require("fs");
const data = require("../data.json");
const { date } = require ("../utils")

exports.index = function(request, response) {
  return response.render("members/index", {members: data.members});
};
//create (post)
exports.create = function(request, response) {
  return response.render("members/create");
}
//show(get)
exports.show = function(request, response) {
  const { id } = request.params;

  const foundMember = data.members.find(function(member) {
    return member.id == id;
  });
    if (!foundMember) return response.send("não encontrado");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay
  };
  return response.render("members/show", { member });


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
  let { avatar_url,name, email, birth, gender, blood, weidth, heigth } = request.body;

  birth = Date.parse(birth);
  let id = 1
  const lastId = data.members[data.members.length - 1];
  if(lastId) {id = lastId.id + 1}

  data.members.push({
    id,
    avatar_url,
    name,
    email,
    birth,
    gender,
    blood,
    weidth,
    heigth
  });
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return response.send("Error ao gravar o arquivo");
    return response.redirect("/members");
  });
};
//edit (get)
exports.edit = function(request, response) {
  const { id } = request.params;

  const foundMember = data.members.find(function(member) {
    return member.id == id;
  });
    if (!foundMember) return response.send("não encontrado");
    const member = {
      ...foundMember,
      birth: date(foundMember.birth).iso
    }
    return response.render('members/edit', {member})
}
//update (put)
exports.put = function (request, response) {
  const { id } = request.body;
  let index = 0;

  const foundMember = data.members.find(function(member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true
    }

  });
    if (!foundMember) return response.send("não encontrado");

    const member = {
      ...foundMember,
      ...request.body,
      birth: Date.parse(request.body.birth),
      id: Number(request.body.id)
    }
    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if (err) return response.send ("Não foi possivel gravar o arquivo")
      return response.redirect(`/members/${id}`) 
    } )
}
//delete(delete)
exports.delete = function (request, response){
    const { id } = request.body
    
    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })
    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
      if (err) return response.send ("Não foi possivel gravar o arquivo")
      return response.redirect('/members/') 
    } )
}