import React from 'react';
import { Modal, Button, Avatar, Typography } from 'antd';
import PropTypes from 'prop-types';
import VideoHLS from '~/utils/media/videoHLS';
// import styles from './DetailModal.module.css';

interface DetailModalProps {
    visible: boolean;
    onClose: () => void;
    censorData: any;
    classData: any;
    mode: 'approval' | 'view-only';
    onApprove?: () => void;
    onReject?: () => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    });
};

const DetailModal: React.FC<DetailModalProps> = ({
    visible,
    onClose,
    censorData,
    classData,
    mode,
    onApprove,
    onReject,
}) => {
    return (
        <Modal
            centered
            title="Thông tin chi tiết"
            visible={visible}
            onCancel={onClose}
            width={800}
            footer={
                mode === 'approval'
                    ? [
                          <Button key="reject" onClick={onReject}>
                              Từ chối
                          </Button>,
                          <Button key="approve" type="primary" onClick={onApprove}>
                              Duyệt
                          </Button>,
                      ]
                    : [
                          <Button key="close" onClick={onClose}>
                              Đóng
                          </Button>,
                      ]
            }
        >
            {censorData && classData && (
                <div>
                    <Typography.Text strong>
                        {censorData?.type == 0 ? 'Tên tài liệu' : 'Tên bài giảng'}:
                    </Typography.Text>{' '}
                    {censorData?.name}
                    <br />
                    <Typography.Text strong>Mô tả: </Typography.Text> {censorData?.description}
                    <br />
                    <Typography.Text strong>Thời gian tạo: </Typography.Text>{' '}
                    {censorData?.created_at ? formatDate(censorData?.created_at) : 'N/A'}
                    <br />
                    {censorData?.censored === true && (
                        <>
                            <Typography.Text strong>Thời gian cập nhật: </Typography.Text>
                            {censorData?.updated_at}
                            <br />
                        </>
                    )}
                    <Typography.Text strong>Trạng thái: </Typography.Text>{' '}
                    {censorData?.censored === true ? 'Đã phê duyệt' : 'Chưa phê duyệt'}
                    <br />
                    <div>
                        <div style={{ width: '100%', height: '50vh' }}>
                            {censorData?.type == 0 ? (
                                <iframe src={censorData?.media?.[0]?.url} title="PDF Viewer" />
                            ) : (
                                <VideoHLS src={censorData?.media?.[0]?.url} />
                            )}
                        </div>
                    </div>
                    <hr />
                    <Typography.Text strong>Tên lớp: </Typography.Text> {classData?.name}
                    <br />
                    <Typography.Text strong>Giáo viên: </Typography.Text>{' '}
                    {classData?.teacher_info?.[0]?.name}
                    <Avatar src={classData?.teacher_info?.[0]?.avatar} />
                    <br />
                    <Typography.Text strong>Loại lớp: </Typography.Text> {classData?.type}
                    <br />
                    <Typography.Text strong>Email: </Typography.Text>{' '}
                    {classData?.teacher_info?.[0]?.email}
                </div>
            )}
        </Modal>
    );
};

DetailModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    censorData: PropTypes.object.isRequired,
    classData: PropTypes.object.isRequired,
    // mode: PropTypes.oneOf(['approval', 'view-only']).isRequired,
    onApprove: PropTypes.func,
    onReject: PropTypes.func,
};

export default DetailModal;
