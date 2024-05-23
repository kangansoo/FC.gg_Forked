import React, { useState, useEffect, useCallback } from "react";
import "../css/Result.css";
import searchIcon from "../assets/searchicon.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MatchResult from "../components/MatchResult";
import UserInfo from '../components/UserInfo';
import MatchStats from '../components/MatchStats';
import loadinggif from "../assets/loading.gif";
import Swal from "sweetalert2";

export default function Screen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [matchtype, setMatch] = useState(50);
  const [nickname, setNickname] = useState("");
  const [ouid, setOuid] = useState("");
  const [matchdetail, setMatchdetail] = useState([]);
  const [loading, setLoading] = useState(false); // 초기값 false로 설정
  const [selected, setSelected] = useState("publicGame");
  const [error, setError] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const buttonClick = useCallback(async () => {
    if (!searchText) {
      Swal.fire({
        title: "검색 오류",
        icon: 'info',
        text: '유저 이름을 입력해주세요!',
        background: '#d9d9d9'
      });
    } else if(searchText === nickname){
      setLoading(false);
    } else {
      setOffset(0);
      setLoading(true);
      navigate(`./?input=${searchText}`);
      setNickname(searchText);
      setSearchText("");
      setMoreLoading(false);
      setSelected("publicGame");
      setMatch(50);
    }
  }, [navigate, searchText]);

  const keyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      buttonClick();
    }
  };

  const input = new URLSearchParams(location.search).get("input");

  const publicGame = useCallback(() => {
    if (selected !== "publicGame") {
      setLoading(true);
      setMatch(50);
      setOffset(0);
      setSelected("publicGame");
    }
  }, [selected]);

  const leagueGame = useCallback(() => {
    if (selected !== "leagueGame") {
      setLoading(true);
      setMatch(30);
      setOffset(0);
      setSelected("leagueGame");
    }
  }, [selected]);

  const directorMode = useCallback(() => {
    if (selected !== "directorMode") {
      setLoading(true);
      setMatch(52);
      setOffset(0);
      setSelected("directorMode");
    }
  }, [selected]);

  const classicMode = useCallback(() => {
    if (selected !== "classicMode") {
      setLoading(true);
      setMatch(40);
      setOffset(0);
      setSelected("classicMode");
    }
  }, [selected]);

  useEffect(() => {
    setNickname(input);
  }, [input]);

  useEffect(() => {
    if (nickname) {
      setError(false);
      setLoading(true);
      const handleGetouid = async () => {
        try {
          const response = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getouid', {
            params: { nickname: nickname }
          });
          setOuid(response.data);
        } catch (error) {
          setError(true);
        }
      };
      handleGetouid();
    }
  }, [nickname, input]);

  useEffect(() => {
    const getMatchdetail = async () => {
      if (!ouid) return;

      setLoading(true); // 데이터 로딩 시작
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

        const newMatchData = await Promise.all(response1.data.map(async (id) => {
          const response2 = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getmatchdetail', {
            params: {
              matchid: String(id),
              nickname: nickname
            }
          });
          return response2.data;
        }));

        if (offset === 0) {
          setMatchdetail(newMatchData);
        } else {
          setMatchdetail(prevMatchDetail => [...prevMatchDetail, ...newMatchData]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
        setMoreLoading(false);
      }
    };

    getMatchdetail();
  }, [matchtype, offset, ouid]);

  const increaseOffset = () => {
    setOffset(prevOffset => prevOffset + 10);
    setMoreLoading(true);
  };

  return (
    <div className="screen">
      <div className="div">
        <div className="SearchContainer1">
          <input
            type="search"
            placeholder="닉네임을 입력해주세요."
            value={searchText}
            onChange={onChange}
            className="SearchNickname1"
            onKeyDown={keyPress}
          />
          <img src={searchIcon} alt="searchIcon" className="SearchIcon1" onClick={buttonClick} />
        </div>
        {error ? (
          <div className="NoUser"><strong>존재하지 않는 유저입니다.</strong></div>
        ) : (
          <>
            <UserInfo nickname={nickname} ouid={ouid} />
            <div className="MatchTypeConatiner">
              <div className={selected === "publicGame" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={publicGame}>공식경기</div>
              <div className={selected === "leagueGame" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={leagueGame}>리그친선</div>
              <div className={selected === "directorMode" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={directorMode}>감독모드</div>
              <div className={selected === "classicMode" ? "MatchTypeTextselected" : "MatchTypeText"} onClick={classicMode}>클래식 1vs1</div>
            </div>
            {loading ? (
              <img
                src={loadinggif}
                alt="로딩"
                width="50px"
                className="MatchResultLoading"
                style={{ marginTop: "60px" }}
              />
            ) : (
              <>
                <MatchStats loading={loading} matchdetail={matchdetail} nickname={nickname} />
                <MatchResult nickname={nickname} matchdetail={matchdetail} loading={loading} increaseOffset={increaseOffset} moreLoading={moreLoading} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
