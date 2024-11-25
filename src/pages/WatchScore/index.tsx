import SidebarClass from '~/components/SidebarClass';
import styles from './styles.module.css';
import Paper from '@mui/material/Paper';
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Table } from 'antd';
import { columnsWatchScore } from './column';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMarkExercisesByTeacher } from '~/repositories/exercise';
import { MarkExcire } from '~/models/IExercise';
import { avatar } from '@material-tailwind/react';
import moment from 'moment';
interface DataCol {
    point: number;
    name: string;
    time: Date;
    avatar: string;
}
function WatchScore() {
    const [dataSource, setDataSource] = useState<DataCol[] | undefined>([]);
    const { id }: any = useParams();
    console.log('check', id);
    const renderData = (result: MarkExcire[]) => {
        const data = result.map((item, index) => {
            return {
                point: parseFloat(item.point.toFixed(2)),
                name: item.user_info[0].name,
                time: moment(item.created_at).format('DD/MM/YYYY HH:mm'),
                avatar: item.user_info[0].avatar,
            };
        });
        return data;
    };
    useEffect(() => {
        const fetchData = async (id: string) => {
            const res = await getMarkExercisesByTeacher(id);
            console.log('res', res);
            const data = renderData(res);
            setDataSource(data);
            console.log('dataaaa', data);
        };
        fetchData(id);
    }, [id]);
    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Mike',
    //         age: 32,
    //         address: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         name: 'John',
    //         age: 42,
    //         address: '10 Downing Street',
    //     },
    // ];

    return (
        <div>
            <SidebarClass />
            <div>
                <h2 style={{ fontWeight: 400, marginLeft: 20 }}>Bảng Điểm</h2>
                <Table
                    style={{ padding: 20 }}
                    dataSource={dataSource}
                    columns={columnsWatchScore}
                />
            </div>
        </div>
    );
}

export default WatchScore;
