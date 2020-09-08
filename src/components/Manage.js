import React, { Component } from "react";
import Table from "./RenderTable";
import Database from "./Database";
import FormInput from "./FormInput";

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
    this.clear_Input();
    this.onChangeStatusInputId();
    this.onChangeStatusForm(true);
  };

  onChangeStatusForm = (showInputForm = false) => {
    this.setState({ showInputForm });
  };

  hideHeaderTable = (showHeaderTable = true) => {
    let { ArrayProduct, ArrayTemporary, keyWord } = this.state;
    if (
      (ArrayProduct.length !== 0 &&
        ArrayTemporary.length === 0 &&
        keyWord !== "") ||
      ArrayProduct.length === 0
    ) {
      this.setState({
        showHeaderTable,
      });
    } else {
      this.setState({
        showHeaderTable: true,
      });
    }
  };

  clear_Input = () => {
    this.setState({ Properties: {} });
  };

  onChangeSearch = (e) => {
    let search = this.state.ArrayProduct.filter((newArray) => {
      return (
        newArray.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        newArray.id.toUpperCase().includes(e.target.value.toUpperCase())
      );
    });
    this.setState(
      {
        keyWord: e.target.value.toUpperCase(),
        ArrayTemporary: search,
      },
      () => this.hideHeaderTable(false)
    );
  };

  onChangeUpdate = (word) => {
    this.hideHeaderTable(false);
    let search = this.state.ArrayProduct.filter((newArray) => {
      return (
        newArray.name.toUpperCase().includes(word.toUpperCase()) ||
        newArray.id.toUpperCase().includes(word.toUpperCase())
      );
    });
    this.setState({ keyWord: word.toUpperCase(), ArrayTemporary: search });
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
      alert(messenger);
    }
    return validate;
  };

  // handleDataSubmit = (obj) => {
  //   if (!this.checkValidateId(obj)) {
  //     return;
  //   } else {
  //     this.setState({
  //       ArrayProduct: [...this.state.ArrayProduct, obj],
  //     });
  //     this.onChangeStatusForm();
  //   }
  // };

  handleDataSubmit = (obj) => {
    let { index } = this;
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
    } else {
      if (ArrayTemporary.length === 0) {
        ArrayProduct[index] = obj;
      } else {
        let index2 = ArrayTemporary.findIndex(
          (s) => s.id === ArrayProduct[index].id
        );
        ArrayProduct[index] = obj;
        ArrayTemporary[index2] = obj;
      }
      this.setState({ ArrayProduct, ArrayTemporary });
      this.onChangeUpdate(keyWord);
      this.onChangeStatusForm();
    }
  };

  showFormEdit = (index) => {
    let { ArrayProduct, ArrayTemporary } = this.state;
    this.showInputForm();
    this.onChangeStatusInputId(true);
    if (ArrayTemporary.length === 0) {
      this.index = index;
      this.setState({
        Properties: ArrayProduct[index],
      });
    } else {
      let index2 = ArrayProduct.findIndex(
        (s) => s.id === ArrayTemporary[index].id
      );
      this.index = index2;
      this.setState({ Properties: ArrayProduct[index2] });
    }
  };

  deleteData = (index) => {
    let { ArrayProduct, ArrayTemporary } = this.state;
    if (ArrayTemporary.length === 0) {
      ArrayProduct.splice(index, 1);
      this.setState({ ArrayProduct });
    } else {
      let index2 = ArrayProduct.findIndex(
        (s) => s.id === ArrayTemporary[index].id
      );
      ArrayProduct.splice(index2, 1);
      ArrayTemporary.splice(index, 1);
      this.setState({ ArrayProduct, ArrayTemporary });
    }
    this.hideHeaderTable(false);
    alert("Deleted!");
  };

  render() {
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
          <h1>PRODUCT MANAGEMENT</h1>
          <button id="btnAdd" onClick={this.showInputForm}>
            Add new product
          </button>
          <div className="search">
            <input
              onChange={this.onChangeSearch}
              value={keyWord}
              placeholder="Search by id or name..."
            />
          </div>
          {
            <Table
              ArrayProduct={ArrayProduct}
              ArrayTemporary={ArrayTemporary}
              showHeaderTable={this.state.showHeaderTable}
              showFormEdit={this.showFormEdit}
              deleteData={this.deleteData}
              keyWord={keyWord}
            />
          }
        </div>
      </div>
    );
  }
}
