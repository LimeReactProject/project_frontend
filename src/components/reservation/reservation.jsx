import React, { useEffect, useRef, useState } from 'react';
import './reservation.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import DateModal from './DateModal';
import AirportSelector from './AirportSelector';
import PassengerModal from './PassengerModal';
import AlertModal from './AlertModal';
import LoadingScreen from './LoadingScreen'; // 새로 추가


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
      departure: { code: '', city: '출발지', name: '' },
      arrival:   { code: '', city: '도착지', name: '' },
      departure2: { code: '', city: '출발지', name: '' },
      arrival2:   { code: '', city: '도착지', name: '' }
    });
    const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
    const [passengerCounts, setPassengerCounts] = useState({
      adult: 1,
      child: 0,
      infant: 0
    });
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
   
  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTabClick = (tabType) => {
    setSelectedTab(tabType);
    
    // 탭 변경 시 공항 정보 초기화
    setSelectedAirports({
      departure: { code: '', city: '출발지', name: '' },
      arrival:   { code: '', city: '도착지', name: '' },
      departure2: { code: '', city: '출발지', name: '' },
      arrival2:   { code: '', city: '도착지', name: '' }
    });
    
    // 열려있는 공항 패널 닫기
    setOpenAirportPanel(null);
    
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
        onChange: function(selectedDates) {
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
        onChange: function(selectedDates) {
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

  const handleModalClose = () => {
    setIsDateModalOpen(false);
  };

  const handleDepartureClick = () => {
    setOpenAirportPanel(prev => prev === 'departure' ? null : 'departure');
  };

  const handleArrivalClick = () => {
    setOpenAirportPanel(prev => prev === 'arrival' ? null : 'arrival');
  };

    // 다구간 두 번째 구간용 핸들러 추가
    const handleDeparture2Click = () => {
      setOpenAirportPanel(prev => prev === 'departure2' ? null : 'departure2');
    };
  
    const handleArrival2Click = () => {
      setOpenAirportPanel(prev => prev === 'arrival2' ? null : 'arrival2');
    };
  const handleAirportSelect = (ap, type) => {
    setSelectedAirports(p => ({ ...p, [type]: ap }));
    setOpenAirportPanel(null); // 선택 후 패널 닫기
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

    // 출발지와 도착지 교환 함수 추가
    const handleRouteExchange = () => {
      setSelectedAirports(prev => ({
        ...prev,
        departure: prev.arrival,
        arrival: prev.departure
      }));
    };
  
    // 다구간 두 번째 구간 교환 함수 추가
    const handleRoute2Exchange = () => {
      setSelectedAirports(prev => ({
        ...prev,
        departure2: prev.arrival2,
        arrival2: prev.departure2
      }));
    };
  
    const handlePassengerClick = () => {
      // 출발지와 도착지가 모두 선택되었는지 확인
      if (!selectedAirports.departure.code || !selectedAirports.arrival.code) {
        setAlertMessage('여정 및 일정을 선택하세요');
        setIsAlertModalOpen(true);
        return;
      }
      setIsPassengerModalOpen(true);
    };

    const handlePassengerConfirm = (counts) => {
      setPassengerCounts(counts);
    };

    const getPassengerText = () => {
      const { adult, child, infant } = passengerCounts;
      let text = `성인${adult}`;
      if (child > 0) text += `, 소아${child}`;
      if (infant > 0) text += `, 유아${infant}`;
      return text;
    };
  
     // 항공편 검색 핸들러 추가
  const handleFlightSearch = () => {
    // 필수 정보 검증
    if (!selectedAirports.departure.code || !selectedAirports.arrival.code) {
      setAlertMessage('출발지와 도착지를 선택해주세요');
      setIsAlertModalOpen(true);
      return;
    }
      // 로딩 시작
    setIsLoading(true);

    // 실제 검색 로직을 여기에 추가
    // 예시: setTimeout으로 3초 후 로딩 종료 (실제로는 API 호출)
    setTimeout(() => {
      setIsLoading(false);
      // 검색 결과 페이지로 이동하거나 다른 처리
      console.log('항공편 검색 완료');
    }, 3000);
  };
  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen />;
  }
  

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
                    <div className="city-name">
                      {selectedAirports.departure.code ? (
                        <>
                          <div className="airport-name" style={{color: '#333'}}>{selectedAirports.departure.city}</div>
                        </>
                      ) : (
                        '출발지'
                      )}
                    </div>
                  </div>
                  
                  
                  <div className="route-arrow">
                    <button type="button" 
                      className={`btn-open js-target-pick btnMark ${selectedTab === 'RT' ? 'round-trip' : ''}`}
                      data-route="DEP" id="btnExchangeRoute1"
                      onClick={handleRouteExchange}>
                    </button>			
                  </div>
                  
                  <div className="arrival-section" onClick={handleArrivalClick} style={{cursor:'pointer'}}>
                    <div className="city-name">
                      {selectedAirports.arrival.code ? (
                        <>
                          
                          <div className="airport-name" style={{color: '#333'}}>{selectedAirports.arrival.city}</div>
                        </>
                      ) : (
                        '도착지'
                      )}
                    </div>
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

      
                {/* 다구간 선택시 두 번째 구간 추가 */}
                {selectedTab === 'MT' && (
                  <div className="route-row multi-segment">
                    <div className="departure-section" onClick={handleDeparture2Click} style={{cursor:'pointer'}}>
                      <div className="city-name">
                        {selectedAirports.departure2.code ? (
                          <>
                            <div className="airport-name" style={{color: '#333'}}>{selectedAirports.departure2.city}</div>
                          </>
                        ) : (
                          '출발지'
                        )}
                      </div>
                    </div>
                    
                    <div className="route-arrow">
                      <button type="button" className="btn-open js-target-pick btnMark" data-route="DEP" 
                        id="btnExchangeRoute2"
                        onClick={handleRoute2Exchange}>

                      </button>			
                    </div>
                    
                    <div className="arrival-section" onClick={handleArrival2Click} style={{cursor:'pointer'}}>
                      <div className="city-name">
                        {selectedAirports.arrival2.code ? (
                          <>
                            <div className="airport-name" style={{color: '#333'}}>{selectedAirports.arrival2.city}</div>
                          </>
                        ) : (
                          '도착지'
                        )}
                      </div>
                    </div>
                    
                    <div className="ticketing-date">
                    <button type="button" className="btn-date" id="btnDatePicker" onClick={handleDateButtonClick}>
                      <span className="txt">{formatDateDisplay()}</span>
                    </button>
                    {/* flatpickr용 숨겨진 input */}
                      <input type="text" ref={segment2DateRef} style={{display: 'none'}} />
                      <input type="hidden" id="departureDate2" value={formatHiddenDate(selectedDates.segment2)} />
                    </div>
                  </div>
                )}        

                {openAirportPanel && (
                  <AirportSelector
                    type={openAirportPanel}
                    onSelect={handleAirportSelect}
                    onClose={closeAirportPanel}
                    selectedAirports={selectedAirports}
                  />
                )}
                
                
                <div className="passenger-row">
                  <button type="button" className="passenger-btn" onClick={handlePassengerClick}>
                    <span className="person-icon"> </span>
                    <span className="passenger-text">{getPassengerText()}</span>
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
                      <label className="payment-option disabled" title="점검 중">
                        <input type="radio" name="payment" disabled />
                        <span>포인트</span>
                      </label>
                      <label className="payment-option disabled" title="점검 중">
                        <input type="radio" name="payment" disabled />
                        <span>기프티켓</span>
                      </label>
                    </div>
                  </div>
                  
                  <button className="btn-search" onClick={handleFlightSearch}>
                    항공편 검색
                  </button>
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
      onSelectDate={(date, type) => {
        if (type === 'departure') {
          setSelectedDates(prev => ({
            ...prev,
            departure: date
          }));
        } else if (type === 'return') {
          setSelectedDates(prev => ({
            ...prev,
            return: date
          }));
        }
      }}
      // 출발지/도착지 정보 전달 (누락된 부분 추가)
      departure={selectedAirports.departure.city}
      arrival={selectedAirports.arrival.city}
      departureCode={selectedAirports.departure.code}
      arrivalCode={selectedAirports.arrival.code}
      searchType={selectedTab === 'RT' ? '왕복' : '편도'}
    />
      <AlertModal 
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message={alertMessage}
      />
      <PassengerModal 
        isOpen={isPassengerModalOpen}
        onClose={() => setIsPassengerModalOpen(false)}
        onConfirm={handlePassengerConfirm}
        initialCounts={passengerCounts}
        selectedAirports={selectedAirports}
        selectedTab={selectedTab}
      />
    </React.Fragment>
  );
};

export default JejuAirBody;