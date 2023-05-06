import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import blankProfile from "../assets/images/blank_profile.jpg";
import { auth } from "../utils/firebase-config";

export const NavbarUserProfile = (props) => {
  const currentUser = auth.currentUser;

  if (currentUser) { 
    return (
      <Button as={Link} to="/profile" variant="warning">
        <img
          src={blankProfile}
          alt="profile"
          style={{ width: "40px" }}
          className="rounded-pill"
        />
        <span className="ps-2">{currentUser.email}</span>
      </Button>
    );
  } else {
    return null;
  }
};