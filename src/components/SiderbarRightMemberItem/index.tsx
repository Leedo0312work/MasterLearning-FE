import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Avatar, Typography } from 'antd'; // Import các thành phần từ antd
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { getClassById } from '~/repositories/class';
import styles from './styles.module.css';
import { censorLesson } from '~/repositories/lesson';

function DocumentSiderbarRightItem({ name, classId, censorData, onReject }) {
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

    const handleCensor = async () => {
        console.log('id censor: ', censorData.id);
        // try {
        //     await censorLesson(censorData.id);
        //     alert('Tài liệu đã được kiểm duyệt.');
        //     handleCloseModal();
        // } catch (error) {
        //     console.error('Lỗi khi kiểm duyệt tài liệu:', error);
        //     alert('Đã xảy ra lỗi khi kiểm duyệt tài liệu.');
        // }
    };

    console.log('censorData', censorData);

    const handleReject = () => {
        // Hiển thị thông báo xác nhận khi nhấn Từ chối
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: 'Bạn có chắc chắn muốn từ chối phê duyệt tài liệu này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: () => {
                onReject(censorData.id);
                handleCloseModal();
            },
            onCancel: () => {
                console.log('Từ chối hủy bỏ');
            },
        });
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

            {/* Modal hiển thị thông tin chi tiết */}
            <Modal
                title="Thông tin tài liệu"
                visible={openModal}
                onCancel={handleCloseModal}
                width={800}
                footer={[
                    <Button key="reject" onClick={handleReject}>
                        Từ chối
                    </Button>,
                    <Button key="approve" type="primary" onClick={handleCensor}>
                        Duyệt
                    </Button>,
                ]}
            >
                {censorData && (
                    <div className={styles.modalBody}>
                        {/* Hiển thị dữ liệu được chọn */}
                        <Typography.Text strong>Tên tài liệu:</Typography.Text> {censorData?.name}
                        <br />
                        <Typography.Text strong>Mô tả:</Typography.Text> {censorData?.description}
                        <br />
                        <Typography.Text strong>Thời gian tạo:</Typography.Text>{' '}
                        {censorData?.created_at}
                        <br />
                        <div>
                            <Typography.Text strong>Media:</Typography.Text>
                            <div style={{ width: '100%', height: '50vh' }}>
                                <iframe
                                    src={censorData?.media[0]?.url}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                    title="PDF Viewer"
                                />
                            </div>
                        </div>
                        {/* Hiển thị thông tin lớp và giáo viên từ `data` */}
                        <Typography.Text strong>Loại:</Typography.Text> {data?.name}
                        <br />
                        <Typography.Text strong>Giáo viên:</Typography.Text>{' '}
                        {data?.teacher_info[0]?.name}
                        <Avatar src={data?.teacher_info[0]?.avatar} />
                        <br />
                        <Typography.Text strong>Loại lớp:</Typography.Text> {data?.type}
                        <br />
                        <div>
                            <Typography.Text strong>Email:</Typography.Text>{' '}
                            {data?.teacher_info[0]?.email}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

DocumentSiderbarRightItem.propTypes = {
    name: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
    censorData: PropTypes.object.isRequired,
    onReject: PropTypes.func.isRequired,
};

export default DocumentSiderbarRightItem;
