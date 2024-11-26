import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Space, Table } from 'antd';
import { Button } from 'antd';
import { ConfirmProvider } from 'material-ui-confirm';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import DocumentTableHeader from '~/components/DocumentTableHeader';
import { censorLesson, getNotCensoredLessons, rejectCensorLesson } from '~/repositories/lesson';
import SiderbarRight from '~/pages/Admin/LessonDocumentSidebarRight/SideBarRight';
import { getClassById } from '~/repositories/class';
import DetailModal from '../LessonDocumentSidebarRight/DetailModal';
import { isNull } from 'lodash';

interface DocumentLessonManagerProps {
    title: string;
    type: number; // 0: tài liệu, 1: bài giảng
    columns: any[];
    // onApprove: (lessonId: string) => void;
    // onReject: (lessonId: string) => void;
    // onViewDetail: (record: any) => void;
}

const DocumentLessonManager: React.FC<DocumentLessonManagerProps> = ({ title, type, columns }) => {
    const [allLesson, setAllLesson] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredLesson, setFilteredLesson] = useState<any[]>([]);
    const [classData, setClassData] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<
        'all' | 'notReviewed' | 'reviewed' | 'rejected'
    >('all');
    const [modeVisible, setModeVisible] = useState<'approval' | 'view-only'>('view-only');

    const fetchDataAsync = async () => {
        setLoading(true);
        try {
            const allLessons = await getNotCensoredLessons(type, true);
            setAllLesson(allLessons);
            setFilteredLesson(allLessons);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAsync();
    }, [type]);

    const handleFilterChange = (filter: 'all' | 'notReviewed' | 'reviewed' | 'rejected') => {
        setCurrentFilter(filter);
        if (filter === 'all') {
            setFilteredLesson(allLesson);
        } else if (filter === 'notReviewed') {
            setFilteredLesson(allLesson.filter((lesson) => lesson.censored === false));
        } else if (filter === 'reviewed') {
            setFilteredLesson(allLesson.filter((lesson) => lesson.censored === true));
        } else {
            setFilteredLesson(allLesson.filter((lesson) => isNull(lesson.censored)));
        }
    };

    const handleViewDetail = async (record: any) => {
        try {
            const classInfo = await getClassById(record.class_id);
            setModeVisible('view-only');
            setSelectedRecord(record);
            setClassData(classInfo);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin lớp:', error);
            alert('Không thể lấy thông tin lớp.');
        }
    };

    const handleApprove = async (record: any) => {
        try {
            const classInfo = await getClassById(record.class_id);
            setSelectedRecord(record);
            setClassData(classInfo);
            setModeVisible('approval');
            setIsModalVisible(true);
        } catch (error) {
            console.error('Lỗi khi kiểm duyệt tài liệu:', error);
            alert('Đã xảy ra lỗi khi kiểm duyệt tài liệu.');
        }
    };

    const handleConfirmApprove = async () => {
        try {
            if (selectedRecord?._id) {
                await censorLesson(selectedRecord._id); // Gọi API kiểm duyệt
                alert(`Tài liệu với ID ${selectedRecord._id} đã được kiểm duyệt.`);
                handleCloseModal();
                await fetchDataAsync(); // Làm mới danh sách
            }
        } catch (error) {
            console.error('Lỗi khi kiểm duyệt tài liệu:', error);
            alert('Đã xảy ra lỗi khi kiểm duyệt tài liệu.');
        }
    };

    const handleReject = async (lessonId: string) => {
        // Hiển thị thông báo xác nhận khi nhấn Từ chối
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: 'Bạn có chắc chắn muốn từ chối phê duyệt tài liệu này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: async () => {
                await rejectCensorLesson(lessonId);
                handleCloseModal();
                await fetchDataAsync();
            },
            onCancel: () => {
                console.log('Từ chối hủy bỏ');
            },
        });
    };

    const handleConfirmReject = async () => {
        try {
            if (selectedRecord?._id) {
                Modal.confirm({
                    title: 'Xác nhận từ chối',
                    content: 'Bạn có chắc chắn muốn từ chối phê duyệt tài liệu này?',
                    okText: 'Xác nhận',
                    cancelText: 'Hủy',
                    onOk: async () => {
                        await rejectCensorLesson(selectedRecord._id);
                        alert(`Tài liệu với ID ${selectedRecord._id} đã bị từ chối.`);
                        handleCloseModal();
                        await fetchDataAsync();
                    },
                    onCancel: () => {
                        console.log('Từ chối hủy bỏ');
                    },
                });
            }
        } catch (error) {
            console.error('Lỗi khi từ chối tài liệu:', error);
            alert('Đã xảy ra lỗi khi từ chối tài liệu.');
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
        setClassData(null);
    };

    const total = allLesson.length;
    const notReviewed = allLesson.filter((lesson) => lesson.censored === false).length;
    const reviewed = allLesson.filter((lesson) => lesson.censored === true).length;
    const rejected = total - (notReviewed + reviewed);

    const actionColumns = [
        ...columns,
        {
            title: 'Hành động',
            key: 'action',
            render: (text: string, record: any) => (
                <Space>
                    <Button type="default" onClick={() => handleViewDetail(record)}>
                        Xem chi tiết
                    </Button>
                    {record.censored !== null && (
                        <Button type="dashed" onClick={() => handleReject(record._id)}>
                            Từ chối
                        </Button>
                    )}
                    {record.censored === false && (
                        <Button type="primary" onClick={() => handleApprove(record)}>
                            Kiểm duyệt
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.table}>
                    <DocumentTableHeader
                        type={type}
                        total={total}
                        notReviewed={notReviewed}
                        reviewed={reviewed}
                        rejected={rejected}
                        onFilterChange={handleFilterChange}
                    />
                    <ConfirmProvider>
                        <Table
                            columns={actionColumns}
                            dataSource={filteredLesson}
                            rowKey="_id"
                            loading={loading}
                            pagination={false}
                            bordered
                        />
                    </ConfirmProvider>

                    <DetailModal
                        visible={isModalVisible}
                        onClose={handleCloseModal}
                        censorData={selectedRecord}
                        classData={classData}
                        mode={modeVisible}
                        onApprove={handleConfirmApprove}
                        onReject={handleConfirmReject}
                    />
                </div>
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
