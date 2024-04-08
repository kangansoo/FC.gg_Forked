import React, { useState } from "react";
import "../css/MatchResult.css";
import loading from "../assets/loading.gif";
import ball from "../assets/ball.png";

export default function MatchResult(props) {
  const { matchdetail, input } = props;
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  // console.log("디리리디리리 : ", Object.entries(matchdetail)[0][1]['my_data'][0]['name']);
  console.log("matchdetail:", matchdetail);

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
                    : data.my_status === "무"
                    ? "rgba(212, 212, 212, 0.8)" // 무승부인 경우에 해당하는 색상
                    : "rgba(255, 132, 132, 0.8)"
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
                    {data && data.my_data && data.my_player_data ? (
                      (() => {
                        let combinedData = [];
                        for (let i = 0; i < data.my_data.length; i++) {
                          combinedData.push({
                            ...data.my_data[i],
                            ...data.my_player_data[i],
                          });
                        }
                        console.log("combinedData:", combinedData);

                        return combinedData.map((value, index) => (
                          <div key={index} className="CombinedDataContainer">
                            <li>
                              <img
                                src={value.seasonImg}
                                alt="season"
                                height="18px"
                                className="SeasonImg"
                              />
                              {value.name}
                              <span>({value.status})</span>
                              {[...Array(value.goal)].map((_, index) => (
                                <img
                                  key={index}
                                  src={ball}
                                  alt="ball"
                                  width="20px"
                                  className="Ball"
                                />
                              ))}
                            </li>
                            <img
                              src={value.p_image}
                              alt="img"
                              width="50px"
                            />
                          </div>
                        ));
                      })() // 여기서 즉시 실행하지 않음
                    ) : (
                      <span>로딩중</span>
                    )}
                  </ul>
                </div>
                <div className="OtherInformation">
                  <ul>
                    {data && data.other_data && data.other_player_data ? (
                      (() => {
                        let combinedData = [];
                        for (let i = 0; i < data.other_data.length; i++) {
                          combinedData.push({
                            ...data.other_data[i],
                            ...data.other_player_data[i],
                          });
                        }
                        console.log("combinedData:", combinedData);

                        return combinedData.map((value, index) => (
                          <div key={index} className="CombinedDataContainer">
                            <li>
                              <img
                                src={value.seasonImg}
                                alt="season"
                                height="18px"
                                className="SeasonImg"
                              />
                              {value.name}
                              <span>({value.status})</span>
                              {[...Array(value.goal)].map((_, index) => (
                                <img
                                  key={index}
                                  src={ball}
                                  alt="ball"
                                  width="20px"
                                  className="Ball"
                                />
                              ))}
                            </li>
                            <img
                              src={value.p_image}
                              alt="img"
                              width="50px"
                            />
                          </div>
                        ));
                      })() // 여기서 즉시 실행하지 않음
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
        <img src={loading} alt="로딩" width="50px" />
      )}
    </div>
  );
}
