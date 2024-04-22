import React, { useState, useEffect } from "react";
import "../css/UserInfo.css";
import axios from "axios";
// import getRankImg from './getRankImg';

export default function UserInfo(props) {
  const { nickname, ouid, matchdetail } = props;
  const [userInfo, setUserInfo] = useState([]);
  const [userRank, setUserRank] = useState("");
  const [rankImg, setRankImg] = useState('');
  const [matches, setMatches] = useState([]);
  const [cntVictory, setCntVictory] = useState(0);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  console.log("ouid :", ouid);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userresponse = await axios.get(
          "https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/GetUserInfo",
          {
            params: {
              ouid: ouid,
            },
          }
        );
        setUserInfo(userresponse.data);
        setUserRank(userresponse.data[1]);
        console.log("userinfo:", userresponse.data);
        console.log("userInfo[1]:", userInfo[1]);
        const imgPath = userresponse.data[2];
        
        setRankImg(imgPath);
        
      } catch (error) {
        console.log("UserInfoError:", error);
      }
    };
    getUserInfo();
  }, [ouid]);

  console.log('userRank: ', userRank);
  console.log('rankImg: ', userInfo[2]);

  useEffect(() => {
    if (matchdetail) {
      // 최초 10개의 데이터만 받아오는 경우 승리 횟수 계산
      const initialMatches = Object.entries(matchdetail)
        .slice(0, 10) // 최초 10개의 데이터만 사용
        .map(([id, data]) => data);
      const initialVictories = initialMatches.filter(match => match.my_status === "승").length;
      setCntVictory(initialVictories);
      setMatches(initialMatches);
    }
  }, [matchdetail]);

  return (
    <div className="UserInfoBackground">

      {/* {rankImg ? (<img className="GradeIcon" alt="icon" src={userInfo[2]} />) : (<span>이미지 불러오는 중</span>)} */}
      <img className="GradeIcon" alt="icon" src={userInfo[2]} />
      <div className="UserInfoContainer">
        <div className="UserNickname">{nickname}</div>
        <div className="UserLevel">레벨 : {userInfo[0]}</div>
      </div>
      <div className="UserRateContainer">
        <p>최근 10경기 승률</p>
        <p>{cntVictory/10}%</p>
      </div>
      <div className="UserGradeContainer">
        <div className="UserHighestGrade">최고등급 : {userInfo[1]}</div>
      </div>
    </div>
  );
}
