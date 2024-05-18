import React, { useEffect, useState } from "react";
import "../css/MatchStats.css";
import DoughnutChart from './DoughnutChart.js';

export default function MatchStats(props) {
  const { loading, matchdetail, nickname } = props;
  const [cntVictory, setCntVictory] = useState(0);
  const [cntDefeat, setCntDefeat] = useState(0);
  const [mvpPlayer, setMvpPlayer] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [spId, setSpId] = useState("");
  const [pId, setPId] = useState("");

  const findMVPPlayer = (matchdetail, nickname) => {
    // 최근 10개의 데이터만 사용
    const recentMatches = Object.values(matchdetail).slice(0, 10);
    // MVP로 선정된 선수들을 모아둘 객체
    const mvpCounts = {};

    // 최근 10개의 각 경기에서 MVP로 선정된 선수들의 횟수를 계산하여 mvpCounts에 저장
    recentMatches.forEach((match) => {
      const mvpPlayer = match.mvp_player;
      if (mvpPlayer && mvpPlayer[1] === nickname) {
        const playerName = mvpPlayer[0];
        mvpCounts[playerName] = (mvpCounts[playerName] || 0) + 1;
      }
    });
    // console.log("mvpCounts", mvpCounts);
    // 가장 많이 MVP로 선정된 선수를 찾음
    let mostFrequentMVP = null;
    let maxCount = 0;
    let mvpPlayerSpId = 0;
    let mvpPlayerPId = 0;

    for (const playerName in mvpCounts) {
      if (mvpCounts[playerName] > maxCount) {
        mostFrequentMVP = playerName;
        maxCount = mvpCounts[playerName];
        const match = recentMatches.find(match => match.mvp_player && match.mvp_player[0] === playerName);
        if (match) {
          mvpPlayerSpId = match.mvp_player[2];
          mvpPlayerPId = match.mvp_player[3];
        }
      }
    }
    return {mostFrequentMVP, mvpPlayerSpId, mvpPlayerPId};
  };

  useEffect(() => {
    if (matchdetail) {
      // 최초 10개의 데이터만 받아오는 경우 승리 횟수 계산
      const initialMatches = Object.entries(matchdetail)
        .slice(0, 10) // 최초 10개의 데이터만 사용
        .map(([id, data]) => data);
      const initialVictories = initialMatches.filter(
        (match) => match.my_status === "승"
      ).length;
      const initialDefeats = initialMatches.filter(
        (match) => match.my_status === "패"
      ).length;

      let myTotalScore = 0;
      initialMatches.forEach((match) => {
        myTotalScore += isNaN(match.my_score) ? 0 : match.my_score;
      });
      let otherTotalScore = 0;
      initialMatches.forEach((match) => {
        otherTotalScore += isNaN(match.other_score) ? 0 : match.other_score;
      });
      setCntVictory(initialVictories);
      setCntDefeat(initialDefeats);
      setMyScore(myTotalScore);
      setOtherScore(otherTotalScore);

      const {mostFrequentMVP, mvpPlayerSpId, mvpPlayerPId } = findMVPPlayer(matchdetail, nickname);
      setMvpPlayer(mostFrequentMVP);
      setSpId(mvpPlayerSpId);
      setPId(mvpPlayerPId);
      // console.log("topPlayer:", mvpPlayer);
    }
  }, [matchdetail]);

  return (
    <>
      {matchdetail && matchdetail.length !== 0 && !loading ? (
        <div className="MatchStatsBackground">
          <div className="UserStatsContainer">
            <span className="StatTitle">최근 10경기 승률</span>
            <span className="VictoryRate">{cntVictory * 10}%</span>
            <DoughnutChart win={cntVictory} loss={cntDefeat} className="DoughnutChart"/>
          </div>
          <div className="UserStatsContainer">
            <span className="StatTitle">최근 10경기 최다 MVP</span>
            <img
              className="StatImg"
              src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`}
              alt="img"
              height="100px"
              onError={(e) => {
                e.target.src = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${pId}.png`;
              }}
            />
            <span clasName="StatPlayerName">{mvpPlayer}</span>
          </div>
          <div className="UserStatsContainer">
            <span className="StatTitle">최근 10경기 득점</span>
            <span className="StatGoals"><strong>{myScore}</strong></span>
          </div>
          <div className="UserStatsContainer">
            <span className="StatTitle">최근 10경기 실점</span>
            <span className="StatGoals"><strong>{otherScore}</strong></span>
          </div>
        </div>
      ) : null}
    </>
  );
}
