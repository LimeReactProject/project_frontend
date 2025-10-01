import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="airplane-icon">
          ✈️
        </div>
        <h2 className="loading-title">최적의 항공편을</h2>
        <h2 className="loading-subtitle">찾고 있는 중입니다.</h2>
        
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        
        <div className="loading-features">
          <div className="feature-item">
            <div className="feature-icon">🛍️</div>
            <div className="feature-text">
              <div className="feature-title">사전 수하물 추가</div>
              <div className="feature-desc">저렴 구매하여<br />가격 절약하니다.</div>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🍽️</div>
            <div className="feature-text">
              <div className="feature-title">기내식</div>
              <div className="feature-desc">여행 피로에서<br />즐기는 한끼</div>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <div className="feature-text">
              <div className="feature-title">여행자 보험</div>
              <div className="feature-desc">더욱 안전한<br />여행을 위한 준비</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;