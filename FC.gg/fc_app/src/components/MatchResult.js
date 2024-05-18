import React, { useState, useEffect } from "react";
import "../css/MatchResult.css";
import "../css/PlayerPosition.css";
import loadinggif from "../assets/loading.gif";
import ball from "../assets/ball.png";
import keyboard from "../assets/keyboard.png";
import consoleImg from "../assets/console.png";
import { position } from "../components/Position.js";
import Swal from "sweetalert2";

export default function MatchResult(props) {
  const { nickname, matchdetail, loading, increaseOffset, moreLoading } = props;
  const [expandedTabs, setExpandedTabs] = useState({});

  const toggleExpand = (tab) => {
    setExpandedTabs((prevTabs) => ({
      ...prevTabs,
      [tab]: !prevTabs[tab],
    }));
  };

  const nullDataAlert = () => {
    Swal.fire({
      title: "데이터 오류",
      icon: 'error',
      text: '오류로 인해 해당 경기 결과를 불러올 수 없습니다.',
      background: '#d9d9d9'
    })
  }

  useEffect(() => {
    setExpandedTabs({});
  }, [loading]);

  const gradeValue = (x) => {
    if (x === 1) {
      return "normal";
    } else if (x >= 2 && x <= 4) {
      return "bronze";
    } else if (x >= 5 && x <= 7) {
      return "silver";
    } else if (x >= 8 && x <= 10) {
      return "gold";
    }
  };

  console.log("매치 디테일:", matchdetail);
  return (
    <div className="MatchResultBackground">
      <div className="RealOuterContainer">
      {loading ? (
        <img
          src={loadinggif}
          alt="로딩"
          width="50px"
          className="MatchResultLoading"
          style={{marginTop:"60px"}}
        />
      ) : matchdetail && matchdetail.length !== 0 ? (
        Object.entries(matchdetail)
          .sort(
            ([, a], [, b]) => new Date(b.match_date) - new Date(a.match_date)
          )
          .map(([id, data]) => {
            if(data.my_data && data.my_data.length===0 || data.other_data && data.other_data.length===0){
              return (
                <div className="MatchResultOuterContainer" key={id}>
                  <div 
                    className="MatchResultContainer"
                    style={{
                      backgroundColor:
                        data.my_status === "승"
                          ? "rgba(94, 139, 226, 0.8)"
                          : data.my_status === "무"
                          ? "rgba(255, 255, 255, 0.8)" // 무승부인 경우에 해당하는 색상
                          : "rgba(255, 132, 132, 0.8)",
                          height: expandedTabs[id] ? "200px" : "100px"
                    }}
                    onClick={()=>nullDataAlert()}
                  >
                    {/* <strong>오류로 인하여 경기 결과를 불러올 수 없습니다.</strong> */}
                    <div className="MatchDate">
                      <strong>{data.match_date}</strong>
                    </div>
                    <div className="ScoreContainer">
                      {data && data.my_controller === "gamepad" ? (
                        <img src={consoleImg} className="Controller" alt="console" />
                      ) : (
                        <img src={keyboard} className="Controller" alt="keyboard" />
                      )}
                      <div className="Nickname">
                        <strong>{nickname}</strong>
                      </div>
                      <div className="Score">
                        <div>
                          <strong>{data.my_score}</strong>
                        </div>
                        <div>
                          <strong> : </strong>
                        </div>
                        <div>
                          <strong>{data.other_score}</strong>
                        </div>
                      </div>
                      <div className="Nickname">
                        <strong>{data.other_nick}</strong>
                      </div>
                      {data && data.other_controller === "gamepad" ? (
                        <img src={consoleImg} className="Controller" alt="console" />
                      ) : (
                        <img src={keyboard} className="Controller" alt="keyboard" />
                      )}
                    </div>
                  </div>
                </div>
              );
            }else{
              return (
                <div className="MatchResultOuterContainer" key={id}>
                  <div
                    className="MatchResultContainer"
                    style={{
                      backgroundColor:
                        data.my_status === "승"
                          ? "rgba(94, 139, 226, 0.8)"
                          : data.my_status === "무"
                          ? "rgba(255, 255, 255, 0.8)" // 무승부인 경우에 해당하는 색상
                          : "rgba(255, 132, 132, 0.8)",
                          height: expandedTabs[id] ? "200px" : "100px"
                    }}
                    onClick={() => toggleExpand(id)}
                  >
                    <div className="MatchDate">
                      <strong>{data.match_date}</strong>
                    </div>
                    <div className="ScoreContainer">
                      {data && data.my_controller === "gamepad" ? (
                        <img src={consoleImg} className="Controller" alt="console" />
                      ) : (
                        <img src={keyboard} className="Controller" alt="keyboard" />
                      )}
                      <div className="Nickname">
                        <strong>{nickname}</strong>
                      </div>
                      <div className="Score">
                        <div>
                          <strong>{data.my_score}</strong>
                        </div>
                        <div>
                          <strong> : </strong>
                        </div>
                        <div>
                          <strong>{data.other_score}</strong>
                        </div>
                      </div>
                      <div className="Nickname">
                        <strong>{data.other_nick}</strong>
                      </div>
                      {data && data.other_controller === "gamepad" ? (
                        <img src={consoleImg} className="Controller" alt="console" />
                      ) : (
                        <img src={keyboard} className="Controller" alt="keyboard" />
                      )}
                    </div>
                    {
                      expandedTabs[id] ? (
                        <div className="GoalPlayersContainer">
                          <div className='MyGoalPlayers'>
                            {data.my_goaltime&&data.my_goaltime
                              .sort((a, b) => a.goalTime - b.goalTime)
                              .map((value, index) => (
                              <span key={index}>{value.goalTime}' {value.name}</span>
                            ))}
                          </div>
                          <div className='OtherGoalPlayers'>
                            {data.other_goaltime&&data.other_goaltime
                              .sort((a, b) => a.goalTime - b.goalTime)
                              .map((value, index) => (
                              <span key={index}>{value.name} {value.goalTime}'</span>
                            ))}
                          </div>
                        </div>
                      ) : null
                    }
                  </div>
                  {expandedTabs[id] && (
                    <div className="MatchResuiltDetailContainer">
                      <div className="MyInformation">
                        <div className="ListContainer">
                          {data &&
                            data.my_data &&
                            data.my_player_data &&
                            (() => {
                              let combinedData = [];
                              for (let i = 0; i < 11; i++) {
                                combinedData.push({
                                  ...data.my_data[i],
                                  ...data.my_player_data[i],
                                });
                              }
                              // combinedData.sort((a, b) => b.status - a.status);
                              // // 첫 번째 선수만 강조
                              // const myTopPlayer = combinedData[0];
                              // console.log("myTopPlayer", myTopPlayer.status);
                              // console.log("combinedData :", combinedData);
                              return combinedData.map((value, index) => (
                                <div
                                  key={index}
                                  className={`CombinedDataContainer${
                                    position[value.position]
                                  }`}
                                >
                                  <div className="PlayerDetailContainer">
                                    <div className="PlayerImgContainer">
                                      <div className="PlayerStatusBallContainer">
                                        {
                                          data.mvp_player[0] === value.name &&
                                          data.mvp_player[1] === data.my_nick ? (
                                            <span className="PlayerStatusMVP">
                                              {value.status} <span className="StatusStar">★</span>
                                            </span>
                                          ) : (
                                            <span className="PlayerStatus">
                                              {value.status}
                                            </span>
                                          )
                                        }
                                        <div className="BallContainer">
                                            {[...Array(value.goal)].map((_, index) => (
                                              <div className="BallWrapper">
                                                <img
                                                  key={index}
                                                  src={ball}
                                                  alt="ball"
                                                  width="15px"
                                                  height="15px"
                                                  className="Ball"
                                                />
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                      <div className="img-wrapper">
                                        <img
                                          src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${value.spId}.png`}
                                          alt="img"
                                          onError={(e) => {
                                            e.target.src = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${value.spid}.png`;
                                          }}
                                        />
                                      </div>
                                      <div className="SeasonGradeContainer">
                                        <span className="PlayerPosition">
                                          {value.spPosition}
                                        </span>
                                        <div
                                          className={`${gradeValue(value.spGrade)}`}
                                          key={index}
                                        >
                                          <strong
                                            className={`${gradeValue(
                                              value.spGrade
                                            )}Text`}
                                          >
                                            {value.spGrade}
                                          </strong>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="PlayerInfoContainer">
                                    <img
                                      src={value.seasonImg}
                                      alt="season"
                                      height="15px"
                                      className="SeasonImg"
                                    />
                                    <span className="PlayerName">{value.name}</span>
                                  </div>
                                </div>
                              ));
                            })() // 여기서 즉시 실행하지 않음
                          }
                        </div>
                      </div>
                      <div className="MatchDetailInfoContainer">
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">
                            {data.my_total_shoot}
                          </div>
                          <div className="MatchDetailTitle">슛팅</div>
                          <div className="MatchDetailText">
                            {data.other_total_shoot}
                          </div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">
                            {data.my_effective_shoot}
                          </div>
                          <div className="MatchDetailTitle">유효 슛팅</div>
                          <div className="MatchDetailText">
                            {data.other_effective_shoot}
                          </div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">
                            {data.my_possession}%
                          </div>
                          <div className="MatchDetailTitle">점유율</div>
                          <div className="MatchDetailText">
                            {data.other_possession}%
                          </div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">{data.my_passtry}</div>
                          <div className="MatchDetailTitle">패스 횟수</div>
                          <div className="MatchDetailText">
                            {data.other_passtry}
                          </div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">
                            {((data.my_passsuc / data.my_passtry) * 100).toFixed()}%
                          </div>
                          <div className="MatchDetailTitle">패스 성공률</div>
                          <div className="MatchDetailText">
                            {(
                              (data.other_passsuc / data.other_passtry) *
                              100
                            ).toFixed()}
                            %
                          </div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">{data.my_foul}</div>
                          <div className="MatchDetailTitle">파울</div>
                          <div className="MatchDetailText">{data.other_foul}</div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">{data.my_yellow}</div>
                          <div className="MatchDetailTitle">경고</div>
                          <div className="MatchDetailText">{data.other_yellow}</div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">{data.my_red}</div>
                          <div className="MatchDetailTitle">퇴장</div>
                          <div className="MatchDetailText">{data.other_red}</div>
                        </div>
                        <div className="MatchDetailInfoInnerContainer">
                          <div className="MatchDetailText">{data.my_offside}</div>
                          <div className="MatchDetailTitle">오프사이드</div>
                          <div className="MatchDetailText">
                            {data.other_offside}
                          </div>
                        </div>
                      </div>
                      <div className="OtherInformation">
                        <div className="ListContainer">
                          {data &&
                            data.other_data &&
                            data.other_player_data &&
                            (() => {
                              let combinedData = [];
                              for (let i = 0; i < 11; i++) {
                                combinedData.push({
                                  ...data.other_data[i],
                                  ...data.other_player_data[i],
                                });
                              }
                              // combinedData.sort((a, b) => b.status - a.status);
                              // const otherTopPlayer = combinedData[0];
                              return combinedData.map((value, index) => (
                                <div
                                  key={index}
                                  className={`CombinedDataContainer${
                                    position[value.position]
                                  }`}
                                >
                                  <div className="PlayerDetailContainer">
                                    <div className="PlayerImgContainer">
                                      <div className="PlayerStatusBallContainer">
                                        {
                                          data.mvp_player[0] === value.name &&
                                          data.mvp_player[1] === data.other_nick ? (
                                            <span className="PlayerStatusMVP">
                                              {value.status} <span className="StatusStar">★</span>
                                            </span>
                                          ) : (
                                            <span className="PlayerStatus">
                                              {value.status}
                                            </span>
                                          )
                                        }
                                        <div className="BallContainer">
                                          {[...Array(value.goal)].map((_, index) => (
                                            <div className="BallWrapper">
                                              <img
                                                key={index}
                                                src={ball}
                                                alt="ball"
                                                width="15px"
                                                height="15px"
                                                className="Ball"
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="img-wrapper">
                                        <img
                                          src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${value.spId}.png`}
                                          alt="img"
                                          height="60px"
                                          onError={(e) => {
                                            e.target.src = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${value.spid}.png`;
                                          }}
                                        />
                                      </div>
                                      <div className="SeasonGradeContainer">
                                        <span className="PlayerPosition">
                                          {value.spPosition}
                                        </span>
                                        <div
                                          className={`${gradeValue(value.spGrade)}`}
                                          key={index}
                                        >
                                          <strong
                                            className={`${gradeValue(
                                              value.spGrade
                                            )}Text`}
                                          >
                                            {value.spGrade}
                                          </strong>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="PlayerInfoContainer">
                                    <img
                                      src={value.seasonImg}
                                      alt="season"
                                      height="15px"
                                      className="SeasonImg"
                                    />
                                    <span className="PlayerName">{value.name}</span>
                                  </div>
                                </div>
                              ));
                            })() // 여기서 즉시 실행하지 않음
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            
          })
      ) : (<div className="NoneMatchResult">경기 결과가 존재하지 않습니다.</div>)}
      </div>
      {!loading &&
        matchdetail &&
        matchdetail.length !== 0 &&
        (!moreLoading ? (
          <div className="SeeMore" onClick={increaseOffset}>
            <strong>더 보기</strong>
          </div>
        ) : (
          <div className="SeeMore">
            <img src={loadinggif} alt="moreloading" width="50px" />
          </div>
        ))}
    </div>
  );
}
