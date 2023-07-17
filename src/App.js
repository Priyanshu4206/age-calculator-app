import "./App.css";
import arrowBtn from "./assets/images/icon-arrow.svg";
import React from "react";
function App() {
  const [DOB, setDetails] = React.useState({
    day: "",
    month: "",
    year: "",
  });
  const [result, setResult] = React.useState({
    day: "",
    month: "",
    year: "",
  });
  const [errorClass, setError] = React.useState("");
  function onChange(e) {
    setDetails({
      ...DOB,
      [e.target.name]: e.target.value,
    });
  }
  function updateResult(e) {
    e.preventDefault();
    let currDate = new Date();

    let curr_date = currDate.getDate();
    let curr_month = currDate.getMonth()+1;
    let curr_year = currDate.getFullYear();

    if (DOB.day === "" || DOB.month === "" || DOB.year === "") {
      setError("err");
      return;
    } else if(DOB.year>curr_year || DOB.month>12||DOB.month<=0||DOB.day<0 || DOB.day>30) {
      setError("err");
    }else {
      setError("");

      // Step 1
      let result_Years = curr_year - DOB.year;
      
      // Step 2
      let result_Months = curr_month - DOB.month;
      if(curr_month<=DOB.month)
      {
        result_Months = result_Months+12;
        result_Years = result_Years-1;
      }

      // Step 3
      let result_Days = curr_date - DOB.day;
      let feb = (curr_year%4 === 0)&&(curr_year%100 !==0)&&(curr_year%400 === 0)?29:28;
      let months = [31,feb,31,30,31,30,31,31,30,31,30,31];
      
      if(curr_date<DOB.day){
        result_Days = result_Days +months[curr_month];
        result_Months = result_Months-1;
      }
      setResult({
        day: result_Days,
        month:result_Months,
        year: result_Years,
      })
    }
  }
  return (
    <div className="App">
      <div className="container">
        <form className="input_form" onSubmit={updateResult}>
          <div className="input_box">
            <label
              htmlFor="inp_days"
              style={errorClass ? { color: "brown" } : {}}
            >
              Day
            </label>
            <input
              type="number"
              name="day"
              id="inp_days"
              value={DOB.day}
              onChange={onChange}
              placeholder="DD"
              style={errorClass ? { borderColor: "brown" } : {}}
            />
            <span style={errorClass ? {  display: "block", color: "brown" } : {}}>
              Must be a valid day
            </span>
          </div>
          <div className="input_box">
            <label
              htmlFor="inp_months"
              style={errorClass ? { color: "brown" } : {}}
            >
              Month
            </label>
            <input
              type="number"
              name="month"
              id="inp_months"
              value={DOB.month}
              onChange={onChange}
              placeholder="MM"
              style={errorClass ? { borderColor: "brown" } : {}}
            />
            <span style={errorClass ? { display: "block", color: "brown" } : {}}>
              Must be a valid month
            </span>
          </div>
          <div className="input_box">
            <label
              htmlFor="inp_year"
              style={errorClass ? { color: "brown" } : {}}
            >
              Year
            </label>
            <input
              type="number"
              name="year"
              id="inp_years"
              value={DOB.year}
              onChange={onChange}
              placeholder="YYYY"
              style={errorClass ? { borderColor: "brown" } : {}}
            />
            <span style={errorClass ? { display: "block", color: "brown" } : {}}>
              Must be in the past
            </span>
          </div>
          <button className="submit_btn" onClick={updateResult}>
          <img src={arrowBtn} alt="GO" onClick={updateResult}/>
        </button>
        </form>

        <div className="output_area">
          <p className="DOB">
            <span id="years">{result.year? result.year:"-- "}</span>years
          </p>
          <p className="DOB">
            <span id="months">{result.month? result.month:"-- "}</span>months
          </p>
          <p className="DOB">
            <span id="days">{result.day? result.day:"-- "}</span>days
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
