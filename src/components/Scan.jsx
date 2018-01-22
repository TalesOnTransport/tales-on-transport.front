import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Scan extends Component {
  render() {
    const { bookFound } = this.props;
    const { author, timesScanned, title } = this.props.book;
    return (
      <div>
        {bookFound ? (
          <div>
            <h1>Thank you for scanning a book!</h1>
            <h2>You are a wonderful human being</h2>
            <h3>{`Your book is ${title} by ${author}`}</h3>
            <h4>{`It has been scanned ${timesScanned} times`}</h4>
          </div>
        ) : (
          <Redirect to="/not-found" />
        )}
      </div>
    );
  }
}

export default Scan;
