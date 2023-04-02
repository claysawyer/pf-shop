import React from "react";
import "./form-input.styles.scss";

// Define a functional component `FormInput` that takes in props, destructures
// `label` and stores the rest of the props in an object `otherProps`
const FormInput = ({ label, ...otherProps }) => (
  // Render a div with a class "form-group"
  <div className="form-group">
    {/* Render an input with a class "form-input" and pass all the remaining
    props to it */}
    <input className="form-input" {...otherProps} />

    {/* If a `label` prop is passed, render a label with class "form-input-label"
    and a dynamic class "shrink" if there is a value in the input */}
    {label && (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    )}
  </div>
);

export default FormInput;
