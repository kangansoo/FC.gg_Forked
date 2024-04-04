import * as React from "react";
import '../css/Winrate.css';

function MyComponent() {
    return (
      <>
        <div className="div-1">
          <div className="div-2">
            <div className="div-3">
              10경기{" "}
              <span className="bold-text">평균 승률</span>
            </div>
            <div className="div-4">54%</div>
          </div>
          <div className="div-5">
            <div className="div-6">
              10경기 <span className="bold-text">최다 </span>
              <span className="orange-text">득점자</span>
            </div>
            <div className="div-7">강안수</div>
          </div>
          <div className="div-8">
            <div className="div-9">
              10경기 <span className="bold-text">최다 </span>
              <span className="yellow-text">MVP</span>
            </div>
            <div className="div-10">황성주</div>
          </div>
        </div>
      </>
    );
  }
  
  export default MyComponent;