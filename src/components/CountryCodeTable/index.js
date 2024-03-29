import React, { Component } from "react";
import PropTypes from "prop-types";
import { map, keys } from "ramda";
import { Row, Table } from "react-bootstrap";
import { FilterHeader } from "../../components";

class CountryCodeTable extends Component {
  componentDidMount() {
    this.props.initialiseApp();
  }

  getRows({ data, fields }) {
    return map(
      // row key has to be unique, but using Code field doesn't guarantee it.
      // data index, which uniqueness guaranted by the DB is a good candidate for this
      // "code" should be "id", to use it data structures needs a change
      row => (
        <tr key={row.code}>{map(field => <td>{row[field]}</td>)(fields)}</tr>
      ),
      data
    );
  }

  getTable(data) {
    if (data) {
      const fields = keys(data[0]); //make tbale independable from the data
      // now the columns are whatever fields in the data exist
      // component doesn't have to now the names of the fields
      // but the data has to be well structured (and has some schema)
      // better data structure -> better code
      const { filters } = this.props.filters;
      const filteredData = data; //sorting function based on filters goes here
      return (
        <Table striped responsive>
          <thead>
            <tr>{map(field => <FilterHeader name={field} />)(fields)}</tr>
          </thead>
          <tbody>{this.getRows({ filteredData, fields })}</tbody>
        </Table>
      );
    } else {
      return <p>Loading data</p>;
    }
  }

  render() {
    return (
      <div>
        <Row key="header-row">
          <h1>Country Calling Codes</h1>
        </Row>
        <Row key="body-row">{this.getTable(this.props.externalData)}</Row>,
      </div>
    );
  }
}

CountryCodeTable.propTypes = {
  externalData: PropTypes.array,
  initialiseApp: PropTypes.func.isRequired,
  filters: PropTypes.object
};

export default CountryCodeTable;
