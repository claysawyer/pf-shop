import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignUpForm = () => {
  const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName: name });
    } catch (error) {
      console.log("Error creating user:", error.message);
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          required
          name="name"
          id="name"
          value={formFields.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          name="email"
          id="email"
          value={formFields.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          name="password"
          id="password"
          value={formFields.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          id="confirmPassword"
          value={formFields.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
