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
        title: 'Điểm',
        dataIndex: 'point',
        key: 'point',
    },
];
