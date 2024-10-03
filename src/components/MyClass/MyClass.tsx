import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { IClass } from '~/models/IClass';
import { getClassList } from '~/repositories/class';

const MyClass = () => {
    const [classes, setClasses] = useState([]); 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classList = await getClassList();
                setClasses(classList); 
            } catch (error) {
                console.error('Không thể lấy danh sách lớp học:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchClasses();
    }, []); 

    return (
        <div className={styles.container}>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className={styles.classList}>
                    {classes.length > 0 ? (
                        classes.map((classItem) => (
                            <div key={classItem.id} className={styles.classItem}>
                                <div className={styles.classHeader}>
                                    <h3>{classItem.name}</h3>
                                    {classItem.teacher.length > 0 && (
                                        <p className={styles.teacherName}>
                                            {classItem.teacher[0].name}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.classBody}>
                                    <p>{classItem.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có lớp học nào.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyClass;
