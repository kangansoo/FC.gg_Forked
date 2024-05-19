import React, { useState, useEffect } from "react";
import "../css/UserInfo.css";
import axios from "axios";

export default function UserInfo(props) {
  const { nickname, ouid } = props;
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ouid) {
        const getUserInfo = async () => {
            try {
                const userresponse = await axios.get(
                    "https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/GetUserInfo",
                    {
                        params: { ouid: ouid },
                    }
                );

                const data = userresponse.data;
                setUserInfo({
                    level: data[0],
                    highestRank: data[1],
                    rankImg: data[2],
                });
            } catch (error) {
                console.log("UserInfoError: " + error.message);
            } finally {
              setLoading(false);
            }
        };

      getUserInfo();
    }
  }, [ouid]);

  return (
    <div className="UserInfoBackground">
      <img className="GradeIcon" alt="icon" src={userInfo.rankImg} style={{ visibility: loading ? "hidden" : "visible" }}/>
      <div className="UserInfoContainer">
        <div className="UserNickname">{nickname}</div>
        <div className="UserLevel">레벨 : {userInfo.level}</div>
      </div>
      <div className="UserGradeContainer">
        <div className="UserHighestGrade">최고등급 : {userInfo.highestRank}</div>
      </div>
    </div>
  );
}
