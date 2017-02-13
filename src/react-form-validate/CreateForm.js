import Validate from "./Validate";
import { Component, PropTypes, createElement } from "react";

export default function connect(formOptions) {

  if (!formOptions) throw new TypeError("No formOptions passed to createForm");
  if (!formOptions.name) throw new TypeError("No name passed to createForm");
  if (!formOptions.schema) throw new TypeError("No schema passed to createForm");

  // function computeMergedProps(stateProps, dispatchProps, parentProps) {
  //   const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
  //   if (process.env.NODE_ENV !== 'production') {
  //     checkStateShape(mergedProps, 'mergeProps')
  //   }
  //   return mergedProps
  // }

  return function wrapWithConnect(WrappedComponent) {

    return class CreateForm extends Component {
      constructor() {
        super();
        const form = Validate.createForm(formOptions.name, formOptions.schema);
        if (!form)  throw new TypeError(`No schema could be found with a name '${formOptions.schema}'.`);
        this.formProps = {
          form,
          isFormValid: () => Validate.isFormValid(formOptions.name),
          getForm: () => Validate.updateForm(formOptions.name),
          updateForm: (field, value) => Validate.updateForm(formOptions.name, field, value),
          resetForm: () => Validate.resetForm(formOptions.name),
        }
      }

      // updateMergedPropsIfNeeded() {
      //   const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
      //   if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
      //     return false
      //   }
      //
      //   this.mergedProps = nextMergedProps
      //   return true
      // }

      // mergeProps(newProps) {
      //   const nextMergedProps = Object.assign({}, this.props || {}, { form: newProps });
      //   this.formProps = nextMergedProps;
      // }

      componentWillMount() {
        Validate.subscribeToForm(formOptions.name, this, (loginForm) => {
          this.formProps = Object.assign({}, this.formProps, { form: loginForm });
          this.setState({});
        });
      }

      componentWillUnmount() {
        Validate.unsubscribe(this);
      }

      render() {
        return createElement(WrappedComponent, {
          ...this.props,
          ...this.formProps,
        })
      }
    }
  }
}
