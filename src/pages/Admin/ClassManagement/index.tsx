import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import { getAllClassList, getAdminDeleteClass } from '~/repositories/class';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

const CensorDocumentUI: React.FC = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const pageSize = 5;

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const classList = await getAllClassList();
            setClasses(classList);
        } catch (error) {
            console.error('Không thể lấy danh sách lớp học:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleDeleteClass = async (record: any) => {
        try {
            Modal.confirm({
                title: 'Xác nhận xóa lớp',
                content: 'Bạn có chắc chắn muốn xóa lớp học này?',
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: async () => {
                    await getAdminDeleteClass(record._id);

                    await fetchClasses();
                },
                onCancel: () => {
                    console.log('Từ chối hủy bỏ');
                },
            });
        } catch (error) {
            toast.error('Không thể xóa lớp học');
            console.error('Không thể xóa lớp học:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'Tên lớp',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Mã lớp',
            dataIndex: 'code',
            key: 'code',
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
            title: 'Tên giáo viên',
            dataIndex: 'teacher_info',
            key: 'teacher_name',
            render: (teacher_info: any) => {
                return teacher_info && teacher_info[0] ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={teacher_info[0].avatar || 'https://via.placeholder.com/50'}
                            alt="avatar"
                            style={{ borderRadius: '50%', width: 30, height: 30, marginRight: 8 }}
                        />
                        <span>{teacher_info[0].name}</span>
                    </div>
                ) : (
                    <span>Chưa có thông tin</span>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: string, record: any) => (
                <Space>
                    <Button type="primary" danger onClick={() => handleDeleteClass(record)}>
                        Xóa lớp học
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className={styles.table}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={classes}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        current: currentPage,
                        pageSize,
                        total: totalItems,
                        onChange: handlePageChange,
                        showSizeChanger: false, // Tắt thay đổi kích thước trang
                        showTotal: (total) => `Tổng cộng ${total} lớp học`, // Hiển thị tổng số lớp học
                    }}
                />
            </div>
        </>
    );
};

export default CensorDocumentUI;
