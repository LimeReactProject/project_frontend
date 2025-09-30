import React, { useState } from 'react';
import './PassengerModal.css';

function PassengerModal({ isOpen, onClose, onConfirm, initialCounts, selectedAirports, selectedTab }) {
  const [counts, setCounts] = useState({
    adult: initialCounts?.adult || 1,
    child: initialCounts?.child || 0,
    infant: initialCounts?.infant || 0
  });

  if (!isOpen) return null;

  const handleCountChange = (type, delta) => {
    setCounts(prev => {
      const newCount = Math.max(0, prev[type] + delta);
      
      // 성인은 최소 1명 이상
      if (type === 'adult' && newCount < 1) return prev;
      
      // 각각 최대 9명까지
      if (newCount > 9) return prev;
      
      return { ...prev, [type]: newCount };
    });
  };

  const handleConfirm = () => {
    onConfirm(counts);
    onClose();
  };

  // 선택된 공항 정보로 경로 표시
  const getRouteDisplay = () => {
    if (!selectedAirports?.departure?.code || !selectedAirports?.arrival?.code) {
      return { route: '출발지 - 도착지', dates: '' };
    }

    const depCity = selectedAirports.departure.city || '출발지';
    const arrCity = selectedAirports.arrival.city || '도착지';
    
    return {
      route: `${depCity} - ${arrCity}`,
      dates: selectedTab === 'RT' ? '왕복' : selectedTab === 'OW' ? '편도' : '다구간'
    };
  };

  const routeInfo = getRouteDisplay();

  return (
    <div className="passenger-modal-overlay" onClick={onClose}>
      <div className="passenger-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>누구와 함께 떠나세요?</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="departure-info">
            <div className="route-info">
              <span className="route">{routeInfo.route}</span>
            </div>
            <div className="date-info">
              <span>{routeInfo.dates}</span>
            </div>
          </div>

          <div className="passenger-selection">
            <div className="passenger-row">
              <div className="passenger-info">
                <div className="type">성인</div>
                <div className="age">12세 이상</div>
              </div>
              <div className="counter">
                <button 
                  className="counter-btn"
                  onClick={() => handleCountChange('adult', -1)}
                  disabled={counts.adult <= 1}
                >
                  −
                </button>
                <span className="count">{counts.adult}</span>
                <button 
                  className="counter-btn"
                  onClick={() => handleCountChange('adult', 1)}
                  disabled={counts.adult >= 9}
                >
                  +
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <div className="passenger-info">
                <div className="type">소아</div>
                <div className="age">
                  국제선 기준 만 2세-12세 미만
                  <br />
                  (최초 출발일 기준 만 2세부터 기준)
                </div>
              </div>
              <div className="counter">
                <button 
                  className="counter-btn"
                  onClick={() => handleCountChange('child', -1)}
                  disabled={counts.child <= 0}
                >
                  −
                </button>
                <span className="count">{counts.child}</span>
                <button 
                  className="counter-btn"
                  onClick={() => handleCountChange('child', 1)}
                  disabled={counts.child >= 9}
                >
                  +
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <div className="passenger-info">
                <div className="type">유아</div>
                <div className="age">
                  생후 14일 이상-만 2세 미만 (만 24개월 미만)
                  <br />
                  유아의 여정이 동반 성인과 달라서는 않으며 독으로 좌석을 
                  <br />
                  제공해야 합니다.
                </div>
              </div>
              <div className="counter">
                <button 
                  className="counter-btn"
                  onClick={() => handleCountChange('infant', -1)}
                  disabled={counts.infant <= 0}
                >
                  −
                </button>
                <span className="count">{counts.infant}</span>
                <button 
                  className="counter-btn"
                  onClick={() => handleCountChange('infant', 1)}
                  disabled={counts.infant >= 9}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="expandable-section">
            <button className="expand-btn">
              나이계산기
              <span className="arrow-down">▼</span>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="confirm-btn" onClick={handleConfirm}>
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default PassengerModal;
