import React from "react";
import "./App.css";
import DynamicMenu from "./components/DynamicMenu/DynamicMenu";
import Carousel from "./components/Carousel/Carousel";

function App() {
  const menuItems = [
    { id: 1, label: "Home" },
    { id: 2, label: "Sunglasses" },
    { id: 3, label: "Watches" },
    { id: 4, label: "Apparel" },
    { id: 5, label: "Shoes" },
    { id: 6, label: "Jewellery" },
    { id: 7, label: "Books" },
    { id: 8, label: "Software" },
    { id: 9, label: "Grocery" },
    { id: 10, label: "Kitchen" },
    { id: 11, label: "Sports" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <DynamicMenu items={menuItems} />
      </header>
      <div className="midTitle">
        <h2 className="title">Featured Products</h2>
        <p className="subtitle">Explore and discover a variety of products</p>
        <Carousel />
      </div>
    </div>
  );
}

export default App;
