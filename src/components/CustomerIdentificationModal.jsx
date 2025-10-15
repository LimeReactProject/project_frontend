import React from 'react';
import { X } from 'lucide-react';
import styles from './CustomerIdentificationModal.module.css';

function CustomerIdentificationModal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-container']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['modal-header']}>
                    <h2 className={styles['modal-title']}>고객 확인서</h2>
                    <button className={styles['close-button']} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles['modal-content']}>
                    {/* 비정상 운항 정보 */}
                    <div className={styles['disruption-section']}>
                        <h3 className={styles['section-title']}>고객 확인서</h3>
                        <div className={styles['info-table']}>
                            <div className={styles['info-row']}>
                                <div className={styles['info-label']}>비정상 운항 종류</div>
                                <div className={styles['info-value']}>비운항</div>
                            </div>
                            <div className={styles['info-row']}>
                                <div className={styles['info-label']}>비정상 운항 사유</div>
                                <div className={styles['info-value']}>{data.disruptionReason || '기상상황'}</div>
                            </div>
                        </div>
                    </div>

                    {/* 스케줄 변경 사항 */}
                    <div className={styles['schedule-section']}>
                        <h3 className={styles['section-title']}>스케줄 변경 사항</h3>
                        <div className={styles['schedule-table']}>
                            <div className={styles['table-header']}>
                                <div className={styles['header-cell']}>구분</div>
                                <div className={styles['header-cell']}>변경 전</div>
                                <div className={styles['header-cell']}>변경 후</div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>항공편</div>
                                <div className={styles['row-value']}>{data.flightCode}</div>
                                <div className={styles['row-value']}>{data.flightCode}</div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>출발지</div>
                                <div className={styles['row-value']}>{data.departureCode}</div>
                                <div className={styles['row-value']}>{data.departureCode}</div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>출발일</div>
                                <div className={styles['row-value']}>
                                    {data.departureTime ? data.departureTime.substring(0,10): '-'}
                                    </div>
                                <div className={styles['row-value']}>
                                    {data.actualDepartureTime ? data.actualDepartureTime.substring(0,10): '-'}
                                    </div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>출발시간</div>
                                <div className={styles['row-value']}>
                                    {data.departureTime ? data.departureTime.split(' ')[1].substring(0, 5) : '-'}
                                </div>
                                <div className={styles['row-value']}>
                                    {data.actualDepartureTime ? data.actualDepartureTime.split('T')[1].substring(0, 5) : '-'}
                                </div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>도착지</div>
                                <div className={styles['row-value']}>{data.arrivalCode}</div>
                                <div className={styles['row-value']}>{data.arrivalCode}</div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>도착일</div>
                                <div className={styles['row-value']}>{data.arrivalTime ? data.arrivalTime.substring(0,10):'-'}</div>
                                <div className={styles['row-value']}>{data.actualArrivalTime ? data.actualArrivalTime.substring(0,10):'-'}</div>
                            </div>
                            <div className={styles['table-row']}>
                                <div className={styles['row-label']}>도착시간</div>
                                <div className={styles['row-value']}>
                                    {data.arrivalTime ? data.arrivalTime.split(' ')[1].substring(0, 5) : '-'}
                                </div>
                                <div className={styles['row-value']}>
                                    {data.actualArrivalTime ? data.actualArrivalTime.split('T')[1].substring(0, 5) : '-'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 면책 조항 */}
                    <div className={styles['disclaimer']}>
                        <p>제주항공은 위와 같은 사실이 발생하였음을 확인합니다.</p>
                        <p>본 확인서 발급 사실만으로 제주항공의 책임이 인정되는 것은 아니며, 어떠한 법적 효력도 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerIdentificationModal;
