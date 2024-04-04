import React, { useState, useEffect } from "react";
import "../css/Result.css";
import gradeIcon from "../assets/rank/champions.png";
import searchIcon from "../assets/searchicon.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
        
        <div className="group-wrapper">
          <div className="group-3">
            <div className="text-wrapper-6">현재등급 : 월드클래스</div>
            <div className="text-wrapper-7">최고등급 : 챌린저</div>
          </div>
          <img className="ico" alt="Ico" src={gradeIcon} />
          <div className="group-4">
            <div className="text-wrapper-9">{nickname}</div>
            <div className="text-wrapper-8">레벨 : 2524</div>
          </div>
        </div>

        <div className="group-8">
          <div className="text-wrapper-11">공식경기</div>
          <div className="text-wrapper-12">리그친선</div>
          <div className="text-wrapper-13">감독모드</div>
          <div className="text-wrapper-14">클래식 1vs1</div>
        </div>

        <div className="group">
          <div className="overlap-group">
            <p className="text-wrapper-3">패배 상대 스코어 : 내 스코어</p>
            <div className="text-wrapper-2">경기 날짜</div>
          </div>
        </div>

        <div className="overlap-group-wrapper">
          <div className="overlap">
            <p className="text-wrapper-3">승리 상대 스코어 : 내 스코어</p>
            <div className="text-wrapper-2">경기 날짜</div>
          </div>
        </div>
    
      </div>
    </div>
  );
}
