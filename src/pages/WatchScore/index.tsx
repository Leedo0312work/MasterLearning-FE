import { DownloadOutlined, SearchOutlined } from '@mui/icons-material';
import { Button, DatePicker, Form, Input, Table } from 'antd';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import SidebarClass from '~/components/SidebarClass';
import { SearchMark } from '~/models/IExercise';
import { getMarkExercisesByTeacher } from '~/repositories/exercise';
import { columnsWatchScore } from './column';
import styles from './styles.module.css';
// Các import khác...
interface DataCol {
    point: number;
    name: string;
    time: Date;
    avatar: string;
}
export enum PointType {
    First,
    Last,
    Highest,
}
interface DataCol2 {
    point: number;
    name: any;
    time: string;
    avatar: any;
    type: any;
}
[];
function WatchScore() {
    const [dataSource, setDataSource] = useState<DataCol2[] | undefined>([]);
    const { id }: any = useParams();
    const [form] = Form.useForm();

    // Hàm renderData
    const renderData = (result: any[]) => {
        return result.map((item) => ({
            point: parseFloat(item.point.toFixed(2)),
            name: item.user_info.name,
            time: moment(item.created_at).format('DD/MM/YYYY HH:mm'),
            avatar: item.user_info.avatar,
            type: item.point_type,
        }));
    };

    // Hàm fetchData
    const fetchData = async (id: string, searchField?: SearchMark) => {
        const res = await getMarkExercisesByTeacher(id, searchField);
        const data = renderData(res);
        setDataSource(data);
    };

    // Xuất file Excel
    const exportToExcel = () => {
        if (!dataSource || dataSource.length === 0) {
            console.error('No data to export!');
            return;
        }

        // Chuẩn bị dữ liệu
        const excelData = dataSource.map((item: any) => {
            var loai: string = '';
            if (item.type == String(PointType.First)) {
                loai = 'Lấy điểm lần đầu tiên';
            } else if (item.type == String(PointType.Last)) {
                loai = 'Lấy điểm lần cuối cùng';
            } else {
                loai = 'Lấy điểm lần cao nhất';
            }
            return {
                Điểm: item.point,
                Tên: item.name,
                'Ngày làm': item.time,
                Loại: loai,
            };
        });

        // Tạo worksheet và workbook
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bảng điểm');

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'BangDiem.xlsx');
    };

    // Fetch dữ liệu ban đầu
    useEffect(() => {
        fetchData(id);
    }, [id]);
    function removeVietnameseAccents(str: string): string {
        return str
            .normalize('NFD') // Tách các ký tự gốc và dấu
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ tất cả các dấu
            .replace(/đ/g, 'd') // Thay thế 'đ' thành 'd'
            .replace(/Đ/g, 'D') // Thay thế 'Đ' thành 'D'
            .toLowerCase(); // Chuyển thành chữ thường
    }
    const handleSubmit = async () => {
        const dataForm = await form.validateFields();
        console.log('data form', dataForm);
        if (dataForm.name) {
            dataForm.name = removeVietnameseAccents(dataForm.name);
        }
        console.log('data form2', dataForm);
        fetchData(id, dataForm);
    };

    return (
        <div>
            <SidebarClass />
            <div>
                <h2 style={{ fontWeight: 400, marginLeft: 20 }}>Bảng Điểm</h2>
                <div style={{ marginLeft: 20, marginBottom: 16 }}>
                    <h4 style={{ fontWeight: 400 }}>Tìm kiếm</h4>
                    <div className="form-search">
                        <Form
                            form={form}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                gap: '16px',
                            }}
                        >
                            <Form.Item
                                className={styles.custom_label}
                                label="Tên :"
                                name="name"
                                style={{ fontSize: 1 }}
                            >
                                <Input
                                    name="name"
                                    style={{ width: '200px', marginRight: 16 }}
                                    placeholder="Nhập tên muốn tìm kiếm"
                                />
                            </Form.Item>
                            {/* <Form.Item labelclassName={styles.custom_label} label="Điểm :" name="point" style={{ fontSize: 1 }}>
                                <Input
                                    name="point"
                                    style={{ width: '200px', marginRight: 16 }}
                                    placeholder="Nhập điểm muốn tìm kiếm"
                                />
                            </Form.Item> */}
                            <Form.Item
                                className={styles.custom_label}
                                label="Ngày làm :"
                                name="date"
                                style={{ fontSize: 1 }}
                            >
                                <DatePicker
                                    name="date"
                                    style={{ width: '200px', marginRight: 16 }}
                                />
                            </Form.Item>

                            <Button
                                style={{ marginLeft: 16, display: 'flex', alignItems: 'center' }}
                                type="primary"
                                onClick={handleSubmit}
                                className="btn btn-success"
                            >
                                <span>Tìm kiếm</span>
                                <SearchOutlined />
                            </Button>
                            <Button
                                style={{ marginLeft: 16, display: 'flex', alignItems: 'center' }}
                                type="primary"
                                onClick={exportToExcel}
                                className="btn btn-success"
                            >
                                <span>Xuất file Excel</span>
                                <DownloadOutlined />
                            </Button>
                        </Form>
                    </div>
                </div>
                <Table
                    style={{ padding: 20 }}
                    dataSource={dataSource}
                    columns={columnsWatchScore}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
}

export default WatchScore;
