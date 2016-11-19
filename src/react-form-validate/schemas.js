const sanitizations = {
  userLogin: {
    type: "object",
    properties: {
      email: { type: "string", def: "lol", rules: ["trim", "lower"] }
    }
  },
  userSave: {
    type: "object",
    properties: {
      firstname: { type: "string", rules: ["trim", "title"] },
      lastname: { type: "string", rules: ["trim", "title"] },
      email: { type: "string", rules: ["trim", "lower"] }
    }
  },
};

const validations = {
  userLogin: {
    type: "object",
    properties: {
      email: { type: "string", pattern: "email", error: "Email wasn't the correct type." },
      password: { type: "string", minLength: 1, error: "Password can't be empty."  },
    }
  },
  userSave: {
    type: "object",
    properties: {
      firstname: { type: "string", minLength: 1 },
      lastname: { type: "string", minLength: 1 },
      email: { type: "string", pattern: "email" },
      password: { type: "string", minLength: 8 },
    }
  },
};

module.exports = {
  sanitizations,
  validations,
}
