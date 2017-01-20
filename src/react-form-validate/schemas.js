// const sanitizations = {
//   userLogin: {
//     type: "object",
//     properties: {
//       email: { type: "string", def: "lol", rules: ["trim", "lower"] },
//       password: { type: "string", def: "" }
//     }
//   },
//   userSave: {
//     type: "object",
//     properties: {
//       firstname: { type: "string", rules: ["trim", "title"] },
//       lastname: { type: "string", rules: ["trim", "title"] },
//       email: { type: "string", rules: ["trim", "lower"] }
//     }
//   },
// };

const validations = {
  anonLogin: {
    type: "object",
    properties: {
      nick: { type: "string", minLength: 1, maxlength: 16, error: "Nick has to be between 1 and 16 characters." },
    }
  },
  userLogin: {
    type: "object",
    properties: {
      email: { type: "string", pattern: "email", default: "eef", error: "Email wasn't the correct type." },
      password: { type: "string", minLength: 1, default: "", error: "Password can't be empty."  },
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
  messageSave: {
    type: "object",
    properties: {
      content: { type: "string", minLength: 1, maxlength: 1023 },
    }
  }
};

// module.exports = {
//   sanitizations,
//   validations,
// }

export default validations;
