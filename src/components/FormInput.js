import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import Styles from "./Styles";
export default class FormInput extends Component {
  render() {
    const { hideInputForm, onSubmitData, disableInputID } = this.props;

    const onSubmit = (obj) => {
      onSubmitData(obj);
    };

    const required = (value) => (value ? undefined : "Cannot be empty");
    const mustBeNumber = (value) =>
      isNaN(value) ? "Must be a number" : undefined;
    const minValue = (min) => (value) =>
      isNaN(value) || value >= min
        ? undefined
        : `Should be greater than ${min}`;
    const composeValidators = (...validators) => (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

    return (
      <Styles>
        <div className="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={hideInputForm}>
                ×
              </span>
              <h4 id="title">PRODUCT MANAGEMENT</h4>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={onSubmit}
                initialValues={this.props.initialValues}
                render={({ handleSubmit, form, submitting, pristine }) => (
                  <form onSubmit={handleSubmit}>
                    <Field name="id" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <label>ID</label>
                          <input
                            {...input}
                            type="text"
                            disabled={disableInputID}
                            placeholder="ID"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="name" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <label>Name</label>
                          <input {...input} type="text" placeholder="Name" />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="manufacturer" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <label>Manufacturer</label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Manufacture"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field
                      name="price"
                      validate={composeValidators(
                        required,
                        mustBeNumber,
                        minValue(0)
                      )}
                    >
                      {({ input, meta }) => (
                        <div>
                          <label>Price</label>
                          <input {...input} type="text" placeholder="Price" />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="country" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <label>Country</label>
                          <input {...input} type="text" placeholder="Country" />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <div className="buttons">
                      <button type="submit" disabled={submitting}>
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
            <div className="modal-footer">
              <h5>VNSolution</h5>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}
