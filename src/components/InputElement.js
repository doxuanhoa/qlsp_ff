import React, { Component } from "react";
import { Field } from "react-final-form";
import "rsuite/dist/styles/rsuite-default.css";
import { Input, InputGroup, Icon } from "rsuite";

export default class InputElement extends Component {
  render() {
    const required = (value) => (value ? undefined : "This field is required");
    return (
      <div>
        <InputGroup>
          <InputGroup.Addon>
            <Icon icon={this.props.icon} />
          </InputGroup.Addon>
          <Field name={this.props.name} validate={required}>
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type={this.props.type}
                  disabled={this.props.disabled}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </InputGroup>
      </div>
    );
  }
}
