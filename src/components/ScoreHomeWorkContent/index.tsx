import HomeWorkContentHeader from '~/components/HomeWorkContentHeader';
import styles from './styles.module.css';
import HomeWorkItem from '~/components/HomeWorkItem';
import useExercisesInClassStore from '~/store/useExercisesInClassStore';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getListExercisesStudent, getListNotMarkExercisesByTeacher } from '~/repositories/exercise';
import { IExercise, MarkExcire } from '~/models/IExercise';
import { useQuery } from 'react-query';
import ScoreHomeWorkItem from '../ScoreHomeWorkItem';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
function ScoreHomeWorkContent() {
    const { _id, setId } = useExercisesInClassStore((state) => state);
    const navigate = useNavigate();
    console.log('check use aa', useParams());
    const { idEE }: any = useParams();
    console.log('check', idEE);
    const [data, setData] = useState<MarkExcire[]>([]);
    const location = useLocation();

    const isExam = location.pathname.includes('exam');

    const fetchData = useQuery(
        ['scoreExercise', idEE],
        async () => {
            console.log('vo day');
            const scoreExercise = await getListNotMarkExercisesByTeacher(idEE);
            console.log('check ex', scoreExercise);
            return scoreExercise;
        },
        {
            onSuccess(response) {
                setData(response);
            },
        },
    );
    // useEffect(()=>{
    //     fetchData()
    // },[])
    console.log('check ', data);
    const onClick = (id: string) => {
        console.log('check id', id);
        navigate(id);
    };
    return (
        <div className={styles.wrap}>
            <p style={{ fontSize: 20, fontWeight: 500, marginLeft: 16 }}>Chấm điểm</p>

            <div className={styles.list_card}>
                {data.length > 0 ? (
                    data?.map((item, index) => {
                        return (
                            <ScoreHomeWorkItem
                                onClick={onClick}
                                id={item._id}
                                avatar={item.user_info[0].avatar}
                                name={`Họ tên: ${item?.user_info[0]?.name}`}
                                time={moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                                // key={item._id}
                                // active={_id === item._id}
                                // created={item.created_at}
                            />
                        );
                    })
                ) : (
                    <h4 style={{ marginLeft: 16, color: '#333' }}>Không có dữ liệu</h4>
                )}
            </div>
        </div>
    );
}

export default ScoreHomeWorkContent;
