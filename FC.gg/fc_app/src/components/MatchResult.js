import React, { useState } from "react";
import "../css/MatchResult.css";
import loadinggif from "../assets/loading.gif";
import ball from "../assets/ball.png";

export default function MatchResult(props) {
  const { nickname, matchdetail, loading } = props;
  const [expandedId, setExpandedId] = useState(null);
  
  const toggleExpand = (tab) => {
    setExpandedId((prevId) => (prevId === tab ? null : tab));
  };

  const gradeValue = (x) =>{
    if(x==1){
      return "normal";
    }else if(x>=2 && x<=4){
      return "bronze";
    }else if (x >= 5 && x <= 7) {
      return "silver";
    } else if (x >= 8 && x <= 10) {
      return "gold";
    }
  }

  return (
    <div className="MatchResultBackground">
      {loading ? (
        <img src={loadinggif} alt="로딩" width="50px" className="MatchResultLoading"/>
      ) : (
        matchdetail !== null ? (
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
                <div className="MatchDate">{data.match_date}</div>
                <div className="ScoreContainer">
                  <div className="Nickname">{nickname}</div>
                  <div>{data.my_score} : {data.other_score}</div>
                  <div className="Nickname">{data.other_nick}</div>
                </div>
                {/* &nbsp; &nbsp; &nbsp; <span>{data.my_status}</span> */}
              </div>
              {expandedId === id && (
                <div className="MatchResuiltDetailContainer">
                  <div className="MyInformation">
                    <div className="ListContainer">
                      {data && data.my_data && data.my_player_data && (
                        (() => {
                          let combinedData = [];
                          for (let i = 0; i < data.my_data.length; i++) {
                            combinedData.push({
                              ...data.my_data[i],
                              ...data.my_player_data[i],
                            });
                          }

                          return combinedData.map((value, index) => (
                            <div key={index} className="CombinedDataContainer">
                              
                                <div className="PlayerDetailContainer">
                                  <div className="PlayerImgContainer">
                                    <span className="PlayerStatus">★ {value.status}</span>
                                    <div className="img-wrapper">
                                      <img
                                        src={value.p_action_image}
                                        alt="img"
                                        width="40px"
                                      />
                                    </div>
                                    <div className="SeasonGradeContainer">
                                      <img
                                        src={value.seasonImg}
                                        alt="season"
                                        height="18px"
                                        className="SeasonImg"
                                      />
                                      <div className={`${gradeValue(value.spGrade)}`} key={index}>
                                        <strong className={`${gradeValue(value.spGrade)}Text`}>{value.spGrade}</strong>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="PlayerStatusGoal">
                                    <div className="BallContainer">
                                      {[...Array(value.goal)].map((_, index) => (
                                        <img
                                          key={index}
                                          src={ball}
                                          alt="ball"
                                          width="15px"
                                          height="15px"
                                          className="Ball"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="PlayerInfoContainer">
                                  <span className="PlayerPosition">[{value.spPosition}]</span>
                                  {value.name}
                                </div>
                              
                            </div>
                          ));
                        })() // 여기서 즉시 실행하지 않음
                      )}
                    </div>
                  </div>
                  <div className="MatchDetailInfoContainer">
                    <div className="MatchDetailInfoInnerContainer">
                      <div className="MatchDetailText">{data.my_total_shoot}</div>
                      <div className="MatchDetailTitle">슛팅</div>
                      <div className="MatchDetailText">{data.other_total_shoot}</div>
                    </div>
                    <div className="MatchDetailInfoInnerContainer">
                      <div className="MatchDetailText">{data.my_effective_shoot}</div>&nbsp;
                      <div className="MatchDetailTitle">유효 슛팅</div>&nbsp;
                      <div className="MatchDetailText">{data.other_effective_shoot}</div>
                    </div>
                    <div className="MatchDetailInfoInnerContainer">
                      <div className="MatchDetailText">{data.my_yellow}</div>&nbsp;
                      <div className="MatchDetailTitle">경고</div>&nbsp;
                      <div className="MatchDetailText">{data.other_yellow}</div>
                    </div>
                    <div className="MatchDetailInfoInnerContainer">
                      <div className="MatchDetailText">{data.my_red}</div>&nbsp;
                      <div className="MatchDetailTitle">퇴장</div>&nbsp;
                      <div className="MatchDetailText">{data.other_red}</div>
                    </div>
                  </div>
                  <div className="OtherInformation">
                    <ul className="ListContainer">
                      {data && data.other_data && data.other_player_data && (
                        (() => {
                          let combinedData = [];
                          for (let i = 0; i < data.other_data.length; i++) {
                            combinedData.push({
                              ...data.other_data[i],
                              ...data.other_player_data[i],
                            });
                          }

                          return combinedData.map((value, index) => (
                            <div key={index} className="CombinedDataContainer">
                              <li style={{listStyleType: "none"}}>
                                <div className="PlayerDetailContainer">
                                  <div className="PlayerImgContainer">
                                    <span className="PlayerStatus">★ {value.status}</span>
                                    <div className="Otherimg-wrapper">
                                      <img
                                        src={value.sp_image}
                                        alt="img"
                                        width="40px"
                                      />
                                    </div>
                                    <div className="SeasonGradeContainer">
                                      <img
                                        src={value.seasonImg}
                                        alt="season"
                                        height="18px"
                                        className="SeasonImg"
                                      />
                                      <div className={`${gradeValue(value.spGrade)}`} key={index}>
                                        <strong className={`${gradeValue(value.spGrade)}Text`}>{value.spGrade}</strong>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="PlayerStatusGoal">
                                    <div className="BallContainer">
                                      {[...Array(value.goal)].map((_, index) => (
                                        <img
                                          key={index}
                                          src={ball}
                                          alt="ball"
                                          width="15px"
                                          height="15px"
                                          className="Ball"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="PlayerInfoContainer">
                                  <span className="PlayerPosition">[{value.spPosition}]</span>
                                  {value.name}
                                </div>
                              </li>
                            </div>
                          ));
                        })() // 여기서 즉시 실행하지 않음
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : null
      )}
    </div>
  );
}
