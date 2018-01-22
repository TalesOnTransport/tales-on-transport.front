import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { store } from "../index";
import { setBookFound, setScannedBook } from "../actions/actions";
import { getBookFound, getScannedBook } from "../selectors/selectors";

class SubmitPin extends Component {
  handleOnClick = () => {
    console.log("click props", this.props);
    const pin = document.getElementById("pin-input-box").value;
    // validation - inline error, no negatives or dots etc, max six numbers
    if (pin) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `http://localhost:55877/api/Scans/${pin}`, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 404) {
          store.dispatch(setBookFound({ bookFound: false }));
          this.props.history.push("/not-found");
        }
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const { author, id, timesScanned, title } = JSON.parse(xhr.response);
          store.dispatch(setScannedBook({ author, id, timesScanned, title }));
          this.props.history.push(`/scan/${id}`);
        }
      };
      xhr.send();
    }
  };

  render() {
    return (
      <div>
        <input id="pin-input-box" max="999999" min="0" placeholder="123456" />
        <button onClick={this.handleOnClick}>Go!</button>
      </div>
    );
  }
}

SubmitPin.propTypes = {
  book: PropTypes.shape({}).isRequired,
  bookFound: PropTypes.bool.isRequired
};

SubmitPin.defaultProps = {
  book: {},
  bookFound: true
};

const mapStateToProps = state => ({
  book: getScannedBook(state),
  bookFound: getBookFound(state)
});

export default connect(mapStateToProps)(withRouter(SubmitPin));
