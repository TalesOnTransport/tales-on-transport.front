import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";

import Scan from "./Scan";
import { store } from "../index";
import { setBookFound, setScannedBook } from "../actions/actions";
import { getBookFound, getScannedBook } from "../selectors/selectors";

class ScanContainer extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:55877/api/Scans/${id}`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 404) {
        store.dispatch(setBookFound({ bookFound: false }));
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
        <Scan {...this.props} />
      </div>
    );
  }
}

ScanContainer.propTypes = {
  book: PropTypes.shape({}).isRequired,
  bookFound: PropTypes.bool.isRequired
};

ScanContainer.defaultProps = {
  book: {},
  bookFound: true
};

const mapStateToProps = state => ({
  book: getScannedBook(state),
  bookFound: getBookFound(state)
});

export default connect(mapStateToProps)(ScanContainer);
