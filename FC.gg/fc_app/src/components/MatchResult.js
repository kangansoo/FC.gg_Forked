import React, { useState } from "react";
import "../css/MatchResult.css";
import loading from '../assets/loading.gif'

export default function MatchResult(props) {
  const { matchdetail, input } = props;
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  // console.log("디리리디리리 : ", Object.entries(matchdetail)[0][1]['my_data'][0]['name']);
  console.log('matchdetail:', matchdetail);
  return (
    <div className="MatchResultBackground">
      {matchdetail ? (
        Object.entries(matchdetail).map(([id, data]) => (
          <div className="MatchResultOuterContainer" key={id}>
            <div
              className="MatchResultContainer"
              style={{
                backgroundColor:
                  data.my_status === "승"
                    ? "rgba(94, 139, 226, 0.8)"
                    : "rgba(255, 132, 132, 0.8)",
              }}
              onClick={() => toggleExpand(id)}
            >
              <span>
                {input} {data.my_score} : {data.other_score} {data.other_nick}
              </span>
              &nbsp; &nbsp; &nbsp;
              <span>{data.my_status}</span>
            </div>
            {expandedId === id && (
              <div className="MatchResuiltDetailContainer">
                <div className="MyInformation">
                  <ul>
                    {data && data.my_data ? (
                      data.my_data.map((value, index) => (
                        <div key={index}>
                          <li>{value.name}</li>
                          <img src={value.p_action_image} alt="img" style={{width:'50px'}}/>
                        </div>
                      ))
                    ) : (
                      <span>로딩중</span>
                    )}
                  </ul>
                </div>
                <div className="OtherInformation">
                  <ul>
                    {data && data.other_data ? (
                      data.other_data.map((value, index) => (
                        <div key={index}>
                          <li>{value.name}</li>
                          <img src={value.p_action_image} alt="img" style={{width:'50px'}}/>
                        </div>
                      ))
                    ) : (
                      <span>로딩중</span>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <img src={loading} alt="로딩" width="50px"/>
      )}
    </div>
  );
}
