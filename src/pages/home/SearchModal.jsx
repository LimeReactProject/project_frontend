import React, { useState, useEffect } from 'react';
import '../../css/home/SearchModal.css';
import { X, Search, MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { apiClient } from '../../apis/FlightInfoApi';

function SearchModal({ isOpen, onClose, modalType, onSelectCity }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('최근 검색');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectCity] = useState('');

    
    const [cities, setCities] = useState({});
    const [recentSearches, setRecentSearches] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [countries, setCountries] = useState([]);

    // API에서 데이터 가져오기 
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiClient.get('/country');
                
                // 중복 제거 
                const uniqueCountries = [];
                const seen = new Set();
                
                response.data.forEach(item => {
                    if (!seen.has(item.country)) {
                        seen.add(item.country);
                        uniqueCountries.push(item);
                    }
                });
                
                setCountries(uniqueCountries);  
                
                // 국가별 도시 데이터 만들기
                const citiesData = {};
                response.data.forEach(item => {
                    if (!citiesData[item.country]) {
                        citiesData[item.country] = [];
                    }
                    citiesData[item.country].push({
                        name: item.airportName,
                        code: item.airportCode
                    });
                });
                setCities(citiesData);
                
    
            } catch (error) {
                console.log('에러:', error);
            }
        };
        
        if (isOpen) {
            getData();
        }
    }, [isOpen]);

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
                            {recentSearches.length > 0 ? (
                                recentSearches.map((item, index) => (
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
                                ))
                            ) : (
                                <div className="no-data">최근 검색 기록이 없습니다.</div>
                            )}
                        </div>
                    )}

                    {activeTab === '즐겨찾기' && (
                        <div className="favorites">
                            {favorites.length > 0 ? (
                                favorites.map((item, index) => (
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
                                ))
                            ) : (
                                <div className="no-data">즐겨찾기가 없습니다.</div>
                            )}
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
                                     {countries.length > 0 ? (
                                         countries.map((item, index) => (
                                             <button 
                                                 key={index}
                                                 className="country-btn"
                                                 onClick={() => setSelectedCountry(item.country)}
                                             >
                                                 <MapPin size={16} />
                                                 <span>{item.country}</span>
                                             </button>
                                         ))
                                     ) : (
                                         <div className="no-data">데이터 로딩 중...</div>
                                     )}
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
                                                    setSelectCity(city.name);
                                                    onSelectCity(city.name, city.code);  // ← 도시명과 코드 모두 전달!
                                                    onClose();
                                                }}
                                             >
                                                 <div className="city-info">
                                                     <span className="city-name">{city.name}</span>
                                                     <span className="city-code">{city.code}</span>
                                                 </div>
                                                 <div 
                                                     className="favorite-btn"
                                                     onClick={(e) => {
                                                         e.stopPropagation();
                                                         console.log('Toggle favorite:', city.name);
                                                     }}
                                                 >
                                                     <Star size={16} />
                                                 </div>
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