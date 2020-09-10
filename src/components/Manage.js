import React, { Component } from "react";
import Table from "./RenderTable";
import Database from "./Database";
import FormInput from "./FormInput";
import "rsuite/dist/styles/rsuite-default.css";
import { Button, Icon, Loader, Alert,ButtonToolbar,InputGroup, Input } from "rsuite";

export default class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ArrayProduct: Database,
      Properties: {
        id: "",
        name: "",
        manufacturer: "",
        price: "",
        country: "",
      },
      ArrayTemporary: [],
      keyWord: "",
      showInputForm: false,
      disableInputID: false,
      showHeaderTable: true,
    };
  }

  onChangeStatusInputId = (disableInputID = false) => {
    this.setState({ disableInputID });
  };

  showInputForm = () => {
    this.clearInput();
    this.onChangeStatusInputId();
    this.onChangeStatusForm(true);
  };

  onChangeStatusForm = (showInputForm = false) => {
    this.setState({ showInputForm });
  };

  clearInput = () => {
    this.setState({ Properties: {} });
  };

  onChangeSearch = (e) => {
    let search = this.state.ArrayProduct.filter((newArray) => {
      return (
        newArray.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        newArray.id.toUpperCase().includes(e.target.value.toUpperCase())
      );
    });
    this.setState({
      keyWord: e.target.value.toUpperCase(),
      ArrayTemporary: search,
    });
  };

  checkValidateId = (ProductAttribute) => {
    let { ArrayProduct } = this.state;
    let validate = true;
    let messenger = "";
    let count = 0;
    let idInput = ProductAttribute.id.toLowerCase();
    for (let x = 0; x < ArrayProduct.length; x++) {
      let idformData = ArrayProduct[x].id.toLowerCase();
      if (idformData === idInput) {
        count = count + 1;
      }
    }
    if (count > 0) {
      messenger = "The product id already exists!";
      validate = false;
    }
    if (messenger) {
      Alert.error(messenger, 1000);
    }
    return validate;
  };

  handleDataSubmit = (obj) => {
    let {index} = this;
    let { ArrayProduct, ArrayTemporary, keyWord, disableInputID } = this.state;
    if (!disableInputID) {
      if (!this.checkValidateId(obj)) {
        return;
      } else {
        this.setState({
          ArrayProduct: [...this.state.ArrayProduct, obj],
        });
        this.onChangeStatusForm();
      }
      Alert.success("Success!", 1000);
    } else {
      if (ArrayTemporary.length === 0) {
        let index1 = ArrayProduct.findIndex(
          (s) => s.id === obj.id
        );
        ArrayProduct[index1] = obj;
      } else {
        let index2 = ArrayTemporary.findIndex(
          (s) => s.id === ArrayProduct[index].id
        );
        ArrayProduct[index] = obj;
        ArrayTemporary[index2] = obj;
      }
      Alert.success("Success!", 1000);  
      this.setState({ ArrayProduct, ArrayTemporary });
      this.onChangeStatusForm();
    }
  };

  showFormEdit = (id) => {
    let { ArrayProduct, ArrayTemporary } = this.state;
    this.showInputForm();
    this.onChangeStatusInputId(true);
    if (ArrayTemporary.length === 0) {
      let index = ArrayProduct.findIndex(
        (s) => s.id === id
      );
      this.setState({
        Properties: ArrayProduct[index],
      });
    } else {
      let index2 = ArrayProduct.findIndex(
        (s) => s.id === id
      );
      this.index = index2;
      this.setState({ Properties: ArrayProduct[index2] });
    }
  };

    deleteData = (id) => {
    let { ArrayProduct, ArrayTemporary } = this.state;
    if (ArrayTemporary.length === 0) {
      let index = ArrayProduct.findIndex(
        (s) => s.id === id
      );
      ArrayProduct.splice(index, 1);
      this.setState({ ArrayProduct });
    } else {
      let index = ArrayProduct.findIndex(
        (s) => s.id === id
      );
      let index2 = ArrayTemporary.findIndex(
        (s) => s.id === id
      );
      ArrayProduct.splice(index, 1);
      ArrayTemporary.splice(index2, 1);
      this.setState({ ArrayProduct, ArrayTemporary });
    }
    Alert.success("Deleted!", 1000);
  };

  render() {
    const styles = {
      width: 710,
      marginBottom: 10
    };
    let {
      ArrayProduct,
      ArrayTemporary,
      disableInputID,
      Properties,
    } = this.state;
    let { showInputForm, keyWord } = this.state;
    return (
      <div>
        <div className="content">
          {showInputForm && (
            <FormInput
              onSubmitData={this.handleDataSubmit}
              initialValues={Properties}
              hideInputForm={() => this.onChangeStatusForm()}
              disableInputID={disableInputID}
            />
          )}
          <h3>PRODUCT MANAGEMENT</h3>
          <Button appearance="primary" onClick={this.showInputForm}>Add new product</Button>
          <div className="search">
            {/* <input
              onChange={this.onChangeSearch}
              value={keyWord}
              placeholder="Search by id or name..."
            /> */}

<InputGroup inside style={styles}>
      <input
              onChange={this.onChangeSearch}
              value={keyWord}
              placeholder="Search by id or name..."
            />
    </InputGroup>
          </div>
          
            <Table
              ArrayProduct={ArrayProduct}
              ArrayTemporary={ArrayTemporary}
              showHeaderTable={this.state.showHeaderTable}
              showFormEdit={this.showFormEdit}
              deleteData={this.deleteData}
              keyWord={keyWord}
            />
        </div>
      </div>
    );
  }
}
