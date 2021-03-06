import React, { useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function TopBarMobail() {
  const [toggle, setToggle] = useState(false);
  const handelClick = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  return (
    <div>
      <nav className="navbar-dark btn-mobile">
        <button
          className="navbar-toggler"
          type="button"
          onClick={(e) => handelClick(e)}
        >
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
      <div
        aria-hidden="true"
        className={toggle ? "show" : "heid"}
        onClick={(e) => handelClick(e)}
        onKeyDown={(e) => handelClick(e)}
      >
        <NavbarDesktop />
      </div>
    </div>
  );
}
export default TopBarMobail;
