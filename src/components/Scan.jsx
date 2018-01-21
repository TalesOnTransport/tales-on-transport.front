import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Scan extends Component {
  render() {
    const { author, title, timesScanned } = this.props;
    return (
      <div>
        {author ? (
          <div>
            <h1>Thank you for scanning a book!</h1>
            <h2>You are a wonderful human being</h2>
            <h3>{`Your book is ${title} by ${author}`}</h3>
            <h4>{`It has been scanned ${timesScanned} times`}</h4>
          </div>
        ) : null}
        <Link to="/">
          <h2>About</h2>
        </Link>
      </div>
    );
  }
}

export default Scan;

// (
//     <Redirect to="/not-found" />
//   )
