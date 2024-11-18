import HomeWorkContentHeader from '~/components/HomeWorkContentHeader';
import styles from './styles.module.css';
import HomeWorkItem from '~/components/HomeWorkItem';
import useExercisesInClassStore from '~/store/useExercisesInClassStore';
import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getListExercisesStudent } from '~/repositories/exercise';
import { IExercise } from '~/models/IExercise';
import { useQuery } from 'react-query';

function HomeWorkContent() {
    const { _id, setId } = useExercisesInClassStore((state) => state);
    const { id }: any = useParams();
    const [data, setData] = useState<IExercise[]>([]);
    const location = useLocation();

    const isExam = location.pathname.includes('exam');

    const fetchData = useQuery(
        ['exercises', id],
        async () => {
            const exercises = await getListExercisesStudent(id);
            return exercises;
        },
        {
            onSuccess(response) {
                console.log("list ex:", response);
                setData(response);
            },
        },
    );

    return (
        <div className={styles.wrap}>
            <HomeWorkContentHeader />

            <div className={styles.list_card}>
                {data?.map((item) => {
                    if (isExam && item.is_test) {
                        return (
                            <HomeWorkItem
                                onClick={() => setId(item._id)}
                                id={item._id}
                                name={`Bài kiểm tra: ${item.name}`}
                                key={item._id}
                                active={_id === item._id}
                                created={item.created_at}
                            />
                        );
                    }

                    // Kiểm tra nếu route không phải exam và là bài tập (is_test = false)
                    if (!isExam && !item.is_test) {
                        return (
                            <HomeWorkItem
                                onClick={() => setId(item._id)}
                                id={item._id}
                                name={`Bài tập: ${item.name}`}
                                key={item._id}
                                active={_id === item._id}
                                created={item.created_at}
                            />
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
}

export default HomeWorkContent;
