import { useState } from 'react';
import styles from './styles.module.css';
import images from '~/assets/images/default_classes.jpg';
import { memo } from 'react';
import useManageJoinClasses from '~/hooks/useManageJoinClasses';
import { toast } from 'react-toastify';

function CardSearch({ findedClass, closeCard }: any) {
    const { mutateJoin } = useManageJoinClasses();
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 

    const handleJoinClass = (data: any) => {
        console.log(data);
        mutateJoin(data);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setError(''); 
    };

    const handleJoinClick = () => {
        if (findedClass.type === 'Security' && !password) {
            toast.error("Vui lòng nhập mật khẩu lớp học")
        } else {
            handleJoinClass({ classId: findedClass._id, password: password || findedClass.password });
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.cover}>
                <div className={styles.course}>
                    <div className={styles.img_wrap}>
                        <img className={styles.img} src={images} alt="" />
                    </div>
                    <div className={styles.contant}>
                        <div className={styles.text_wrap}>
                            <p className={styles.name}>{findedClass.name}</p>
                            <p className={styles.code}>{findedClass.code}</p>
                        </div>
                        
                        <div className={styles.join}>
                            {findedClass.type === 'Security' && (
                                <div >
                                    <input 
                                        type="password" 
                                        placeholder="Nhập mật khẩu lớp học" 
                                        value={password}
                                        onChange={handlePasswordChange} 
                                        className={styles.password_input}
                                    />
                                </div>
                            )}

                            <div 
                                className={styles.btn} 
                                onClick={handleJoinClick}
                            >
                                Tham gia
                            </div>
                        </div>
                    </div>
                    <div className={styles.close} onClick={closeCard}>
                        &times;
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CardSearch);
