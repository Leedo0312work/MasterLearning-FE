import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { reject } from 'lodash';

interface DocumentTableHeaderProps {
    type: number; // 0: tài liệu, 1: bài giảng
    total: number;
    notReviewed: number;
    reviewed: number;
    rejected: number;
    onFilterChange: (filter: 'all' | 'notReviewed' | 'reviewed' | 'rejected') => void;
}

const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
    type,
    total,
    notReviewed,
    reviewed,
    rejected,
    onFilterChange,
}) => {
    return (
        <div className={styles.table}>
            <div className={styles.table_header}>
                <div onClick={() => onFilterChange('all')} className={styles.table_header_left_1}>
                    <div className={styles.table_header_left_text}>
                        {type === 0 ? 'Tổng tài liệu' : 'Tổng bài giảng'}: {total}
                    </div>
                </div>

                <div
                    onClick={() => onFilterChange('notReviewed')}
                    className={styles.table_header_left}
                >
                    <div className={styles.table_header_left_text}>
                        Chưa kiểm duyệt: {notReviewed}
                    </div>
                </div>

                <div
                    onClick={() => onFilterChange('reviewed')}
                    className={styles.table_header_left}
                >
                    <div className={styles.table_header_left_text}>Đã kiểm duyệt: {reviewed}</div>
                </div>

                <div
                    onClick={() => onFilterChange('rejected')}
                    className={styles.table_header_left}
                >
                    <div className={styles.table_header_left_text}>Đã từ chối: {rejected}</div>
                </div>

                <div className={styles.table_header_mid}>
                    <Input
                        placeholder={`Nhập và nhấn enter để tìm kiếm ${
                            type === 0 ? 'tài liệu' : 'bài giảng'
                        }`}
                        allowClear
                        size="large"
                        suffix={<SearchOutlined />}
                        width="50px"
                    />
                </div>
            </div>
        </div>
    );
};

DocumentTableHeader.propTypes = {
    type: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    notReviewed: PropTypes.number.isRequired,
    reviewed: PropTypes.number.isRequired,
};

export default React.memo(DocumentTableHeader);
