import React, { useState, useMemo, useEffect } from 'react';
import './AirportSelector.css';
import { Search } from 'lucide-react';

function AirportSelector({ type, onSelect, onClose, selectedAirports }) {
  const [keyword, setKeyword] = useState('');
  const [regionTab, setRegionTab] = useState('대한민국');
  const [airports, setAirports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log(selectedAirports); // 전달받은거 테스트용

  // API에서 공항 데이터 가져오기
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/airports');
        if (!response.ok) {
          throw new Error('공항 데이터를 불러오는데 실패했습니다.');
        }
        const airportData = await response.json();
        
        // 국가별로 공항 데이터 그룹화
        const groupedAirports = airportData.reduce((acc, airport) => {
          const country = airport.country || '기타';
          if (!acc[country]) {
            acc[country] = [];
          }
          acc[country].push({
            code: airport.airportCode,
            city: airport.airportName.split('(')[0]?.trim() || airport.airportName,
            name: airport.airportName.includes('(') 
              ? airport.airportName.split('(')[1]?.replace(')', '').trim() 
              : airport.airportName,
            fullName: airport.airportName
          });
          return acc;
        }, {});
        
        setAirports(groupedAirports);
        
        // 대한민국을 기본 탭으로 설정, 없으면 첫 번째 지역
        if (groupedAirports['대한민국']) {
          setRegionTab('대한민국');
        } else {
          const firstRegion = Object.keys(groupedAirports)[0];
          if (firstRegion) {
            setRegionTab(firstRegion);
          }
        }
        
      } catch (err) {
        setError(err.message);
        console.error('공항 데이터 로딩 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  const filtered = useMemo(() => {
    const list = airports[regionTab] || [];
    
    // 이미 선택된 공항 코드들 수집
    let excludeCodes = [];
    
    if (type === 'departure' || type === 'arrival') {
      // 첫 번째 구간 (왕복/편도)
      if (type === 'departure' && selectedAirports?.arrival?.code) {
        excludeCodes.push(selectedAirports.arrival.code);
      } else if (type === 'arrival' && selectedAirports?.departure?.code) {
        excludeCodes.push(selectedAirports.departure.code);
      }
    } else if (type === 'departure2' || type === 'arrival2') {
      // 두 번째 구간 (다구간)
      if (type === 'departure2' && selectedAirports?.arrival2?.code) {
        excludeCodes.push(selectedAirports.arrival2.code);
      } else if (type === 'arrival2' && selectedAirports?.departure2?.code) {
        excludeCodes.push(selectedAirports.departure2.code);
      }
    }
    
    // 제외할 공항들을 필터링
    let filteredList = list.filter(airport => !excludeCodes.includes(airport.code));
    
    // 키워드 검색 적용
    if (keyword.trim()) {
      const k = keyword.toLowerCase();
      filteredList = filteredList.filter(a =>
        a.code.toLowerCase().includes(k) ||
        a.city.toLowerCase().includes(k) ||
        a.name.toLowerCase().includes(k) ||
        a.fullName.toLowerCase().includes(k)
      );
    }
    
    return filteredList;
  }, [keyword, regionTab, airports, selectedAirports, type]);

  if (loading) {
    return (
      <div className="airport-selector-wrap">
        <div className="selector-header">
          <div className="title">
            {type === 'departure' || type === 'departure2' ? '출발지 선택' : '도착지 선택'}
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="loading-message" style={{padding: '40px', textAlign: 'center'}}>
          공항 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="airport-selector-wrap">
        <div className="selector-header">
          <div className="title">
            {type === 'departure' || type === 'departure2' ? '출발지 선택' : '도착지 선택'}
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="error-message" style={{padding: '40px', textAlign: 'center', color: 'red'}}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="airport-selector-wrap">
      <div className="selector-header">
        <div className="title">
          {type === 'departure' || type === 'departure2' ? '출발지 선택' : '도착지 선택'}
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="selector-search">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="어디로 여행가세요?"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="selector-tabs">
        <button className="category-btn active">최근 검색</button>
        <button className="category-btn">즐겨찾기</button>
      </div>

      <div className="selector-content">
        <div className="selector-left">
          <ul className="region-tabs">
            {Object.keys(airports).map(tab => (
              <li key={tab} className="region-tab">
                <button
                  className={`tab-btn ${regionTab === tab ? 'active' : ''}`}
                  onClick={() => setRegionTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="selector-right">
          <div className="airport-list">
            {filtered.map(ap => (
              <div
                key={ap.code}
                className="airport-row"
                onClick={() => { onSelect(ap, type); onClose(); }}
              >
                <div className="code">{ap.code}</div>
                <div className="info">
                  <div className="line1">{ap.city}({ap.name})</div>
                  <div className="line2">{ap.city}</div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="no-result">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirportSelector;