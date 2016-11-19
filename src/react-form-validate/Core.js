import Validator from "validator";
import inspector from "schema-inspector";
import _ from "lodash";

import schemas from "./schemas";

class ValidateCore {

  constructor() {
    this.schemas = schemas;
  }

  createForm(formname, schema) {
    const values = {};
    const sanitization = _.get(this.schemas.sanitizations, schema);
    if (sanitization) {
      inspector.sanitize(sanitization, values);
    }
    return values;
  }

  validateForm(values, schema) {
    const validation = _.get(this.schemas.validations, schema);
    if (validation) {
      const result = inspector.validate(validation, values);
      console.log(result);
      const asObject = result.error.reduce((previousValue, current) => {
        // cut '@.' from the beginning
        const property = current.property.substring(2);
        previousValue[property] = current.message;
        return previousValue;
      }, {});
      console.log(asObject)
      result.errorObj = asObject;
      return result;
    }
    return {};
  }

  validateField(values, schema, field, value) {
    // console.log("yo nigga" + values + schema + field + value)
    const validation = _.get(this.schemas.validations, `${schema}.properties.${field}`);
    if (validation) {
      const result = inspector.validate(validation, value);
      console.log(result);
      const obj = {};
      obj[field] = result.error.map(err => err.message);
      return obj;
    }
    return {};
  }

}

export default new ValidateCore();
