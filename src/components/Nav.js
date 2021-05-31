//React implementation
import React from "react";
//FontAwesome loader component and a music note sign that is being  passed as a prop
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

//Nav stores the logo also, it stores a Library button the sets the libaryStatus
//Boolean state
const Nav = ({ setLibraryStatus, libraryStatus }) => {
  return (
    <nav>
      <h1>KotiDev</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
