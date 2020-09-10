import React, { Component } from "react";
import "rsuite/lib/styles/index.less";
import 'rsuite/dist/styles/rsuite-default.css'
import { Icon, Loader, Table, } from "rsuite";
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
//import fakeData from "https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json"
const { Column, HeaderCell, Cell} = Table;

const styles ={
  btn:{
    backgroundColor: 'red',
    color: "#fff"
  },
  table: {
    width: '710px',
    backgroundColor: 'red',
  }
}

class RenderTable extends Component {
  
  getData() {
    let {
      ArrayProduct = [],
      ArrayTemporary = [],
      keyWord,
    } = this.props;
    const listData = (keyWord === "" ? ArrayProduct : ArrayTemporary)
    return listData;
  }

  render() {
    let {
      showFormEdit,
      deleteData,
    } = this.props;
    const data = this.getData();
    return (
<div>
  <Loader/>
        <Table style={styles.table} data={data} height={400}  >
          <Column width={70} align="center" >
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={200} >
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={100}>
            <HeaderCell>Manufacturer</HeaderCell>
            <Cell dataKey="manufacturer" />
          </Column>
          <Column width={100}>
            <HeaderCell>Country</HeaderCell>
            <Cell dataKey="country" />
          </Column>
          <Column width={50} flexGrow={1}>
            <HeaderCell>Price</HeaderCell>
            <Cell dataKey="price" />
          </Column>
          <Column width={180} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {rowIndex => {
                return (
                  <span>
                    <Button style={styles.btn} onClick={() => {showFormEdit(rowIndex.id)}}> <Icon icon='edit' />Edit </Button> {' '}
                    <Button style={styles.btn} onClick={() => deleteData(rowIndex.id)}><Icon icon='trash' /> Delete </Button>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

export default RenderTable;
