import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.scss';

const Card = React.memo(({ card, index, onClick, className }) => (
  <div className={className} onClick={onClick} id={`card-${index}`}>
    <img src={card.imgSrc} alt={`Card ${index}`} />
    <div className="card-title">{card.title}</div>
  </div>
));

const Carousel = () => {
  const [activeItem, setActiveItem] = useState(1);

  // Define your card data with titles
  const cards = [
    { imgSrc: 'images/Img 5.jpg' },
    { imgSrc: 'images/Img 3.jpg'},
    
    { imgSrc: 'images/Img 1.jpg'},
    { imgSrc: 'images/Img 2.jpg'},
    { imgSrc: 'images/Img 4.jpg'},
    { imgSrc: 'images/Img 6.jpg'},
    { imgSrc: 'images/Img 7.jpg'},
    { imgSrc: 'images/Img 8.jpg'},

  ];
  const updateActiveItem = useCallback((index) => {
    setActiveItem(index);
  }, []);

  const handleLeftArrowClick = useCallback(() => {
    const newIndex = activeItem > 1 ? activeItem - 1 : cards.length;
    updateActiveItem(newIndex);
  }, [activeItem, cards.length, updateActiveItem]);

  const handleRightArrowClick = useCallback(() => {
    const newIndex = activeItem < cards.length ? activeItem + 1 : 1;
    updateActiveItem(newIndex);
  }, [activeItem, cards.length, updateActiveItem]);

  const getCardClassName = useCallback((index) => {
    const position = index - activeItem;
    if (position === 0) return 'card active';
    if (position === 1 || position === -cards.length + 1) return 'card right';
    if (position === -1 || position === cards.length - 1) return 'card left';
    if (position === 2 || position === -cards.length + 2) return 'card far-right';
    if (position === -2 || position === cards.length - 2) return 'card far-left';
    return 'card';
  }, [activeItem, cards.length]);
  const navStyle = {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '250px',
    transition: 'transform 0.7s ease',
    
  };
  
  const arrowButtonStyle = {
    cursor: 'pointer',
    backgroundSize: 'cover',
    border: 'none',
    width: '25px',
    height: '25px', 
    margin: '0 5px',
   
  };
  const buttonStyle = {
    background: `url('images/Dotindictaor.jpg') no-repeat center center`,
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%', 
    width: '10px',
    height: '10px',
    margin: '0 5px',
    transition: 'background-color 0.3s',

  };

  const activeButtonStyle = {
    cursor: 'pointer',
    background: `url(/images/_Dotindictaor.jpg) no-repeat center center`,
    backgroundSize: 'cover',
    border: 'none',
    width: '25px',
    height: '10px',
    margin: '0 5px',
    borderRadius:'5px'
    
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRightArrowClick();
    }, 4000);
  
    return () => clearInterval(intervalId);
  }, [activeItem, handleRightArrowClick]);
  

  return (
    <div className="container">
      <div className="cards">
        {cards.map((card, i) => (
          <Card
            key={i}
            card={card}
            index={i + 1}
            onClick={() => updateActiveItem(i + 1)}
            className={getCardClassName(i + 1)}
          />
        ))}
      </div>
     
      <div className="carousel-nav" style={navStyle}>
        <button
          style={{...arrowButtonStyle, backgroundImage: `url('images/Arrow Left.jpg')`}}
          onClick={handleLeftArrowClick}
        ></button>

        {cards.map((card, index) => (
          <button
            key={index}
            style={activeItem === index + 1 ? activeButtonStyle : buttonStyle}
            onClick={() => updateActiveItem(index + 1)}
          ></button>
        ))}

        <button
          style={{...arrowButtonStyle, backgroundImage: `url('images/Arrow Right.jpg')`}}
          onClick={handleRightArrowClick}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;