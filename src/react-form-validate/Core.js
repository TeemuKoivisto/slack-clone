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
    if (!this.schemas[schema]) throw new TypeError(`No schema '${schema}' found.`);
    const properties = _.get(this.schemas, `${schema}.properties`) || {};
    // console.log(properties)
    const defaultValues = Object.keys(properties).reduce((previousValue, currentKey) => {
      if (!properties[currentKey].type && !properties[currentKey].default) throw new TypeError(`Schema '${schema}' didn't have type or default value set for property '${currentKey}'.`)
      if (properties[currentKey].default) {
        previousValue[currentKey] = properties[currentKey].default;
      } else {
        const type = properties[currentKey].type;
        if (type === "string") {
          previousValue[currentKey] = "";
        }
      }
      return previousValue;
    }, {})
    return defaultValues;
  }

  validateForm(values, schema) {
    const validation = _.get(this.schemas, schema);
    if (validation) {
      const result = inspector.validate(validation, values);
      console.log(result);
      const asObject = result.error.reduce((previousValue, current) => {
        // cut '@.' from the beginning
        const property = current.property.substring(2);
        if (!previousValue[property]) previousValue[property] = [];
        previousValue[property].push(current.message);
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
    const validation = _.get(this.schemas, `${schema}.properties.${field}`);
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
