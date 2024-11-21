import React, { useEffect, useState } from 'react';
import DocumentTableContentHeader from '~/components/DocumentTableContentHeader';
import { ILesson } from '~/models/ILesson';
import { censorLesson, getNotCensoredLessons } from '~/repositories/lesson';

import styles from './styles.module.css';
import { ConfirmProvider } from 'material-ui-confirm';
import DocumentTableContentItem from '~/components/DocumentTableContentItem';
import DocumentTableHeader from '~/components/DocumentTableHeader';
// interface ILesson {
//     _id: string;
//     name: string;
//     description: string;
//     media: { url: string, type: number }[];
//     censored: boolean;
// }

const CensorDocumentUI: React.FC = () => {
    const [lessons, setLessons] = useState<ILesson[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    console.log('access!!!');
    // Lấy danh sách tài liệu chưa kiểm duyệt
    const fetchLessons = async () => {
        setLoading(true);
        try {
            const lessons = await getNotCensoredLessons(0); // Giả sử type = 0 là tài liệu chưa kiểm duyệt
            setLessons(lessons);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    const handleCensor = async (lessonId: string) => {
        try {
            await censorLesson(lessonId);
            alert('Tài liệu đã được kiểm duyệt.');
            fetchLessons(); // Tải lại danh sách sau khi kiểm duyệt
        } catch (error) {
            console.error('Error censoring lesson:', error);
            alert('Đã có lỗi xảy ra khi kiểm duyệt.');
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.table}>
                    <DocumentTableHeader />
                    <DocumentTableContentHeader />
                    {/* <ConfirmProvider>
                        <div className={styles.listStudent}>
                            {listStudent?.map((item: any, index: any) => (
                                <DocumentTableContentItem
                                    key={item?.id}
                                    avatar={item?.profile?.avatar}
                                    name={item?.username}
                                    classes={item?.classes}
                                    school={item?.school}
                                    phone={item?.phone}
                                    id={item?.id}
                                    handleOpenModalEdit={handleOpenModalEdit}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </ConfirmProvider> */}
                </div>
                {/* <SiderbarRightMember
                    handleAcceptAll={handleAcceptAll}
                    data={listPendingMember}
                    handleAcceptMember={handleAcceptMember}
                /> */}
            </div>
        </div>
    );
};

export default CensorDocumentUI;
