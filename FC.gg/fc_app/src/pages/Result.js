import '../css/Result.css'

const Result = () => {
    return (
      <div className="div">
        <div className="rectangle-parent">
          <div className="group-child" />
          <div className="div1">패배 상대 스코어 : 내 스코어</div>
          <div className="div2">경기 날짜</div>
        </div>
        <div className="rectangle-group">
          <div className="group-child" />
          <div className="div2">경기 날짜</div>
          <div className="div1">패배 상대 스코어 : 내 스코어</div>
        </div>
        <div className="rectangle-container">
          <div className="group-inner" />
          <div className="div5">승리 상대 스코어 : 내 스코어</div>
          <div className="div2">경기 날짜</div>
        </div>
        <div className="group-div">
          <div className="group-inner" />
          <div className="div2">경기 날짜</div>
          <div className="div8">승리 상대 스코어 : 내 스코어</div>
        </div>
        <div className="child" />
        <div className="item" />
        <div className="div9">경기 날짜</div>
        <div className="div10">승리 상대 스코어 : 내 스코어</div>
        <div className="rectangle-parent1">
          <div className="group-child1" />
          <div className="div11">강안수</div>
          <div className="div12">54%</div>
          <div className="div13">
            <span>
              <span className="span">{`10경기 `}</span>
              <span className="span1">{`최다 `}</span>
            </span>
            <span className="span1">
              <span>득점자</span>
            </span>
          </div>
          <div className="mvp">
            <span>
              <span className="span">{`10경기 `}</span>
              <span className="span4">{`최다 `}</span>
            </span>
            <span className="span4">
              <span>MVP</span>
            </span>
          </div>
          <div className="div14">
            <span>{`10경기 `}</span>
            <span className="span5">평균 승률</span>
          </div>
          <div className="div15">황성주</div>
        </div>
        <div className="inner">
          <div className="vector-parent">
            <img className="rectangle-icon" alt="" src="/rectangle-3.svg" />
            <div className="parent">
              <div className="div16">현재등급 : 월드클래스</div>
              <div className="div17">최고등급 : 챌린저</div>
            </div>
            <img className="ico-rank1-1-icon" alt="" src="/ico-rank1-1@2x.png" />
            <div className="group">
              <div className="div18">레벨 : 2524</div>
              <div className="div19">호날두</div>
            </div>
          </div>
        </div>
        <img className="pxfuel-5-icon" alt="" src="/pxfuel-5@2x.png" />
        <div className="group-parent">
          <div className="wrapper">
            <b className="b">공식경기</b>
          </div>
          <b className="b1">리그친선</b>
          <b className="b2">감독모드</b>
          <b className="vs1">클래식 1vs1</b>
        </div>
        <div className="container">
          <b className="b3">선수 추천</b>
        </div>
        {/* <div className="div20">
          <div className="inner1">
            <div className="parent1">
              <b className="b4">전적 검색 서비스</b>
              <b className="fcgg">FC.GG</b>
            </div>
          </div>
          <img
            className="fconlinelogo-1-icon"
            alt=""
            src="/fconlinelogo-1@2x.png"
          />
          <div className="frame">
            <b className="b5">전적 검색</b>
          </div>
          <div className="wrapper1">
            <b className="b5">랭커 분석</b>
          </div>
        </div> */}
        {/* <div className="div20">
          <div className="inner1">
            <div className="parent1">
              <b className="b4">전적 검색 서비스</b>
              <b className="fcgg">FC.GG</b>
            </div>
          </div>
          <img
            className="fconlinelogo-1-icon"
            alt=""
            src="/fconlinelogo-1@2x.png"
          />
          <div className="frame">
            <b className="b5">전적 검색</b>
          </div>
          <div className="wrapper1">
            <b className="b5">랭커 분석</b>
          </div>
        </div> */}
        <div className="inner3">
          <div className="rectangle-parent2">
            <div className="group-child2" />
            <div className="div22">닉네임을 입력해 주세요</div>
            <img className="searchicon-1" alt="" src="/searchicon-1@2x.png" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Result;
  