import React, { useEffect, useState } from 'react';
import DocumentTableContentHeader from '~/components/DocumentTableContentHeader';
import { ILesson } from '~/models/ILesson';
import { censorLesson, getNotCensoredLessons } from '~/repositories/lesson';

import styles from './styles.module.css';
import { ConfirmProvider } from 'material-ui-confirm';
import DocumentTableContentItem from '~/components/DocumentTableContentItem';
import DocumentTableHeader from '~/components/DocumentTableHeader';
import SiderbarRightMember from '~/components/SiderbarRightMember';
import DocumentSiderbarRight from '~/components/DocumentRightSideBar';
import { Button, Table } from 'antd';
import { CheckCircleOutlined } from '@mui/icons-material';

const CensorDocumentUI: React.FC = () => {
    const [lessons, setLessons] = useState<ILesson[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const columns = [
        {
            title: 'Tên tài liệu',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: ILesson) => (
                <div>
                    <div>{record.name}</div>
                </div>
            ),
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Giáo viên',
            dataIndex: 'school',
            key: 'school',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: string, record: ILesson) => (
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    // onClick={() => handleCensor(record.id)}
                >
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    // Lấy danh sách tài liệu chưa kiểm duyệt
    const fetchLessons = async () => {
        setLoading(true);
        try {
            const lessons = await getNotCensoredLessons();
            setLessons(lessons);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.table}>
                    <DocumentTableHeader />
                    <ConfirmProvider>
                        <Table
                            columns={columns}
                            dataSource={lessons}
                            rowKey="id"
                            loading={loading}
                            pagination={false}
                            bordered
                        />
                    </ConfirmProvider>
                </div>
                <DocumentSiderbarRight />
            </div>
        </div>
    );
};

export default CensorDocumentUI;
