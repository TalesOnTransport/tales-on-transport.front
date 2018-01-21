import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Scan from "./Scan";

// actions for updating state with scannedId from API call.
// selectors
import { updateScannedId } from "../actions/actions";
import { getScannedId } from "../selectors/selectors";

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
    this.props.dispatch(updateScannedId.updateScannedId(1234));
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
        // MILES do this in a reducer.. and with a saga somewhere?
        this.setState({
          author,
          title,
          timesScanned
        });
      }
    };
    xhr.send();
  }

  render() {
    return (
      <div>
        <h1>Scan container</h1>
        <Scan {...this.state} />
      </div>
    );
  }
}

ScanContainer.propTypes = {
  scannedId: PropTypes.string.isRequired
};

ScanContainer.defaultProps = {
  //   scannedId: "b210efc1-bd90-43dd-b333-c566d7da170a" // Three body problem
  //   scannedId: "ffc6ba8e-fac7-4869-b614-72482ac53710" // Snow Crash
  scannedId: ""
};

const mapStateToProps = state => ({
  scannedId: getScannedId(state)
});

// const mapDispatchToProps = disptach => ({
//   ...bindActionCreators(updateScannedId, dispatch),
//   aThing: bindActionCreators(updateScannedId, disptach)
// });

export default connect(mapStateToProps)(ScanContainer);
