import React, { useEffect, useState } from 'react'
import '../css/SearchPage.css'
import searchIcon from '../assets/searchicon.png'
import leaguelogos from "../assets/leaguelogos.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function SearchPage() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [notice, setNotice] = useState([]);
    const [urgentNotice, setUrgentNotice] = useState([]);
    const [noticeError, setNoticeError] = useState("");
    const onChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    const buttonClick = (e) => {
        e.preventDefault();
        if (!searchText) {
            Swal.fire({
                title: "검색 오류",
                icon: 'info',
                text: '유저 이름을 입력해주세요!',
                background: '#d9d9d9'
            })
        } else {
          navigate(`./result/?input=${searchText}`);
          setSearchText("");
        }
    };
    
    const keyPress = (e) => {
        if (e.key === "Enter"&&e.nativeEvent.isComposing === false) {
          buttonClick(e);
        }
    };

    useEffect(() => {
        const getNotice = async () => {
            try {
                const response = await axios.get('https://p0l0evybh6.execute-api.ap-northeast-2.amazonaws.com/dev/Getnotice');
                setNotice(response.data["일반공지"]);
                setUrgentNotice(response.data["특별공지"]);
                // console.log(response);
            } catch (error) {
                // console.error('알림을 가져오는 중 오류가 발생했습니다:', error);
                setNoticeError("공지사항을 불러올 수 없습니다.")
            }
        };
        getNotice();
    }, []);

  return (
    <div className="SearchPageBackground">
        <div className="MainContainer">
            <div className="SearchContainer">
                <input type="search" placeholder='닉네임을 입력해주세요.' value={searchText} onChange={onChange} className="SearchNickname" maxLength="15"  onKeyDown={keyPress}/>
                <img src={searchIcon} alt="searchIcon" className='SearchIcon' onClick={(e) => buttonClick(e)}/>
            </div>
            <div className="NoticeContainer">
                <strong className="NoticeTitle">[공지사항]</strong>
                <ul className='NoticeListContainer'>
                    {
                        urgentNotice ?
                        urgentNotice.map((data, index) => (
                            <li className="urgentNoticeList" key={index}><span className='UrgentNoticeCategory'>{data.category}</span>: <a href={data.href} target="_black" className='NoticeAnker'><strong>{data.title}</strong></a><span> ({data.date})</span></li>

                        )):(<p>{noticeError}</p>)
                    }
                    {
                        notice ?
                        notice.map((data, index)=>(
                            <li className='NoticeList' key={index}>{data.category}: <a href={data.href} target="_black"  className='NoticeAnker'>{data.title}</a><span> ({data.date})</span></li>
                        )):(<p>{noticeError}</p>)
                    }
                </ul>
            </div>
            <div className='MarkContainer'>
                <div className='NexonApiMarkContainer'>
                    <span className='NexonMark'>Data based on NEXON Open API</span>
                </div>
                <div className='LogosContainer'>
                    <img src={leaguelogos} alt="leaguelogos" className='LeagueLogos' />
                </div>
            </div>
        </div>
    </div>
  )
}