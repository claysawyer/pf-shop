import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  // Get the current user object from the UserContext using the useContext hook
  const { currentUser } = useContext(UserContext);
  // Get the isCartOpen value and setIsCartOpen function from the CartContext using the useContext hook
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      {/* Use Fragment to group child elements without adding extra nodes to the DOM */}
      <div className="navigation">
        {/* Use Link to create a clickable link to the home page */}
        <Link className="logo-container" to="/">
          {/* Use an SVG file as a React component */}
          <CrwnLogo className="logo" />
        </Link>
        {/* Group the navigation links together in a container */}
        <div className="nav-links-container">
          {/* Use Link to create a clickable link to the shop page */}
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {/* Conditionally render a "SIGN OUT" link if a user is signed in, or a "SIGN IN" link if no user is signed in */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          {/* Render the CartIcon component */}
          <CartIcon />
        </div>
        {/* Conditionally render the CartDropdown component if isCartOpen is true */}
        {isCartOpen && <CartDropdown />}
      </div>
      {/* Render any child components that match the current route using the Outlet component */}
      <Outlet />
    </>
  );
};

export default Navigation;
