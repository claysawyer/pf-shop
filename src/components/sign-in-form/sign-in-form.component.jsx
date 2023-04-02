import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      resetFormFields();
    } catch (error) {
      handleSignInError(error);
    }
  };

  const handleSignInError = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        alert("incorrect password");
        break;
      case "auth/user-not-found":
        alert("no user associated with this email");
        break;
      default:
        console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in-form-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          id="sign-in-email"
          value={formFields.email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          id="sign-in-password"
          value={formFields.password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={handleGoogleSignIn}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
