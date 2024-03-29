import React, { useState } from 'react'
import '../css/SearchPage.css'
import searchIcon from '../assets/searchicon.png'

export default function SearchPage() {
    const [searchText, setSearchText] = useState("");
    const onChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }
  return (
    <div className="SearchPageBackground">
        <div className="MainContainer">
            <div className="SearchContainer">
                <input type="text" placeholder='닉네임을 입력해주세요.' value={searchText} onChange={onChange} className="SearchNickname"/>
                <img src={searchIcon} alt="searchIcon" className='SearchIcon'/>
            </div>
            <div className="NoticeContainer">
                
            </div>
        </div>
    </div>
  )
}
