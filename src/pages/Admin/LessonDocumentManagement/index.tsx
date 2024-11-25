import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ConfirmProvider } from 'material-ui-confirm';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import DocumentTableHeader from '~/components/DocumentTableHeader';
import { censorLesson, getNotCensoredLessons } from '~/repositories/lesson';
import SiderbarRight from '~/pages/Admin/LessonDocumentSidebarRight/SideBarRight';

interface DocumentLessonManagerProps {
    title: string;
    type: number; // 0: tài liệu, 1: bài giảng
    columns: any[];
}

const DocumentLessonManager: React.FC<DocumentLessonManagerProps> = ({ title, type, columns }) => {
    const [allLesson, setAllLesson] = useState<any[]>([]);
    const [dataNotCensor, setDataNotCensor] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    const fetchDataAsync = async () => {
        setLoading(true);
        try {
            const allLessons = await getNotCensoredLessons(type, true);
            setAllLesson(allLessons);

            const notCensored = await getNotCensoredLessons(type, false);
            setDataNotCensor(notCensored);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAsync();
    }, [type]);

    console.log('allLesson: ', allLesson);
    console.log('dataNotCensor: ', dataNotCensor);

    const handleReject = async (lessonId: string) => {
        try {
            alert(`Tài liệu với ID ${lessonId} đã bị từ chối.`);
            await fetchDataAsync();
        } catch (error) {
            console.error('Lỗi khi từ chối tài liệu:', error);
            alert('Đã xảy ra lỗi khi từ chối tài liệu.');
        }
    };

    const handleApprove = async (lessonId: string) => {
        try {
            await censorLesson(lessonId); // Gọi API kiểm duyệt
            alert(`Tài liệu với ID ${lessonId} đã được kiểm duyệt.`);
            await fetchDataAsync(); // Reload dữ liệu sau khi kiểm duyệt
        } catch (error) {
            console.error('Lỗi khi kiểm duyệt tài liệu:', error);
            alert('Đã xảy ra lỗi khi kiểm duyệt tài liệu.');
        }
    };

    const total = allLesson.length;
    const notReviewed = dataNotCensor.length;
    const reviewed = total - notReviewed;

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.table}>
                    <DocumentTableHeader
                        type={type}
                        total={total}
                        notReviewed={notReviewed}
                        reviewed={reviewed}
                    />
                    <ConfirmProvider>
                        <Table
                            columns={columns}
                            dataSource={allLesson}
                            rowKey="id"
                            loading={loading}
                            pagination={false}
                            bordered
                        />
                    </ConfirmProvider>
                </div>
                <SiderbarRight
                    dataNotCensor={dataNotCensor}
                    onReject={handleReject}
                    onApprove={handleApprove}
                />
            </div>
        </div>
    );
};

DocumentLessonManager.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired,
};

export default DocumentLessonManager;
