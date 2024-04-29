import React, { useState, useEffect } from "react";
import "../css/Result.css";
import searchIcon from "../assets/searchicon.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MatchResult from "../components/MatchResult";
import UserInfo from '../components/UserInfo';
import MatchStats from '../components/MatchStats';

export default function Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [matchtype, setMatch] = useState(50);
  const [nickname, setNickname] = useState("");
  const [ouid, setOuid] = useState("");
  const [matchdetail, setMatchdetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("publicGame");
  const [error, setError] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  
  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  const buttonClick = async() => {
    if (!searchText) {
      alert("검색어를 입력해주세요!");
    } else {
      setOffset(0);
      setMatchdetail([]);
      setLoading(true)
      navigate(`./?input=${searchText}`);
      setNickname(searchText)
      setSearchText("");
      setMoreLoading(false);
      setSelected("publicGame");
      setMatch(50);
    }
  };
  const keyPress = (e) => {
    if (e.key === "Enter"&&e.nativeEvent.isComposing === false) {
      buttonClick();
    }
  };
  const input = new URLSearchParams(location.search).get("input");

  const publicGame = () =>{
    if (selected !== "publicGame") {
      setLoading(true);
      setMatch(50);
      setOffset(0);
      setMatchdetail([]);
    }
  }
  const leagueGame = () =>{
    if (selected !=="leagueGame"){
      setLoading(true)
      setMatch(30);
      setOffset(0);
      setMatchdetail([]);
    }
  }
  const directorMode = () =>{
    if (selected !== "directorMode") {
      setLoading(true)
      setMatch(52);
      setOffset(0);
      setMatchdetail([]);
    }
  }
  const classicMode = () => {
    if (selected !== "classicMode"){
      setLoading(true)
      setMatch(40);
      setOffset(0);
      setMatchdetail([]);
    }
  }

  useEffect(()=>{
    setNickname(input); 
  },[input]);

  useEffect(()=>{
    const handleGetouid = async () => {
      try {
        const response = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getouid', {
          params: {  
            nickname: nickname,
          }
        });
        console.log(response);
        // Extracting ouid from the response
        setError(false);
        setOuid(response.data);
        console.log("데이터", response.data);
        // Fetching match data using ouid
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      }
    }  
    handleGetouid();
  }, [input, nickname, ouid])
  console.log("ErrorCheck:", error)

  useEffect(()=>{
    const getMatchdetail = async() => {
      try {
        const response1 = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getmatchid', {
          params: {
            ouid: ouid,
            matchtype: matchtype,
            offset: offset,
            limit: 10
          }
        });
        setMatch(matchtype);
  
        const matchData = {};
        console.log('matchid', response1.data);
        const newMatchData = await Promise.all(response1.data.map(async (id) => {
          const response2 = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getmatchdetail', {
            params: {
              matchid: String(id),
              nickname: nickname
            }
          });
          return response2.data;
        }));
  
        // 새로운 데이터와 기존 데이터를 합쳐서 업데이트
        if (offset === 0) {
          setMatchdetail(newMatchData);
        } else {
          // "더 보기" 버튼인 경우: 새로운 데이터만 추가
          setMatchdetail(prevMatchDetail => [...prevMatchDetail, ...newMatchData]);
        }
        console.log("matchdetail :", matchdetail)
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
        setMoreLoading(false);
      }
    }
    getMatchdetail();
  }, [ouid, matchtype, nickname, offset]);

  const increaseOffset = ()=>{
    setOffset(offset+10)
    setMoreLoading(true)
  }
  
  //       await Promise.all(response1.data.map(async (id) => {
  //         console.log('id', id);
  //         const response2 = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getmatchdetail', {
  //           params: {
  //             matchid: String(id),
  //             // nickname: sessionStorage.getItem('nickname') 세션 스토리지에 닉네임 넣는 코드가 없어서 그냥 setNickname 있길레 nickname으로 대체했슴다
  //             nickname: nickname
  //           }
  //         });
  //         // 응답 데이터를 처리하거나 상태에 저장

  //         console.log("response2.data: ", response2.data);
  //         matchData[id] = response2.data;
  //       }));
  //     console.log(matchData);
  //     setMatchdetail(matchData);
  //     console.log("matchdetail:",matchdetail);
  //     setLoading(false);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  //   getMatchdetail();
  // }, [ouid, matchtype, nickname])

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
        {
          error?
          (
            <div className="NoUser"><strong>존재하지 않는 유저입니다.</strong></div>
          ):(
            <>
              <UserInfo nickname={nickname} ouid={ouid} matchdetail={matchdetail}/>
              <div className="MatchTypeConatiner">
              <div className={selected === "publicGame" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={() => { publicGame(); setSelected("publicGame"); }}>공식경기</div>
                <div className={selected === "leagueGame" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={() => { leagueGame(); setSelected("leagueGame"); }}>리그친선</div>
                <div className={selected === "directorMode" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={() => { directorMode(); setSelected("directorMode"); }}>감독모드</div>
                <div className={selected === "classicMode" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={() => { classicMode(); setSelected("classicMode"); }}>클래식 1vs1</div>
              </div>
              <MatchStats loading={loading} matchdetail={matchdetail} nickname={nickname}/>
              <MatchResult nickname={nickname} matchdetail={matchdetail} loading={loading} increaseOffset={increaseOffset} moreLoading={moreLoading} />
            </>
          )
        }
      </div>
    </div>
  );
}
