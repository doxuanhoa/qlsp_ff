import React, { Component } from "react";
import { Form as Final_Form } from "react-final-form";
import Styles from "./Styles";
import "rsuite/dist/styles/rsuite-default.css";
import { ControlLabel, Button, Form } from "rsuite";
import InputElement from "./InputElement";

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

    return (
      <Styles>
        <div className="modal-body">
          <Final_Form
            onSubmit={onSubmit}
            initialValues={this.props.initialValues}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <ControlLabel>ID</ControlLabel>
                <InputElement
                  type="text"
                  icon="edit"
                  name="id"
                  disabled={disableInputID}
                />
                <ControlLabel>Name</ControlLabel>
                <InputElement type="text" icon="slack" name="name" />
                <ControlLabel>Company</ControlLabel>
                <InputElement type="text" icon="home" name="manufacturer" />
                <ControlLabel>Price</ControlLabel>
                <InputElement type="number" icon="usd" name="price" />
                <ControlLabel>Country</ControlLabel>
                <InputElement type="text" icon="map-marker" name="country" />
                <div className="buttons">
                  <Button type="submit" disabled={submitting}>
                    {disableInputID ? "Update" : "Add"}
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
