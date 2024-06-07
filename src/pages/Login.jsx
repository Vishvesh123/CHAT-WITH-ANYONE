import React from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/css/login.css";

const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^[0-9]{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};

class Login extends React.Component {
  state = {
    mobile: "",
    otp: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    const { mobile } = this.state;

    if (!isValidPhoneNumber(mobile)) {
      toast.error("Entered Phone number is invalid!");
      toast.info("Enter only 10 digit number.");
      return;
    }

    this.configureCaptcha();
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      })
      .catch((error) => {
        console.log("SMS not sent" + error);
      });
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        localStorage.setItem("myItem", JSON.stringify(this.state.mobile));
        this.props.navigate("/room");
        console.log(localStorage.getItem("myItem"));
      })
      .catch((error) => {
        toast.error("Enter correct OTP!");
      });
  };

  render() {
    return (
      <div className="loginBox">
        <form onSubmit={this.onSignInSubmit}>
          <div className="main">
            <h2>Verify With your Phone Number</h2>
            <div id="sign-in-button"></div>
            <input
              type="tel"
              placeholder="Enter Your Mobile Number"
              maxlength="13"
              required
              onChange={this.handleChange}
              name="mobile"
              value={this.state.mobile}
            />
            <button type="submit" className="m-2 p-2 btn btn-outline-info">
              Send OTP
            </button>
          </div>
        </form>
        <form onSubmit={this.onSubmitOTP}>
          <div className="main2">
            <h3>Enter your otp</h3>
            <input
              type="text"
              maxlength="6"
              onChange={this.handleChange}
              name="otp"
              placeholder="Enter OTP"
              value={this.state.otp}
            />
            <button type="submit" className="m-3 p-2  btn btn-outline-success">
              VERIFY
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export function LoginWithNavigation(props) {
  const navigate = useNavigate();
  return (
    <>
      <Login navigate={navigate}></Login>
    </>
  );
}

export default Login;
