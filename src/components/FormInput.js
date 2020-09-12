import React, { Component } from "react";
import { Form as Final_Form, Field } from "react-final-form";
import Styles from "./Styles";
import "rsuite/dist/styles/rsuite-default.css";
import { Input, ControlLabel, Button, Form, InputGroup, Icon } from "rsuite";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onSubmitData, disableInputID } = this.props;
    const onSubmit = (obj, form) => {
      onSubmitData(obj);
      setTimeout(form.restart, 0);
    };
    const required = (value) => (value ? undefined : "(*)");
    const mustBeNumber = (value) => (isNaN(value) ? "(*) Number" : undefined);
    const minValue = (min) => (value) =>
      isNaN(value) || value >= min
        ? undefined
        : `Should be greater than ${min}`;
    const composeValidators = (...validators) => (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
    const styles = {
      textbox: {
        width: "200",
      },
    };

    return (
      <Styles>
        <div className="modal-body">
          <Final_Form
            onSubmit={onSubmit}
            initialValues={this.props.initialValues}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <ControlLabel>Product Management</ControlLabel>
                <Field name="id" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <ControlLabel>ID</ControlLabel>
                      <InputGroup style={styles.textbox}>
                        <InputGroup.Addon>
                          <Icon icon="id-info" />
                        </InputGroup.Addon>
                        <Input
                          {...input}
                          type="text"
                          disabled={disableInputID}
                          placeholder="ID"
                        />
                      </InputGroup>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <ControlLabel>Name</ControlLabel>
                      <InputGroup style={styles}>
                        <InputGroup.Addon>
                          <Icon icon="slack" />
                        </InputGroup.Addon>
                        <Input {...input} type="text" placeholder="Name" />
                      </InputGroup>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="manufacturer" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <ControlLabel>Manufacturer</ControlLabel>
                      <InputGroup style={styles}>
                        <InputGroup.Addon>
                          <Icon icon="home" />
                        </InputGroup.Addon>
                        <Input
                          {...input}
                          type="text"
                          placeholder="Manufacture"
                        />
                      </InputGroup>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
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
                      <ControlLabel>Price</ControlLabel>
                      <InputGroup style={styles}>
                        <InputGroup.Addon>
                          <Icon icon="usd" />
                        </InputGroup.Addon>
                        <Input {...input} type="text" placeholder="Price" />
                      </InputGroup>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="country" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <ControlLabel>Country</ControlLabel>
                      <InputGroup style={styles}>
                        <InputGroup.Addon>
                          <Icon icon="map-marker" />
                        </InputGroup.Addon>
                        <Input {...input} type="text" placeholder="Country" />
                      </InputGroup>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="buttons">
                  <Button type="submit" disabled={submitting}>
                    Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )}
          />
        </div>
      </Styles>
    );
  }
}
