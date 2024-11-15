import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from 'react-router-dom';
import SelectMaterial from '~/components/SelectMaterial/index';

import styles from './styles.module.css';
import useAuthStore from '~/store/useAuthStore';

function HomeWorkContentHeader() {
    const user = useAuthStore((state) => state.user);

    const location  = useLocation()

    const isExam = location.pathname.includes('exam');

    return (
        user?.role === 2 && <div className={styles.wrap} style={{display: "flex", justifyContent: "flex-end"}}>
            {/* <div className={styles.search}>
                <TextField fullWidth size={'medium'} variant="outlined" />

                <div className={styles.select}>
                    <SelectMaterial
                        // value={field.value}
                        // onChange={field.onChange}
                        label={'Sắp xếp'}
                        // className={styles.select111}
                        options={[
                            {
                                value: 'default',
                                text: 'Sắp xếp',
                            },
                            {
                                value: 'A-Z',
                                text: 'A-Z',
                            },
                            {
                                value: 'Z-A',
                                text: 'Z-A',
                            },
                            {
                                value: 'time_asc',
                                text: 'Mới nhất',
                            },
                            {
                                value: 'time_desc',
                                text: 'Cũ nhất',
                            },
                        ]}
                    />
                </div>
            </div> */}
            <div className={'tw-ml-2'} >
                <Link to="add" className={styles.link}>
                    <Button variant={'contained'}>{isExam ? 'Tạo bài kiểm tra' : 'Tạo bài tập'}</Button>
                </Link>
            </div>
        </div>
    );
}

export default HomeWorkContentHeader;
