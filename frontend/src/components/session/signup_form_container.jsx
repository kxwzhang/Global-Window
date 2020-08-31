import React from "react";
import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import SignupForm from "./signup_form";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    otherForm: (
      <button
        className="other-form"
        onClick={() => dispatch(openModal("login"))}
      >
        Login
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
