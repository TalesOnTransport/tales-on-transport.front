import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Scan from "./Scan";

import { store } from "../index";
import { setScannedBook } from "../actions/actions";
import { getScannedBook } from "../selectors/selectors";

class ScanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      title: null,
      timesScanned: null
    };
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:55877/api/Scans/${id}`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 404) {
        // MILES redirect to 404
        console.log("404 xhr", xhr);
      }
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const { author, title, timesScanned } = JSON.parse(xhr.response);
        store.dispatch(setScannedBook({ author, title, timesScanned }));
      }
    };
    xhr.send();
  }

  render() {
    return (
      <div>
        <h1>Scan container</h1>
        <Scan {...this.props.book} />
      </div>
    );
  }
}

ScanContainer.propTypes = {
  book: PropTypes.shape({}).isRequired
};

ScanContainer.defaultProps = {
  book: {}
};

const mapStateToProps = state => ({
  book: getScannedBook(state)
});

export default connect(mapStateToProps)(ScanContainer);
