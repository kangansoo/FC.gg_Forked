import React from 'react'
import '../css/Header.css'
import fconlinelogo from '../assets/fconlinelogo.png'
import logo from '../assets/logo.png'
import ReadyModal from '../components/ReadyModal.js'

export default function Header() {
  return (
    <div className='HeaderBackground'>
      <div className="HeaderContainer">
        <div className="FcLogoContainer">
          <img src={fconlinelogo} alt="fconlinelogo" className="FcOnlineLogo"/>
        </div>
        <div className="HeaderCategoryContainer">
          <a href="/" className="ToSearchPage">
            <strong className="HeaderCategory">전적 검색</strong>
          </a>
        </div>
        <div className="HeaderCategoryContainer">
          {/* <strong className="HeaderCategory">랭커 분석</strong> */}
          <ReadyModal />
        </div>
        <div className='LogoContainer'>
          <img src={logo} alt="logo" className='Logo'/>
        </div>
      </div>
    </div>
  )
}
