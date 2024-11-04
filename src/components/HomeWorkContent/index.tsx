import HomeWorkContentHeader from '~/components/HomeWorkContentHeader';

import styles from './styles.module.css';
import HomeWorkItem from '~/components/HomeWorkItem';
import useGetExerciseInClass from '~/hooks/useGetExercisesInClass';
import useExercisesInClassStore from '~/store/useExercisesInClassStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getListExercisesStudent } from '~/repositories/exercise';
import { IExercise } from '~/models/IExercise';
import { useQuery } from 'react-query';

function HomeWorkContent() {
    // const { data } = useGetExerciseInClass();

    const { _id, setId } = useExercisesInClassStore((state) => state);

    const handleClickItem = (item: string) => {
        setId(item);
    };

    const { id }: any = useParams();

    const [data, setData] = useState<IExercise[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const exercises = await getListExercisesStudent(id);
    //             setData(exercises);
    //         } catch (error) {
    //             console.error('Không thể lấy danh sách :', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const fetchData = useQuery(
        ['exercises', id],
        async () => {
            const exercises = await getListExercisesStudent(id);
            return exercises
        },
        {
            onSuccess(response) {
                console.log("list ex:", response)
                setData(response);
            },
        },
    );

    return (
        <div className={styles.wrap}>
            <HomeWorkContentHeader />

            <div className={styles.list_card}>
                {data?.map((item) => (
                    <HomeWorkItem
                        onClick={handleClickItem}
                        id={item._id}
                        name={item.name}
                        key={item._id}
                        active={_id === item._id}
                        created={item.created_at}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomeWorkContent;
