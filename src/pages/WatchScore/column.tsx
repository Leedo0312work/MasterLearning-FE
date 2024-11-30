// export const columnsWatchScore = [
//     {
//         title: 'Họ tên',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Ngày làm',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Điểm',
//         dataIndex: 'address',
//         key: 'address',
//     },
// ];

import { string32 } from 'pdfjs-dist/types/src/shared/util';
import { PointType } from '.';

export const columnsWatchScore = [
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: string) => (
            <img src={text} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        ),
    },
    {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ngày làm',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Phương thức lấy điểm',
        dataIndex: 'type',
        key: 'type',
        render: (type: string) => {
            if (type == String(PointType.First)) {
                return <span>Lấy điểm lần đầu tiên</span>;
            } else if (type == String(PointType.Last)) {
                return <span>Lấy điểm lần cuối cùng</span>;
            } else {
                return <span>Lấy điểm lần cao nhất</span>;
            }
        },
    },
    {
        title: 'Điểm',
        dataIndex: 'point',
        key: 'point',
    },
];
