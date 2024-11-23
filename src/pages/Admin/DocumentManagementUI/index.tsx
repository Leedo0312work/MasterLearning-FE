import React, { useState } from 'react';
import { CheckCircleOutlined } from '@mui/icons-material';
import { Button } from 'antd';
import DocumentLessonManager from '../LessonDocumentManagement';

import DetailModal from '../LessonDocumentSidebarRight/DetailModal';
import { getClassById } from '~/repositories/class';

const CensorDocumentUI: React.FC = () => {
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [classData, setClassData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Tên tài liệu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: string) => {
                const date = new Date(created_at);
                return new Intl.DateTimeFormat('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(date);
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'censored',
            key: 'censored',
            render: (censored: boolean) => (
                <span style={{ color: censored ? 'green' : 'red' }}>
                    {censored ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: string, record: any) => (
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleViewDetail(record)}
                >
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const handleViewDetail = async (record: any) => {
        try {
            const classInfo = await getClassById(record.class_id);

            setSelectedRecord(record);
            setClassData(classInfo);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin lớp:', error);
            alert('Không thể lấy thông tin lớp.');
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
        setClassData(null);
    };

    return (
        <>
            <DocumentLessonManager title="Quản lý tài liệu" type={0} columns={columns} />

            <DetailModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                censorData={selectedRecord}
                classData={classData}
                mode="view-only"
            />
        </>
    );
};

export default CensorDocumentUI;
