import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import Calendar from "react-calendar"; // Assuming you're using this for the calendar

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({ compose: false });
  const [activeItem, setActiveItem] = useState(""); // Tracks the active sidebar item
  const [selectedItem, setSelectedItem] = useState("MAIL BOX"); // Tracks the displayed name in the top strap
  const navigate = useNavigate();
  const location = useLocation(); // Gets the current location

  const toggleDropdown = (itemName) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

  const handleItemClick = (itemName, displayName) => {
    setActiveItem(itemName);
    setSelectedItem(displayName); // Update the displayed name in the top strap
  };

  // Memoize the pageNameMap to avoid recalculating on every render
  const pageNameMap = useMemo(() => ({
    "/compose": "Compose",
    "/template": "Celebration",
    "/warning": "Warning",
    "/mailbox": "MAIL BOX",
    "/sentmail": "Sent",
    "/starred": "Important",
  }), []);

  // Update the strap name based on the current route
  useEffect(() => {
    const currentPageName = pageNameMap[location.pathname] || "MAIL BOX";
    setSelectedItem(currentPageName);
  }, [location.pathname, pageNameMap]);

  // Reusable sidebar item component
  const NavItem = ({ to, icon, text, id }) => (
    <li className="nav-item">
      <NavLink
        to={to}
        className={`nav-link text-white d-flex align-items-center px-3 py-2 w-100 ${
          activeItem === id ? "bg-primary" : ""
        }`}
        onClick={() => handleItemClick(id, text)}
      >
        <i className={`fas fa-${icon} me-2`}></i>
        <span>{text}</span>
      </NavLink>
    </li>
  );

  // Dropdown items
  const dropdownItems = [
    {
      to: "/compose",
      text: "Compose",
      id: "compose",
    },
    {
      to: "/template",
      text: "Celebration",
      id: "template",
    },
    {
      to: "/warning",
      text: "Warning",
      id: "warning",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className="d-flex flex-column bg-dark text-white pt-4"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "1000",
          marginTop: "40px",
        }}
      >
        {/* Top Strap with Back Button and Selected Item */}
        <div className="d-flex align-items-center mt-1 mb-4 pt-2 pb-2 bg-body-secondary text-black">
          <button
            className="btn btn-link text-black fs-5 ms-2"
            onClick={() => navigate(-1)} // Navigate back to the previous page
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <span className="fw-bold fs-5 ms-2">{selectedItem}</span>
        </div>

        <nav className="flex-grow-1">
          <ul className="nav flex-column p-0">
            <li className="nav-item">
              {/* Dropdown for Compose */}
              <div
                className={`nav-link text-white d-flex align-items-center px-3 py-2 w-100 ${
                  activeItem === "compose" ? "bg-primary" : ""
                }`}
                onClick={() => toggleDropdown("compose")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-box me-2"></i>
                <span>Compose</span>
                <i
                  className={`fas fa-chevron-${
                    isDropdownOpen.compose ? "up" : "down"
                  } ms-auto`}
                ></i>
              </div>
              {isDropdownOpen.compose && (
                <ul className="nav flex-column ms-3">
                  {dropdownItems.map((item) => (
                    <li key={item.id} className="nav-item">
                      <NavLink
                        to={item.to}
                        className="nav-link text-white px-3 py-2"
                        onClick={() => handleItemClick(item.id, item.text)}
                      >
                        {item.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Other Sidebar Items */}
            {[
              {
                icon: "inbox",
                text: "Inbox",
                id: "mailbox",
                link: "/mailbox",
              },
              {
                icon: "paper-plane",
                text: "Sent",
                id: "sentmail",
                link: "/sentmail",
              },
              {
                icon: "star",
                text: "Important",
                id: "starred",
                link: "/starred",
              },
            ].map((item) => (
              <NavItem
                key={item.id}
                to={item.link}
                icon={item.icon}
                text={item.text}
                id={item.id}
              />
            ))}
          </ul>
        </nav>

        {/* Calendar at the Bottom of the Sidebar */}
        <div className="mt-auto p-3 mb-5">
          <div className="calendar-container">
            <Calendar
              tileClassName="calendar-tile" // Custom CSS for each tile
              className="calendar" // Custom CSS for the whole calendar
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "-220px", padding: "20px" }}>
        <h1>Your Main Content Goes Here</h1>
        {/* Replace this with your page's main content */}
      </div>
    </>
  );
};

export default Sidebar;
