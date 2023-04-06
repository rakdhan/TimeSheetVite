import React from "react";
import CalendarDay from "./CalendarDay";
// zustand
import { useStore } from "../store/zustand";

const CalendarMonth = ({month}) => {

  // console.log('ini month di ==>', month)

  
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            
            <CalendarDay day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CalendarMonth;
