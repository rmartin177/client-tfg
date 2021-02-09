import React from "react";
import "./slider.css";

const slider = (props) => {
  const {
    startYearValue,
    endYearValue,
    setstartYearValue,
    setendYearValue,
  } = props;
  const update = () => {
    let slider1 = document.getElementById("start");
    let output1 = document.getElementById("startYear");
    if (output1 != null) {
      output1.innerHTML = slider1.value;
      slider1.oninput = function () {
        output1.innerHTML = this.value;
        setstartYearValue(this.value);
      };
    }
  };
  const update2 = () => {
    let slider2 = document.getElementById("end");
    let output2 = document.getElementById("endYear");

    if (output2 != null) {
      output2.innerHTML = slider2.value;
      slider2.oninput = function () {
        output2.innerHTML = this.value;
        setendYearValue(this.value);
      };
    }
  };

  // Update the current slider value (each time you drag the slider handle)

  return (
    <div class="slidecontainer white-text">
      <div>
        <p>Start Year:</p>
        <input
          type="range"
          min="1990"
          max="2021"
          value={startYearValue}
          class="slider"
          id="start"
          onChange={() => update()}
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
          class="slider"
          id="end"
          onChange={() => update2()}
        />
        <p>
          Year: <span id="endYear">2021</span>
        </p>
      </div>
    </div>
  );
};

export default slider;
