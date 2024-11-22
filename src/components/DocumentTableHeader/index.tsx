import { Input, Button } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { memo } from 'react';

import styles from './styles.module.css';

function DocumentTableHeader() {
    return (
        <div className={styles.table}>
            <div className={styles.table_header}>
                <div className={styles.table_header_left_1}>
                    <div className={styles.table_header_left_text}>Tổng tài liệu</div>
                </div>

                <div className={styles.table_header_left}>
                    <div className={styles.table_header_left_text}>Chưa kiểm duyệt</div>
                </div>

                <div className={styles.table_header_left}>
                    <div className={styles.table_header_left_text}>Đã kiểm duyệt</div>
                </div>

                <div className={styles.table_header_mid}>
                    <Input
                        placeholder="Nhập và nhấn enter để tìm kiếm tài liệu"
                        allowClear
                        size="large"
                        suffix={<SearchOutlined />}
                    />
                </div>
            </div>
        </div>
    );
}

DocumentTableHeader.propTypes = {
    handleOpenAddModal: PropTypes.func,
};

export default memo(DocumentTableHeader);
