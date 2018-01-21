import React from "react";
import { Link } from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => {
  return (
    <Link to="/">
      <h1>Tales on Transport</h1>
    </Link>
  );
};

export default Header;
