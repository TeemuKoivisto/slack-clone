
import Core from "./Core";
import reducer from "./validate.reducer";
import { createForm, updateForm, replaceForm } from "./validate.actions";

class Validate {

  constructor() {
    this.state = reducer(undefined, { type: "INIT" });
    this.subscribers = [];
  }

  _reduce(formname, action) {
    this.state = reducer(this.state, action);
    this.subscribers.map(subscriber => {
      if (subscriber.formname === formname) {
        subscriber.update(this.getForm(formname));
      }
    });
  }

  // getForms() {
  //   return Object.assign({}, this.state.forms);
  //   return this.state.forms;
  // }

  getForm(formname) {
    // return this.state.forms[formname];
    // apparently my state is not being remade anymore?
    return this.state.forms[formname] ? Object.assign({}, this.state.forms[formname]) : undefined;
  }

  // getFormValues(formname) {
  //   return this.state.get("forms").toJS()[formname].values;
  // }
  //
  // getFormField(formname, field) {
  //   return this.state.get("forms").toJS()[formname].values[field];
  // }
  //
  // getFormErrors(formname) {
  //   return this.state.get("forms").toJS()[formname].errors;
  // }
  //
  // getFieldErrors(formname, schema, field) {
  //   return this.state.get("forms").toJS()[formname].errors[`${schema}_${field}`];
  // }

  subscribeToForm(formname, subscriber, update) {
    const subscription = {
      formname,
      subscriber,
      update,
    };
    subscription.update(this.getForm(formname));
    this.subscribers.push(subscription);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(s => {
      if (s.subscriber !== subscriber) return s;
    });
  }

  createForm(formname, schema) {
    const form = this.getForm(formname);
    if (!form) {
      const values = Core.createForm(schema);
      this.state = reducer(this.state, createForm(formname, schema, values));
    }
    return this.getForm(formname);
  }

  updateForm(formname, field, value) {
    const form = this.getForm(formname);
    const errors = Core.validateField(form.values, form.schema, field, value);
    this._reduce(formname, updateForm(formname, field, value, errors));
  }

  replaceForm(formname, newValues) {
    const form = this.getForm(formname);
    const errors = Core.validateForm(newValues, form.model);
    // console.log(newValues);
    this._reduce(formname, replaceForm(formname, newValues, errors));
    // console.log(this.getForm(formname));
  }

  resetForm(formname) {
    const form = this.getForm(formname);
    const newValues = Core.createForm(form.schema);
    // console.log(newValues);
    this._reduce(formname, replaceForm(formname, newValues, {}));
    // console.log(this.getForm(formname));
  }

  isFormValid(formname) {
    const form = this.getForm(formname);
    if (form) {
      const result = Core.validateForm(form.values, form.schema);
      this._reduce(formname, replaceForm(formname, form.values, result.errorObj));
      // console.log(errors);
      return result.valid;
    } else {
      return false;
    }
  }

  // validateDataToModel(data, model) {
  //   const form = {
  //     model,
  //     values: data,
  //     errors: {
  //       obj: {},
  //       list: [],
  //     }
  //   };
  //   const errors = Core.validateForm(form);
  //   return errors;
  // }
}

export default new Validate();
