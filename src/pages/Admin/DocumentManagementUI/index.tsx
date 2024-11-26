import React from 'react';

import DocumentLessonManager from '../LessonDocumentManagement';

const CensorDocumentUI: React.FC = () => {
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
            render: (censored: boolean | null) => {
                let text = '';
                let color = '';

                if (censored === true) {
                    text = 'Đã kiểm duyệt';
                    color = 'green';
                } else if (censored === false) {
                    text = 'Chưa kiểm duyệt';
                    color = 'red';
                } else if (censored === null) {
                    text = 'Từ chối';
                    color = 'gray';
                }

                return <span style={{ color }}>{text}</span>;
            },
        },
    ];

    return (
        <>
            <DocumentLessonManager title="Quản lý tài liệu" type={0} columns={columns} />
        </>
    );
};

export default CensorDocumentUI;
