import React, {useState} from "react"
import "../css/Result.css"
import gradeIcon from '../assets/rank/champions.png' 
import searchIcon from '../assets/searchicon.png'

export default function Screen() {
  const [searchText, setSearchText] = useState("");
  const onChange = (e) => {
      e.preventDefault();
      setSearchText(e.target.value);
  }
  return (
    <div className="screen">
      <div className="div">

        
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

        
        <div className="group-wrapper">
              <div className="group-3">
                <div className="text-wrapper-6">현재등급 : 월드클래스</div>
                <div className="text-wrapper-7">최고등급 : 챌린저</div>
              </div>
              <img className="ico" alt="Ico" src={gradeIcon}/>
              <div className="group-4">
                <div className="text-wrapper-8">레벨 : 2524</div>
                <div className="text-wrapper-9">호날두</div>
              </div>

        </div>
        <div className="overlap-3">
          <div className="view">
          </div>
        </div>
        <div className="group-8">
          <div className="text-wrapper-11">공식경기</div>
          <div className="text-wrapper-12">리그친선</div>
          <div className="text-wrapper-13">감독모드</div>
          <div className="text-wrapper-14">클래식 1vs1</div>
        </div>
        

            <div className="SearchContainer1">
                <input type="text" placeholder='닉네임을 입력해주세요.' value={searchText} onChange={onChange} className="SearchNickname1"/>
                <img src={searchIcon} alt="searchIcon" className='SearchIcon1'/>
            </div>

    
        
      </div>
    </div>
  );
};