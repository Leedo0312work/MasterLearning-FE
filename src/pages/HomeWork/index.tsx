import SidebarLeftHomeWork from '~/components/SidebarLeftHomeWork';
import HomeWorkContent from '~/components/HomeWorkContent';
import SiderbarRightHomeWork from '~/components/SiderbarRightHomeWork';
import LessonHeader from '~/components/LessonHeader';

import styles from './styles.module.css';
import SidebarLeftLesson from '~/components/SidebarLeftLesson';
import UseFolder from '~/hooks/useFolder';
import ModalAddFolder from '~/components/ModalAddFolder';
import { useParams } from 'react-router-dom';

function HomeWork() {
    const {
        handleCloseModalAddFolder,
        handleOpenModalAddFolder,
        isOpenModalAddFolder,
        mutateCreateFolder,
        allFolder,
    } = UseFolder();

    const { id } = useParams();

    const handleCreate = (name: string) => {
        mutateCreateFolder({
            classId: Number(id),
            name,
        });
    };
    return (
        <div className={styles.wrap}>
            <LessonHeader name="Bài tập" />
            <div className={styles.content}>
                <HomeWorkContent />
                <SiderbarRightHomeWork />
            </div>

            <ModalAddFolder
                handleCreate={handleCreate}
                open={isOpenModalAddFolder}
                handleClose={handleCloseModalAddFolder}
            />
        </div>
    );
}

export default HomeWork;
