export const CREATE_FORM = "CREATE_FORM";
export const UPDATE_FORM = "UPDATE_FORM";
export const REPLACE_FORM = "REPLACE_FORM";

export const createForm = (formname, schema, values) => (
  {
    type: CREATE_FORM,
    payload: {
      formname,
      schema,
      values,
    },
  }
);

export const updateForm = (formname, field, value, errors) => (
  {
    type: UPDATE_FORM,
    payload: {
      formname,
      field,
      value,
      errors,
    },
  }
);

export const replaceForm = (formname, values, errors) => (
  {
    type: REPLACE_FORM,
    payload: {
      formname,
      values,
      errors,
    },
  }
);

// export const resetForm = (name) => (
//   {
//     type: RESET_FORM,
//     payload: {
//       name,
//     },
//   }
// );
