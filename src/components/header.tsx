"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, validateToken } from "@/services/authService";
import Image from "next/image";

const Header: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("access_token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        const isValidToken = await validateToken(token);
        if (isValidToken) {
          const user = JSON.parse(userData);
          setUserName(`${user.first_name} ${user.last_name}`);
          setUserEmail(user.email);
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    validateUser();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav
      className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
      id="sidenavAccordion">
      {/* Sidenav Toggle Button */}
      <button
        className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
        id="sidebarToggle">
        <i data-feather="menu"></i>
      </button>
      {/* Navbar Brand */}
      <Link href="/dashboard" className="navbar-brand pe-3 ps-4 ps-lg-2">
        Administrador de proyectos
      </Link>

      {/* Navbar Items */}
      <ul className="navbar-nav align-items-center ms-auto">
        {/* User Dropdown */}
        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <a
            className="btn btn-icon btn-transparent-dark dropdown-toggle"
            id="navbarDropdownUserImage"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <Image
              src="/assets/img/illustrations/profiles/profile-1.png"
              alt=""
              className="img-fluid"
              width={40}
              height={40}
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownUserImage">
            <h6 className="dropdown-header d-flex align-items-center">
              <Image
                src="/assets/img/illustrations/profiles/profile-1.png"
                alt=""
                className="dropdown-user-img"
                width={40}
                height={40}
              />
              <div className="dropdown-user-details">
                <div className="dropdown-user-details-name">{userName}</div>
                <div className="dropdown-user-details-email">{userEmail}</div>
              </div>
            </h6>
            <div className="dropdown-divider"></div>
            {/* <a className="dropdown-item" href="#!">
              <div className="dropdown-item-icon">
                <i data-feather="settings"></i>
              </div>
              Account
            </a> */}
            <a className="dropdown-item" href="#!" onClick={handleLogout}>
              <div className="dropdown-item-icon">
                <i className="bi bi-box-arrow-right fs-5"></i>
              </div>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
