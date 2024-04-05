import React, { useState, useEffect } from "react";
import "../css/Result.css";
import gradeIcon from "../assets/rank/900.png";
import searchIcon from "../assets/searchicon.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MatchResult from "../components/MatchResult";
import UserInfo from '../components/UserInfo';

export default function Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [nickname, setNickname] = useState("");
  const [ouid, setOuid] = useState("");
  const [matchtype, setMatch] = useState(50);
  const [matchdetail, setMatchdetail] = useState("");
  
  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  const buttonClick = () => {
    if (!searchText) {
      alert("검색어를 입력해주세요!");
    } else {
      navigate(`./?input=${searchText}`);
      setSearchText("");
    }
  };
  const keyPress = (e) => {
    if (e.key === "Enter"&&e.nativeEvent.isComposing === false) {
      buttonClick();
    }
  };
  const input = new URLSearchParams(location.search).get("input");

  useEffect(()=>{
    setNickname(input); 
  },[input]);

  useEffect(()=>{
    const handleGetouid = async () => {
      try {
        const response = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getouid', {
          params: {  
            nickname: input,
          }
        });
        console.log(response);
        // Extracting ouid from the response
        
        setOuid(response.data);
        console.log("데이터", response.data);
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
            limit: 10
          }
        });
        setMatch(matchtype);
  
        console.log(response1);
  
        const matchData = {};
        console.log('matchid', response1.data);
  
        await Promise.all(response1.data.map(async (id) => {
          console.log('id', id);
          const response2 = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getmatchdetail', {
            params: {
              matchid: String(id),
              // nickname: sessionStorage.getItem('nickname') 세션 스토리지에 닉네임 넣는 코드가 없어서 그냥 setNickname 있길레 nickname으로 대체했슴다
              nickname: nickname
            }
          });
          // 응답 데이터를 처리하거나 상태에 저장
  
          console.log(response2.data);
          matchData[id] = response2.data;
          
  
        }));
      console.log(matchData);
      setMatchdetail(matchData);
      console.log(matchdetail);
      } catch (error) {
        console.error('Error:', error);
      }
    }  
    handleGetouid();
  }, [input, matchtype, ouid])
  
  return (
    <div className="screen">
      <div className="div">
        <div className="SearchContainer1">
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={searchText}
            onChange={onChange}
            className="SearchNickname1"
            onKeyDown={keyPress}
          />
          <img src={searchIcon} alt="searchIcon" className="SearchIcon1" onClick={buttonClick}/>
        </div>
        
        <UserInfo input={input} ouid={ouid}/>

        <div className="MatchTypeConatiner">
          <div className="MatchTypeText">공식경기</div>
          <div className="MatchTypeText">리그친선</div>
          <div className="MatchTypeText">감독모드</div>
          <div className="MatchTypeText">클래식 1vs1</div>
        </div>
        
        <MatchResult matchdetail={matchdetail} input={input}/>

    
      </div>
    </div>
  );
}
