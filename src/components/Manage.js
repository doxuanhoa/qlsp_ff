import React, { Component } from "react";
import Table from "./RenderTable";
import Database from "./Database";
import "rsuite/dist/styles/rsuite-default.css";
import { Alert, Button } from "rsuite";
import { Link } from "react-router-dom";

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
      isInputId: false,
    };
  }

  componentDidMount() {
    const { ArrayProduct, ArrayTemporary } = this.state;
    const getState = this.props.location.state;
    if (getState) {
      let index1 = ArrayProduct.findIndex((s) => s.id === getState.obj.id);
      if (!getState.isInputId) {
        if (!this.checkValidateId(getState.obj)) {
          return;
        }
        this.setState({
          ArrayProduct: [...this.state.ArrayProduct, getState.obj],
        });
      } else {
        if (ArrayTemporary.length === 0) {
          ArrayProduct[index1] = getState.obj;
        } else {
          let index2 = ArrayTemporary.findIndex((s) => s.id === getState.id);
          ArrayProduct[index1] = getState.obj;
          ArrayTemporary[index2] = getState.obj;
        }
        this.setState({ ArrayProduct, ArrayTemporary });
      }
      Alert.success("Success!", 2000);
    }
  }

  onChangeStatusInputId = (isInputId = false) => {
    this.setState({ isInputId });
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
      Alert.error(messenger, 2000);
    }
    return validate;
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
    let { ArrayProduct, ArrayTemporary, keyWord } = this.state;
    return (
      <div className="main">
        <div className="content">
          <Button
            componentClass={Link}
            to={{
              pathname: "/input",
              state: { isInputId: false },
            }}
          >
            New Product
          </Button>
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
            deleteData={this.deleteData}
            keyWord={keyWord}
          />
        </div>
      </div>
    );
  }
}
