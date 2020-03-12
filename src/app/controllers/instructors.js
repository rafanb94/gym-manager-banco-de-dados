const { date, age } = require("../../lib/utils");
const Instructor = require("../models/Instructor");

module.exports = {
  index(request, response) {
    Instructor.all(function(instructors) {
      return response.render("instructors/index", { instructors });
    });
  },
  create(request, response) {
    return response.render("instructors/create");
  },
  post(request, response) {
    const keys = Object.keys(request.body);
    //return response .send(keys)

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }

    Instructor.create(request.body, function(instructor) {
      return response.redirect(`/instructors/${instructor.id}`);
    });
  },
  show(request, response) {
    Instructor.find(request.params.id, function(instructor) {
      if (!instructor) return response.send("Instrutor nao encontrado");
      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).format;

      return response.render("instructors/show", { instructor });
    });
  },
  edit(request, response) {
    Instructor.find(request.params.id, function(instructor) {
      if (!instructor) return response.send("Instrutor nao encontrado");
      instructor.birth = date(instructor.birth).iso

      return response.render("instructors/edit", { instructor });
    });
  },
  put(request, response) {
    const keys = Object.keys(request.body);
    //return response .send(keys)

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }

    Instructor.update(request.body, function() {
      return response.redirect(`/instructors/${request.body.id}`);
    });
  },
  delete(request, response) {
    Instructor.delete(request.body.id, function() {
      return response.redirect(`/instructors`);
    });
  }
};
