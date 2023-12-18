
import React, { useState, useEffect, useRef } from "react";
import "./DynamicMenu.scss";

const CustomizedMenu = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [isCompactView, setIsCompactView] = useState(false);
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const menuRef = useRef(null);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleMoreClick = () => {
    setIsMoreClicked(!isMoreClicked);
  };

  useEffect(() => {
    const initialVisibleIds = [1, 2, 3, 4, 5, 6, 7];
    const initialHiddenIds = [8, 9, 10, 11];

    setVisibleItems(items.filter((item) => initialVisibleIds.includes(item.id)));
    setHiddenItems(items.filter((item) => initialHiddenIds.includes(item.id)));

    const updateMenu = () => {
      const thresholdWidth = 175;
      const currentWidth = window.innerWidth;

      if (currentWidth <= thresholdWidth) {
        setIsCompactView(true);
      } else {
        setIsCompactView(false);

        const menuItemWidth = 175;
        const availableWidth = currentWidth - menuItemWidth;

        const visibleCount = Math.floor(availableWidth / menuItemWidth);
        const itemsToShow = items.slice(0, visibleCount);
        const itemsToHide = items.slice(visibleCount);

        setVisibleItems(itemsToShow);
        setHiddenItems(itemsToHide);
      }
    };

    updateMenu();
    window.addEventListener("resize", updateMenu);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateMenu);
    };
  }, [items]);

  if (isCompactView) {
    return (
      <nav className="dynamic-menu compact-view">
        <div className="hamburger-menu">
          <img src="/images/logo.jpg" alt="Menu Icon" />
          <span>E-COMM</span>
        </div>
        <div className="search-bar">
          <div className="input-wrapper">
            <input type="text" placeholder="Search something" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="dynamic-menu" ref={menuRef}>
      <div className="hamburger-menu">
        <img
          src="/images/logo.jpg"
          alt="Menu Icon"
          style={{ width: "23px", height: "22.94px" }}
        />
        <span className="brand-name">E-COMM</span>
      </div>
      <ul>
        {visibleItems.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
        {hiddenItems.length > 0 && (
          <li
            className={`more ${isMoreClicked ? "clicked" : ""}`}
            onClick={handleMoreClick}
          >
            More
            <img
              src="/images/nonselectedarrow.jpg"
              alt="more"
            />
            {isMoreClicked && (
              <ul className="more-items">
                {hiddenItems.map((item) => (
                  <li
                    key={item.id}
                    className={selectedItemId === item.id ? "selected" : ""}
                    onClick={() => handleItemClick(item.id)}
                    style={{
                      position: "relative",
                      backgroundColor: selectedItemId === item.id ? "#fff" : "",
                      color: selectedItemId === item.id ? "#000" : "",
                    }}
                  >
                    {item.label}
                    {selectedItemId === item.id && (
                      <img
                        src="images/tick.jpg"
                        alt="Selected"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>
      <div className="search-bar">
        <div className="input-wrapper">
          <img src="/images/search.jpg" alt="Search" className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </nav>
  );
};

export default CustomizedMenu;
