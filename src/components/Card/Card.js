import React, { useState } from "react";
import "./Card.css";

const Card = (props) => {
  const { item, numberOfCardsSelected, setnumberOfCardsSelected } = props;
  const [isChecked, setisChecked] = useState("false");

  const action = (e) => {
    //miramos si ha sido pulsado o no
    if (isChecked === "false") {
      e.currentTarget.classList.add("actived");
      setnumberOfCardsSelected(numberOfCardsSelected + 1);
      setisChecked("true");
    } else {
      e.currentTarget.classList.remove("actived");
      setnumberOfCardsSelected(numberOfCardsSelected - 1);
      setisChecked("false");
    }
  };

  return (
    <div className="card horizontal avatar">
      <div className="card-stacked">
        <div
          className="card-content white-text"
          value={item.author}
          ischecked={isChecked}
          link={item.link}
          onClick={(e) => action(e)}
        >
          <div className="name">{item.author}</div>

          <div className="identifier">
            <div>
              <i className="small material-icons">domain</i>
            </div>
            <div className="university">{item.identified}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
