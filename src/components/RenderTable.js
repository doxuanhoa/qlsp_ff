import React, { Component } from "react";

class RenderTable extends Component {
  ShowData = () => {
    let {
      ArrayProduct = [],
      ArrayTemporary = [],
      keyWord,
      showFormEdit,
      deleteData,
    } = this.props;
    let listData = (keyWord === "" ? ArrayProduct : ArrayTemporary).map(
      (newArray, index) => {
        return (
          <tr key={index}>
            <td>{newArray.id}</td>
            <td>{newArray.name}</td>
            <td>{newArray.manufacturer}</td>
            <td>{newArray.price}</td>
            <td>{newArray.country}</td>
            <td>
              <button onClick={() => showFormEdit(index)}>Edit</button>{" "}
              <button onClick={() => deleteData(index)}>Delete</button>
            </td>
          </tr>
        );
      }
    );
    return listData;
  };

  render() {
    return (
      <div>
        <table id="table" border={1}>
          {this.props.showHeaderTable && (
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Country</th>
                <th id="action">Action</th>
              </tr>
            </thead>
          )}
          <tbody id="dataTable">{this.ShowData()}</tbody>
        </table>
      </div>
    );
  }
}

export default RenderTable;
