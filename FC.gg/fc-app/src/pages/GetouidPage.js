import React, { useState } from 'react';
import axios from 'axios';

function GetouidPage() {
  const [nickname, setNickname] = useState('');
  const [ouid, setOuid] = useState('');
  const [matchtype, setMatch] = useState('');
  const [matchid, setMatchid] = useState('');

  const handleGetouid = async () => {
    try {
      const response = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getouid', {
        params: {  
          nickname: nickname,
        }
      });
      console.log(response);
      // Extracting ouid from the response
      
      setOuid(response.data);
      console.log("데이터", ouid);
      // Fetching match data using ouid

      
    } catch (error) {
      console.error('Error:', error);
    }
  
    try {
      const response1 = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getmatchid', {
        params: {
          ouid: ouid,
          matchtype: matchtype,
          offset: 0,
          limit: 30
        }
      });
      setMatch(matchtype);
      setMatchid(response1.data);
      console.log(response1);
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ paddingLeft: '20px' }}>
      <h1>유저 전적 조회</h1>
      <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input type="text" placeholder="매치 종류" value={matchtype} onChange={(e) => setMatch(e.target.value)} />
      <button onClick={() => {
          handleGetouid();
      }}>검색</button>
      {ouid && <p>OUID: {ouid}</p>}
      <div>
        {matchid.map((item, index) => (
          <p key={index}>{item}</p>
          ))}
      </div>
      {/* {matchid && <p>MATCHID: {matchid}</p>} */}
    </div>
  );
}

export default GetouidPage;
