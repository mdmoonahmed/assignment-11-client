import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";

// Active link style function
const getLinkStyle = ({ isActive }) => {
  return {
    borderBottom: isActive ? "2px solid  #C9A24D" : "none",
    color: isActive ? " #C9A24D" : "#EAEAEA",
    paddingBottom: "2px",
  };
};

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  console.log(user);

  const handleLogIn = () => navigate("/login");
  const handleLogOut = () => {
    signOutUser().then(() => {
      navigate("/login");
      setIsOpen(false);
    });
  };

  const links = (
    <>
      <li>
        <NavLink className="font-semibold" to="/" style={getLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="font-semibold" to="/meals" style={getLinkStyle}>
          Meals
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className="font-semibold"
            to="/dashboard"
            style={getLinkStyle}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="b-g-main border-b b-subtle">
      <div className="navbar  px-4 lg:px-8 shadow-sm">
        {/* Logo / Brand */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden t-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul className="menu menu-sm dropdown-content b-g-surface rounded-box z-50 mt-3 w-52 p-4 shadow-lg">
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className="header-text flex gap-1 items-center text-xl md:text-3xl font-display t-accent normal-case"
          >
            <img className="h-10" src={logo} alt="" /> Chef Hut
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-10 font-sans text-text-primary">
            {links}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="navbar-end relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsOpen(!isOpen)}>
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full border-2 border-yellow-500 object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg b-g-surface text-white shadow-lg ring-1 ring-yellow-500 z-20">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="t-primary font-semibold">
                      {user.displayName}
                    </p>
                    <p className="text-xs t-muted truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-black flex items-center gap-1 justify-center  text-center px-4 py-3 text-sm font-semibold b-g-accent rounded-md hover:brightness-105 hover:text-gray-300 transition duration-200"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogIn}
              className="b-g-accent text-black font-bold rounded-md px-4 py-2 hover:brightness-105 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
