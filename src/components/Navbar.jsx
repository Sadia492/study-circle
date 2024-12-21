import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">StudyCircle</a>
        </div>
        <div className="flex-none gap-2">
          <div>
            <ul className="menu menu-horizontal gap-3 font-semibold px-1">
              <NavLink to="/">
                <li>Home</li>
              </NavLink>
              <NavLink to="/assignments">
                <li>Assignments </li>
              </NavLink>
              <NavLink to="/pending-assignments">
                <li>Pending Assignments</li>
              </NavLink>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink className="p-2" to="/create-assignments">
                <li>Create Assignments</li>
              </NavLink>
              <NavLink className="p-2" to="/my-attempted-assignments">
                <li>My Attempted Assignments</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
