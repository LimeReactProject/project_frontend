import React, { useEffect, useRef, useState } from 'react';
import './reservation.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import DateModal from '../../pages/home/DateModal';
import AirportSelector from './AirportSelector';

const JejuAirBody = () => {
	  const [selectedTab, setSelectedTab] = useState('RT'); // RT: 왕복, OW: 편도, MT: 다구간
    const [selectedDates, setSelectedDates] = useState({
    departure: new Date(), // 오늘 날짜로 초기화
    return: new Date(Date.now() + 24 * 60 * 60 * 1000), // 내일 날짜로 초기화
    segment2: new Date()
    })
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [modalType, setModalType] = useState('departure');
    const [openAirportPanel, setOpenAirportPanel] = useState(null); // 'departure' | 'arrival' | null
    const dateRef=useRef(null);
    const segment2DateRef=useRef(null);
    const flatpickrInstance = useRef(null);
    const segment2FlatpickrInstance = useRef(null);
    const [selectedAirports, setSelectedAirports] = useState({
      departure: { code: '', city: '', name: '' },
      arrival:   { code: '', city: '', name: '' }
    });
  
  const handleTabClick = (tabType) => {
    setSelectedTab(tabType);
    //탭 변경 시 flatpickr 값 초기화
    initializeFlatpickr(tabType);
  };

  const initializeFlatpickr=(tabType)=>{
    //기존 인스턴스 제거
    if(flatpickrInstance.current){
      flatpickrInstance.current.destroy();
    }
    if(segment2FlatpickrInstance.current){
      segment2FlatpickrInstance.current.destroy();
    }
  

    if (dateRef.current) {
      const config = {
        mode: tabType === 'RT' ? 'range' : 'single',
        dateFormat: 'Y.m.d(D)',
        minDate: 'today',
        defaultDate: tabType === 'RT' 
          ? [selectedDates.departure, selectedDates.return] 
          : selectedDates.departure,
        inline: false,
        static: true,
        appendTo: dateRef.current.closest('.route-row'), // route-row에 추가
        positionElement: dateRef.current.closest('.route-row'), // route-row를 기준으로 위치
      locale: {
          weekdays: {
            shorthand: ['일', '월', '화', '수', '목', '금', '토'],
            longhand: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
          },
          months: {
            shorthand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            longhand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
          }
        },
        onChange: function(selectedDates, dateStr, instance) {
          if (tabType === 'RT' && selectedDates.length === 2) {
            setSelectedDates(prev => ({
              ...prev,
              departure: selectedDates[0],
              return: selectedDates[1]
            }));
          } else if (tabType === 'RT' && selectedDates.length === 1) {
            setSelectedDates(prev => ({
              ...prev,
              departure: selectedDates[0]
            }));
          } else if (selectedDates.length === 1) {
            setSelectedDates(prev => ({
              ...prev,
              departure: selectedDates[0],
              return: null
            }));
          }
        }
      };
      flatpickrInstance.current = flatpickr(dateRef.current, config);
    }
    // 다구간 두 번째 날짜 선택기 초기화
    if (tabType === 'MT' && segment2DateRef.current) {
      segment2FlatpickrInstance.current = flatpickr(segment2DateRef.current, {
        mode: 'single',
        dateFormat: 'Y.m.d(D)',
        minDate: 'today',
        defaultDate: selectedDates.segment2,
        inline: false,
        static: true,
        appendTo: segment2DateRef.current.closest('.route-row'), // route-row에 추가
        positionElement: segment2DateRef.current.closest('.route-row'), // route-row를 기준으로 위치
        locale: {
          weekdays: {
            shorthand: ['일', '월', '화', '수', '목', '금', '토'],
            longhand: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
          },
          months: {
            shorthand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            longhand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
          }
        },
        onChange: function(selectedDates, dateStr, instance) {
          if (selectedDates.length === 1) {
            setSelectedDates(prev => ({
              ...prev,
              segment2: selectedDates[0]
            }));
          }
        }
      });
    }
  };
    useEffect(() => {
    initializeFlatpickr(selectedTab);
    
    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
      }
      if (segment2FlatpickrInstance.current) {
        segment2FlatpickrInstance.current.destroy();
      }
    };
  }, [selectedTab]);
  
  const handleDateButtonClick = () => {
    setIsDateModalOpen(true);
    setModalType('departure');
  };

  const handleSegment2ButtonClick = () => {
    if (segment2FlatpickrInstance.current) {
      segment2FlatpickrInstance.current.open();
    }
  };

  const handleModalClose = () => {
    setIsDateModalOpen(false);
  };

  const handleDepartureClick = () => {
    setOpenAirportPanel(prev => prev === 'departure' ? null : 'departure');
  };

  const handleArrivalClick = () => {
    setOpenAirportPanel(prev => prev === 'arrival' ? null : 'arrival');
  };

  const handleAirportSelect = (ap, type) => {
    setSelectedAirports(p => ({ ...p, [type]: ap }));
  };
  const closeAirportPanel = () => setOpenAirportPanel(null);

  const formatDateDisplay = () => {
    if (selectedTab === 'OW') {
      return selectedDates.departure.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        weekday: 'short' 
      }).replace(/\./g, '.').replace(/ /g, '');
    } else if (selectedTab === 'RT') {
      const depDate = selectedDates.departure.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        weekday: 'short' 
      }).replace(/\./g, '.').replace(/ /g, '');
      
      const retDate = selectedDates.return.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        weekday: 'short' 
      }).replace(/\./g, '.').replace(/ /g, '');
      
      return `${depDate} ~ ${retDate}`;
    } else {
      return selectedDates.departure.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        weekday: 'short' 
      }).replace(/\./g, '.').replace(/ /g, '');
    }
  };
  const formatHiddenDate = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  return (
    <React.Fragment>
      <Header />
      <main id="main" className="main">
        <div className="page-title-wrap">
          <div className="page-title">항공권 예매</div>
        </div>
        
        <div className="quick-book-sch">
          <div className="main-ticketing">
            <div className="ticketing-in">
              <ul className="ticketing-type">
                <li className={`item ${selectedTab === 'RT' ? 'selected' : ''}`}>
                  <span 
                    className="item-btn"
                    onClick={() => handleTabClick('RT')}
                  >
                    왕복
                  </span>
                </li>
                <li className={`item ${selectedTab === 'OW' ? 'selected' : ''}`}>
                  <span 
                    className="item-btn"
                    onClick={() => handleTabClick('OW')}
                  >
                    편도
                  </span>
                </li>
                <li className={`item ${selectedTab === 'MT' ? 'selected' : ''}`}>
                  <span 
                    className="item-btn"
                    onClick={() => handleTabClick('MT')}
                  >
                    다구간
                  </span>
                </li>
              </ul>
              
              <div className="ticketing-content">
                <div className="route-row">
                  <div className="departure-section" onClick={handleDepartureClick} style={{cursor:'pointer'}}>
                    <div className="city-name">출발지</div>
                  </div>
                  
                  <div className="route-arrow">
                    <button type="button" 
                      className={`btn-open js-target-pick btnMark ${selectedTab === 'RT' ? 'round-trip' : ''}`}
                      data-route="DEP" id="btnExchangeRoute1">
                    </button>			
                  </div>
                  
                  <div className="arrival-section" onClick={handleArrivalClick} style={{cursor:'pointer'}}>
                    <div className="city-name">도착지</div>
                  </div>
                  
                  <div className="ticketing-date">
                    <button type="button" className="btn-date" id="btnDatePicker" onClick={handleDateButtonClick}>
                      <span className="txt">{formatDateDisplay()}</span>
                    </button>
                    {/* flatpickr용 숨겨진 input */}
                    <input type="text" ref={dateRef} style={{display: 'none'}} />
                    <input type="hidden" id="departureDate" value={formatHiddenDate(selectedDates.departure)} />
                    <input type="hidden" id="arrivalDate" value={formatHiddenDate(selectedDates.return)} />
                  </div>
                </div>

                {openAirportPanel && (
                  <AirportSelector
                    type={openAirportPanel}
                    onSelect={handleAirportSelect}
                    onClose={closeAirportPanel}
                  />
                )}

                {/* 다구간 선택시 두 번째 구간 추가 */}
                {selectedTab === 'MT' && (
                  <div className="route-row multi-segment">
                    <div className="departure-section">
                      <div className="city-name">출발지</div>
                    </div>
                    
                    <div className="route-arrow">
                      <button type="button" className="btn-open js-target-pick btnMark" data-route="DEP" 
                        id="btnExchangeRoute2">
                      </button>			
                    </div>
                    
                    <div className="arrival-section">
                      <div className="city-name">도착지</div>
                    </div>
                    
                    <div className="ticketing-date">
                      <button type="button" className="btn-date" id="btnDatePicker2" onClick={handleSegment2ButtonClick}>
                        <span className="txt">
                          {selectedDates.segment2.toLocaleDateString('ko-KR', { 
                            year: 'numeric', 
                            month: '2-digit', 
                            day: '2-digit', 
                            weekday: 'short' 
                          }).replace(/\./g, '.').replace(/ /g, '')}
                        </span>
                      </button>
                      {/* flatpickr용 숨겨진 input */}
                      <input type="text" ref={segment2DateRef} style={{display: 'none'}} />
                      <input type="hidden" id="segment2Date" value={formatHiddenDate(selectedDates.segment2)} />
                    </div>
                  </div>
                )}        
                
                <div className="passenger-row">
                  <button type="button" className="passenger-btn">
                    <span className="person-icon"> </span>
                    <span className="passenger-text">성인1</span>
                  </button>
                </div>
                
                <div className="options-row">
                  <div className="payment-section">
                    <div className="section-title">결제 방법</div>
                    <div className="payment-options">
                      <label className="payment-option">
                        <input type="radio" name="payment" defaultChecked />
                        <span>일반</span>
                      </label>
                      <label className="payment-option">
                        <input type="radio" name="payment" />
                        <span>포인트</span>
                      </label>
                      <label className="payment-option">
                        <input type="radio" name="payment" />
                        <span>기프티켓</span>
                      </label>
                    </div>
                  </div>
                  
                  <button className="btn-search">항공편 검색</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <DateModal 
        isOpen={isDateModalOpen}
        onClose={handleModalClose}
        modalType={modalType}
      />
    </React.Fragment>
  );
};

export default JejuAirBody;