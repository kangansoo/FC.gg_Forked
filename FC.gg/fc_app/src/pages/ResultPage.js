import React, { useState, useEffect } from "react";
import "../css/Result.css";
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
  const [matchtype, setMatch] = useState(50);
  const [nickname, setNickname] = useState("");
  const [ouid, setOuid] = useState("");
  
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
      
    }  
    handleGetouid();
  }, [input, matchtype, ouid])
  console.log("ouidtest:", ouid)
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
        <MatchResult ouid={ouid} input={input} />
      </div>
    </div>
  );
}
