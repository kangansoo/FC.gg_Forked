import React from 'react'
import '../css/Header.css'
import fconlinelogo from '../assets/fconlinelogo.png'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <div className='HeaderBackground'>
      <div className="HeaderContainer">
        <div className="FcLogoContainer">
          <img src={fconlinelogo} alt="fconlinelogo" className="FcOnlineLogo"/>
        </div>
        <div className="HeaderCategoryContainer">
          <strong className="HeaderCategory">전적 검색</strong>
        </div>
        <div className="HeaderCategoryContainer">
          <strong className="HeaderCategory">랭커 분석</strong>
        </div>
        <div className='LogoContainer'>
          <img src={logo} alt="logo" className='Logo'/>
        </div>
      </div>
    </div>
  )
}
