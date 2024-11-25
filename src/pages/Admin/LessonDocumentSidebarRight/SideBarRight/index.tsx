import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import RightSiderbarItem from '../SiderbarItemRight';

interface SiderbarRightProps {
    dataNotCensor: any[];
    onReject: (lessonId: string) => void;
    onApprove: (lessonId: string) => void;
}

const SiderbarRight: React.FC<SiderbarRightProps> = ({ dataNotCensor, onReject, onApprove }) => {
    console.log('dataNotCensor: ', dataNotCensor);
    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.header}>Chờ duyệt ({dataNotCensor?.length})</div>
                {dataNotCensor.length > 0 ? (
                    <div className={styles.info}>
                        <div className={styles.listUser}>
                            {dataNotCensor.map((item) => (
                                <RightSiderbarItem
                                    key={item._id}
                                    name={item.name}
                                    classId={item.class_id}
                                    censorData={item}
                                    onReject={() => onReject(item._id)}
                                    onApprove={() => onApprove(item._id)}
                                    mode="approval"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.noStudent}>
                        Yêu cầu duyệt sẽ được hiển thị khi có tài liệu hoặc bài giảng được tải lên
                    </div>
                )}
            </div>
        </div>
    );
};

SiderbarRight.propTypes = {
    dataNotCensor: PropTypes.array.isRequired,
    onReject: PropTypes.func.isRequired,
};

export default SiderbarRight;
