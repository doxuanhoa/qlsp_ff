import React, { Component } from "react";
import Table from "./RenderTable";
import Database from "./Database";
import FormInput from "./FormInput";
import "rsuite/dist/styles/rsuite-default.css";
import { Alert } from "rsuite";

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
      disableInputID: false,
      textBtn: "Add",
    };
  }

  onChangeStatusInputId = (disableInputID = false) => {
    this.setState({ disableInputID });
  };

  clearInput = () => {
    this.setState({ Properties: {} });
  };

  onChangeSearchField = (e) => {
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
    this.clearInput();
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
      Alert.error(messenger, 1500);
    }
    return validate;
  };

  handleDataSubmit = (obj) => {
    let { index } = this;
    let { ArrayProduct, ArrayTemporary, disableInputID } = this.state;
    if (!disableInputID) {
      if (!this.checkValidateId(obj)) {
        return;
      } else {
        this.setState({
          ArrayProduct: [...this.state.ArrayProduct, obj],
        });
      }
    } else {
      if (ArrayTemporary.length === 0) {
        let index1 = ArrayProduct.findIndex((s) => s.id === obj.id);
        ArrayProduct[index1] = obj;
      } else {
        let index2 = ArrayTemporary.findIndex(
          (s) => s.id === ArrayProduct[index].id
        );
        ArrayProduct[index] = obj;
        ArrayTemporary[index2] = obj;
      }
      this.setState({ ArrayProduct, ArrayTemporary });
    }
    this.onChangeStatusInputId(false);
    this.clearInput();
    Alert.success("Success!", 1500);
  };

  showFormEdit = (id) => {
    let { ArrayProduct } = this.state;
    this.onChangeStatusInputId(true);
    let index = ArrayProduct.findIndex((s) => s.id === id);
    this.setState({
      Properties: ArrayProduct[index],
    });
  };

  deleteData = (id) => {
    let { ArrayProduct, ArrayTemporary } = this.state;
    let index = ArrayProduct.findIndex((s) => s.id === id);
    if (ArrayTemporary.length === 0) {
      ArrayProduct.splice(index, 1);
      this.setState({ ArrayProduct });
    } else {
      let index2 = ArrayTemporary.findIndex((s) => s.id === id);
      ArrayProduct.splice(index, 1);
      ArrayTemporary.splice(index2, 1);
      this.setState({ ArrayProduct, ArrayTemporary });
    }
    Alert.success("Deleted!", 1500);
    this.clearInput();
  };

  render() {
    let {
      ArrayProduct,
      ArrayTemporary,
      disableInputID,
      Properties,
      keyWord,
    } = this.state;
    return (
      <div className="main">
        <FormInput
          onSubmitData={this.handleDataSubmit}
          initialValues={Properties}
          disableInputID={disableInputID}
        />
        <div className="content">
          <div className="search">
            <input
              onChange={this.onChangeSearchField}
              value={keyWord}
              placeholder="Search by id or name..."
            />
          </div>
          <Table
            ArrayProduct={ArrayProduct}
            ArrayTemporary={ArrayTemporary}
            showFormEdit={this.showFormEdit}
            deleteData={this.deleteData}
            keyWord={keyWord}
          />
        </div>
      </div>
    );
  }
}
