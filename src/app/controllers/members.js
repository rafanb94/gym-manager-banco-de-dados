const { date, age } = require("../../lib/utils");
const Member = require("../models/Member");

module.exports = {
  index(request, response) {
    let{ filter, page, limit } =  request.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members) {
        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }
        return response.render("members/index", { members, pagination, filter });
      }
    }
    Member.paginate(params)
  },
  create(request, response) {
    Member.instructorsMember(function (options) {
      return response.render("members/create", {instructorOptions: options});
    })
  },
  post(request, response) {
    const keys = Object.keys(request.body);
    //return response .send(keys)

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Preencha todos os campos");
      }
    }

    Member.create(request.body, function(member) {
      return response.redirect(`/members/${member.id}`);
    });
  },
  show(request, response) {
    Member.find(request.params.id, function(member) {
      if (!member) return response.send("Instrutor nao encontrado");
      member.birth = date(member.birth).birthDay;

      return response.render("members/show", { member });
    });
  },
  edit(request, response) {
    Member.find(request.params.id, function(member) {
      if (!member) return response.send("Instrutor nao encontrado")

      member.birth = date(member.birth).iso

      if (!member) return response.send("Instrutor nao encontrado")

      member.birth = date(member.birth).iso

      Member.instructorsMember(function (options) {
        return response.render("members/edit", { member, instructorOptions: options });
      })

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

    Member.update(request.body, function() {
      return response.redirect(`/members/${request.body.id}`);
    });
  },
  delete(request, response) {
    Member.delete(request.body.id, function() {
      return response.redirect(`/members`);
    });
  }
};
