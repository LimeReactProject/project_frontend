import React, { useState } from 'react';
import './SearchModal.css';
import { X, Search, MapPin, Clock, Star, ChevronRight } from 'lucide-react';

function SearchModal({ isOpen, onClose, modalType }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('최근 검색');
    const [selectedCountry, setSelectedCountry] = useState('대한민국');

    // 국가별 도시 데이터 - 예시로 2개 국가만
    const cities = {
        '대한민국': [
            { code: 'SEL', name: '서울(모든 공항)' },
            { code: 'ICN', name: '서울(인천)' },
            { code: 'GMP', name: '서울(김포)' },
            { code: 'PUS', name: '부산' },
            { code: 'CJU', name: '제주' }
        ],
        '일본': [
            { code: 'NRT', name: '도쿄(나리타)' },
            { code: 'HND', name: '도쿄(하네다)' },
            { code: 'KIX', name: '오사카' },
            { code: 'FUK', name: '후쿠오카' }
        ]
    };

    const recentSearches = [
        { code: 'GMP', name: '서울(김포)' },
        { code: 'PUS', name: '부산' },
        { code: 'DAD', name: '다낭' },
        { code: 'NRT', name: '도쿄(나리타)' },
        { code: 'ICN', name: '서울(인천)' },
        { code: 'TAG', name: '보홀' },
        { code: 'CJU', name: '제주' }
    ];

    const favorites = [
        { code: 'CJU', name: '제주' },
        { code: 'PUS', name: '부산' },
        { code: 'GMP', name: '서울(김포)' },
        { code: 'NRT', name: '도쿄(나리타)' }
    ];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{modalType === 'departure' ? '출발지' : '도착지'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-search">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="어디에서 출발하세요?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button className="search-clear" onClick={() => setSearchQuery('')}>
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="modal-tabs">
                    <button 
                        className={`tab-btn ${activeTab === '최근 검색' ? 'active' : ''}`}
                        onClick={() => setActiveTab('최근 검색')}
                    >
                        최근 검색
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === '즐겨찾기' ? 'active' : ''}`}
                        onClick={() => setActiveTab('즐겨찾기')}
                    >
                        즐겨찾기
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === '프로모션' ? 'active' : ''}`}
                        onClick={() => setActiveTab('프로모션')}
                    >
                        프로모션
                    </button>
                </div>

                <div className="modal-body">
                    {activeTab === '최근 검색' && (
                        <div className="recent-searches">
                            {recentSearches.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="search-item"
                                    onClick={() => {
                                        console.log(`Selected: ${item.name}`);
                                        onClose();
                                    }}
                                >
                                    <Clock size={16} className="item-icon" />
                                    <span className="item-text">{item.name}</span>
                                    <span className="item-code">{item.code}</span>
                                    <button 
                                        className="item-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Delete recent search:', item.name);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === '즐겨찾기' && (
                        <div className="favorites">
                            {favorites.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="search-item"
                                    onClick={() => {
                                        console.log(`Selected: ${item.name}`);
                                        onClose();
                                    }}
                                >
                                    <Star size={16} className="item-icon star" />
                                    <span className="item-text">{item.name}</span>
                                    <span className="item-code">{item.code}</span>
                                    <button 
                                        className="item-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Delete favorite:', item.name);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === '프로모션' && (
                        <div className="promo-message">
                            현재 진행 중인 프로모션이 없습니다.
                        </div>
                    )}

                     <div className="countries-section">
                         <div className="countries-layout">
                             {/* 왼쪽: 국가 목록 */}
                             <div className="countries-sidebar">
                                 <h3 className="section-title">국가</h3>
                                 <div className="countries-list">
                                     {Object.keys(cities).map((country) => (
                                         <button 
                                             key={country}
                                             className={`country-btn ${selectedCountry === country ? 'active' : ''}`}
                                             onClick={() => setSelectedCountry(country)}
                                         >
                                             <MapPin size={16} />
                                             <span>{country}</span>
                                         </button>
                                     ))}
                                 </div>
                             </div>
                             
                             {/* 오른쪽: 도시 목록 */}
                             <div className="cities-sidebar">
                                 <h3 className="section-title">
                                     {selectedCountry ? `${selectedCountry} 도시` : '도시를 선택하세요'}
                                 </h3>
                                 <div className="cities-list">
                                     {selectedCountry && cities[selectedCountry] ? (
                                         cities[selectedCountry].map((city, index) => (
                                             <button 
                                                 key={index} 
                                                 className="city-btn"
                                                 onClick={() => {
                                                     console.log(`Selected: ${city.name}`);
                                                     onClose();
                                                 }}
                                             >
                                                 <div className="city-info">
                                                     <span className="city-name">{city.name}</span>
                                                     <span className="city-code">{city.code}</span>
                                                 </div>
                                                 <button 
                                                     className="favorite-btn"
                                                     onClick={(e) => {
                                                         e.stopPropagation();
                                                         console.log('Toggle favorite:', city.name);
                                                     }}
                                                 >
                                                     <Star size={16} />
                                                 </button>
                                             </button>
                                         ))
                                     ) : (
                                         <div className="no-cities">
                                             왼쪽에서 국가를 선택해주세요
                                         </div>
                                     )}
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;