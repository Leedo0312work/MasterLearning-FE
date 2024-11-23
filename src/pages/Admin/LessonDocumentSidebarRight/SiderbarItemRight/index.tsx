import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Avatar, Typography } from 'antd'; // Import các thành phần từ antd
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { getClassById } from '~/repositories/class';
import styles from './styles.module.css';
import { censorLesson } from '~/repositories/lesson';
import DetailModal from '../DetailModal';

interface RightSiderbarItemProps {
    name: string;
    classId: string;
    censorData: any;
    onReject: () => void;
    onApprove: () => void;
    mode: 'approval' | 'view-only';
}

function RightSiderbarItem({
    name,
    classId,
    censorData,
    onReject,
    onApprove,
    mode,
}: RightSiderbarItemProps) {
    const [data, setData] = useState<any>();
    const [openModal, setOpenModal] = useState(false);

    const fetchClass = async () => {
        try {
            const res = await getClassById(classId);
            setData(res);
        } catch (error) {
            console.error('Đã xảy ra lỗi, vui lòng thử lại sau.', error);
        }
    };

    useEffect(() => {
        fetchClass();
    }, []);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    console.log('censorData', censorData);

    const handleReject = () => {
        // Hiển thị thông báo xác nhận khi nhấn Từ chối
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: 'Bạn có chắc chắn muốn từ chối phê duyệt tài liệu này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: () => {
                onReject();
                handleCloseModal();
            },
            onCancel: () => {
                console.log('Từ chối hủy bỏ');
            },
        });
    };

    const handleApprove = () => {
        onApprove();
        handleCloseModal();
    };

    return (
        <div className={styles.user_wrap}>
            <div className={styles.user}>
                <div>
                    <DocumentScannerIcon />
                </div>
                <div>
                    <div className={styles.name}>Tên: {name}</div>
                    <div className={styles.name}>Lớp: {data?.name}</div>
                    <div className={styles.name}>Giáo viên: {data?.teacher_info[0].name}</div>
                </div>
            </div>
            <div className={styles.action}>
                <Button type="primary" onClick={handleOpenModal} className={styles.accept}>
                    Phê duyệt
                </Button>
            </div>

            <DetailModal
                visible={openModal}
                onClose={handleCloseModal}
                censorData={censorData}
                classData={data}
                mode={mode}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
}

RightSiderbarItem.propTypes = {
    name: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
    censorData: PropTypes.object.isRequired,
    onReject: PropTypes.func,
    mode: PropTypes.oneOf(['approval', 'view-only']).isRequired,
};

export default RightSiderbarItem;
