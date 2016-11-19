import {
  CREATE_FORM,
  UPDATE_FORM,
  REPLACE_FORM,
} from "./validate.actions";

import schemas from "./schemas";

const INITIAL_STATE = {
  forms: {},
  /*
   form: {
     schema: String,
     values: Object,
     errors: Object
   }
  */
}

export default function (state = INITIAL_STATE, action) {
  let newState;
  switch (action.type) {
    case CREATE_FORM:
      newState = Object.assign({}, state);
      newState.forms[action.payload.formname] = {
        schema: action.payload.schema,
        values: action.payload.values,
        errors: {}
      }
      return newState;
    case UPDATE_FORM:
      // console.log("updating yo ", action)
      let newState = Object.assign({}, state);
      if (action.payload.field) {
        newState.forms[action.payload.formname].values[action.payload.field] = action.payload.value;
      }
      Object.keys(action.payload.errors).map(key => {
        newState.forms[action.payload.formname].errors[key] = action.payload.errors[key];
      })
      return newState;
    case REPLACE_FORM:
      // console.log(action)
      newState = Object.assign({}, state);
      newState.forms[action.payload.formname].values = action.payload.values;
      newState.forms[action.payload.formname].errors = action.payload.errors;
      return newState;
    default:
      return state;
  }
}
