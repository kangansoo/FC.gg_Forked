import React, { useEffect, useState } from 'react'
import '../css/MatchStats.css';


export default function MatchStats(props) {
    const { loading, matchdetail, nickname } = props;
    const [matches, setMatches] = useState([]);
    const [cntVictory, setCntVictory] = useState(0);
    const [cntDefeat, setCntDefeat] = useState(0);
    const [mvpPlayer, setMvpPlayer] = useState("");
    const [myScore, setMyScore] = useState(0);
    const [otherScore, setOtherScore] = useState(0);

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
        console.log('mvpCounts', mvpCounts)
        // 가장 많이 MVP로 선정된 선수를 찾음
        let mostFrequentMVP = null;
        let maxCount = 0;
        for (const playerName in mvpCounts) {
            if (mvpCounts[playerName] > maxCount) {
                mostFrequentMVP = playerName;
                maxCount = mvpCounts[playerName];
            }
        }
        return mostFrequentMVP;
    };

    useEffect(() => {
        if (matchdetail) {
          // 최초 10개의 데이터만 받아오는 경우 승리 횟수 계산
          const initialMatches = Object.entries(matchdetail)
            .slice(0, 10) // 최초 10개의 데이터만 사용
            .map(([id, data]) => data);
          const initialVictories = initialMatches.filter(match => match.my_status === "승").length;
          const initialDefeats = initialMatches.filter(match => match.my_status === "패").length;

          let myTotalScore = 0;
            initialMatches.forEach(match => {
                myTotalScore += match.my_score;
            });
          let otherTotalScore = 0;
            initialMatches.forEach(match => {
                otherTotalScore += match.other_score;
            });
          setCntVictory(initialVictories);
          setCntDefeat(initialDefeats);
          setMatches(initialMatches);
          setMyScore(myTotalScore);
          setOtherScore(otherTotalScore);

          const topPlayer = findMVPPlayer(matchdetail, nickname);
          setMvpPlayer(topPlayer);
        }
    }, [matchdetail]);


    return (
      <>
        {matchdetail&&
        matchdetail!==null&&
        !loading ? (
          <div className="MatchStatsBackground">
            <div className="UserRateContainer">
                <p>최근 10경기 승률</p>
                <p>{cntVictory*10}%</p>
            </div>
            <div className="UserRateContainer">
                <p>최근 10경기 최다 MVP</p>
                <p>{mvpPlayer}</p>
            </div>
            <div className="UserRateContainer">
                <p>최근 10경기 득점</p>
                <p>{myScore}</p>
            </div>
            <div className="UserRateContainer">
                <p>최근 10경기 실점</p>
                <p>{otherScore}</p>
            </div>
          </div>
        ) : null}
      </>
    );
  }
  