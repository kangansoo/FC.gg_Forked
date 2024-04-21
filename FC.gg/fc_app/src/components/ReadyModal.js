import React, { useState } from 'react'
import Modal from 'react-modal'
import '../css/ReadyModal.css'

export default function ReadyModal() {
    const [isOpen, setIsOpen] = useState(false)

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }
    
  return (
    <>
      <strong className="HeaderCategory" onClick={openModal}>랭커 분석</strong>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Pop up Message"
        ariaHideApp={false}
        className="ReadyModal"
      >
        <div className="CloseButton" onClick={closeModal}><strong>x</strong></div>
        <p>준비 중인 서비스입니다.</p>
      </Modal>
    </>
  )
}
const customStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: "150",
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border:"1px solid rgb(0, 0, 0)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
      backgroundColor: "rgba(0, 0, 0, 0.9",
      color: "white",
    },
  };
