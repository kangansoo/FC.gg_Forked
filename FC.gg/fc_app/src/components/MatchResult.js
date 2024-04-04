import React from "react";
import "../css/MatchResult.css";

export default function MatchResult(props) {
  const { matchdetail, input } = props;
  console.log(matchdetail);

  return (
    <div className="MatchResultBackground">
      {matchdetail ? (
        Object.entries(matchdetail).map(([id, data]) => (
          <div className="MatchResultContainer" key={id}>
            <span>{input} {data.my_score} : {data.other_score} {data.other_nick}</span>&nbsp; &nbsp; &nbsp;
            <span>{data.my_status}</span>
          </div>
        ))
      ) : (
        <span>데이터 불러오는 중</span>
      )}
    </div>
  );
}
