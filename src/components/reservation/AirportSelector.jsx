import React, { useState, useMemo } from 'react';
import './AirportSelector.css';
import { Search } from 'lucide-react';

const AIRPORT_GROUPS = {
  국내: [
    { code: 'ICN', city: '서울', name: '인천', fullName: '인천국제공항' },
    { code: 'GMP', city: '서울', name: '김포', fullName: '김포공항' },
    { code: 'CJU', city: '제주', name: '제주', fullName: '제주국제공항' },
    { code: 'PUS', city: '부산', name: '김해', fullName: '김해국제공항' },
    { code: 'TAE', city: '대구', name: '대구', fullName: '대구국제공항' },
    { code: 'KWJ', city: '광주', name: '광주', fullName: '광주공항' },
    { code: 'YNY', city: '양양', name: '양양', fullName: '양양국제공항' },
    { code: 'USN', city: '울산', name: '울산', fullName: '울산공항' },
    { code: 'RSU', city: '여수', name: '여수', fullName: '여수공항' },
  ],
  일본: [
    { code: 'NRT', city: '도쿄', name: '나리타', fullName: '나리타국제공항' },
    { code: 'HND', city: '도쿄', name: '하네다', fullName: '하네다공항' },
    { code: 'KIX', city: '오사카', name: '간사이', fullName: '간사이국제공항' },
    { code: 'FUK', city: '후쿠오카', name: '후쿠오카', fullName: '후쿠오카공항' },
    { code: 'CTS', city: '삿포로', name: '신치토세', fullName: '신치토세공항' },
    { code: 'OKA', city: '오키나와', name: '나하', fullName: '나하공항' },
  ],
  중국: [
    { code: 'PVG', city: '상하이', name: '푸동', fullName: '상하이푸동국제공항' },
    { code: 'PEK', city: '베이징', name: '수도', fullName: '베이징수도국제공항' },
    { code: 'CAN', city: '광저우', name: '바이윈', fullName: '광저우바이윈국제공항' },
    { code: 'SZX', city: '선전', name: '선전', fullName: '선전바오안국제공항' },
  ],
  동남아: [
    { code: 'BKK', city: '방콕', name: '수완나품', fullName: '수완나품국제공항' },
    { code: 'SIN', city: '싱가포르', name: '창이', fullName: '창이국제공항' },
    { code: 'KUL', city: '쿠알라룸푸르', name: 'KLIA', fullName: '쿠알라룸푸르국제공항' },
    { code: 'MNL', city: '마닐라', name: '니노이', fullName: '니노이아키노국제공항' },
    { code: 'CEB', city: '세부', name: '막탄', fullName: '막탄-세부국제공항' },
  ],
};

function AirportSelector({ type, onSelect, onClose }) {
  const [keyword, setKeyword] = useState('');
  const [regionTab, setRegionTab] = useState('국내');

  const filtered = useMemo(() => {
    const list = AIRPORT_GROUPS[regionTab] || [];
    if (!keyword.trim()) return list;
    const k = keyword.toLowerCase();
    return list.filter(a =>
      a.code.toLowerCase().includes(k) ||
      a.city.toLowerCase().includes(k) ||
      a.name.toLowerCase().includes(k) ||
      a.fullName.toLowerCase().includes(k)
    );
  }, [keyword, regionTab]);

  return (
    <div className="airport-selector-wrap">
      <div className="selector-header">
        <div className="title">
          {type === 'departure' ? '출발지 선택' : '도착지 선택'}
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
            {Object.keys(AIRPORT_GROUPS).map(tab => (
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
                  <div className="line2">{ap.fullName}</div>
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
