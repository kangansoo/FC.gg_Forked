import React, { useState, useEffect } from "react";
import "../css/UserInfo.css";
import axios from "axios";
import getRankImg from './getRankImg';

export default function UserInfo(props) {
  const { input, ouid } = props;
  const [userInfo, setUserInfo] = useState([]);
  const [userRank, setUserRank] = useState("");
  const [rankImg, setRankImg] = useState('');

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
        const imgPath = getRankImg(userresponse.data[1]);
        if (imgPath){
          setRankImg(imgPath);
        }
      } catch (error) {
        console.log("UserInfoError:", error);
      }
    };
    getUserInfo();
  }, [ouid]);

  console.log('userRank: ', userRank);
  console.log('rankImg: ',rankImg);

  return (
    <div className="UserInfoConatiner">

      {rankImg ? (<img className="GradeIcon" alt="icon" src={rankImg} />) : (<span>이미지 불러오는 중</span>)}
      <div className="UserInfoContainer">
        <div className="UserNickname">{input}</div>
        <div className="UserLevel">레벨 : {userInfo[0]}</div>
      </div>
      <div className="UserGradeContainer">
        <div className="UserHighestGrade">최고등급 : 챌린저</div>
      </div>
    </div>
  );
}
