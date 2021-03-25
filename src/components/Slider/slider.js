import React from "react";
import "./slider.css";

const slider = (props) => {
  const {
    startYearValue,
    endYearValue,
    setstartYearValue,
    setendYearValue,
  } = props;
  const update = (e) => {
    let output1 = document.getElementById("startYear");
    if (output1 != null) {
      output1.innerHTML = e.target.value;
      setstartYearValue(e.target.value);
    }
  };
  const update2 = (e) => {
    let output2 = document.getElementById("endYear");
    if (output2 != null) {
      output2.innerHTML = e.target.value;
      setendYearValue(e.target.value);
    }
  };

  // Update the current slider value (each time you drag the slider handle)

  return (
    <div className="slidecontainer white-text">
      <div>
        <p>Start Year:</p>
        <input
          type="range"
          min="1990"
          max="2021"
          value={startYearValue}
          className="slider"
          id="start"
          onChange={(e) => update(e)}
        />
        <p>
          Year: <span id="startYear">1990</span>
        </p>
      </div>

      <div>
        <p>End Year:</p>
        <input
          type="range"
          min="1990"
          max="2021"
          value={endYearValue}
          className="slider"
          id="end"
          onChange={(e) => update2(e)}
        />
        <p>
          Year: <span id="endYear">2021</span>
        </p>
      </div>
    </div>
  );
};

export default slider;
