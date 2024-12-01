import SiderbarClassItem from '~/components/SiderbarClassItem';
import SiderbarClassHeader from '~/components/SiderbarClassHeader';

import styles from './styles.module.css';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TaskIcon from '@mui/icons-material/Task';
import QuizIcon from '@mui/icons-material/Quiz';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import useDetailClass from '~/hooks/useDetailClass';
import useRoleInClass from '~/hooks/useRoleInClass';
import { Role } from '~/enums/role';
import ClassModalAddEdit from '~/components/ClassModalAddEdit';
import useModal from '~/hooks/useModal';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

function SidebarClassAdmin() {
    const location = useLocation();

    const role = useRoleInClass();

    const menu = useMemo(() => {
        return [
            {
                icon: PersonOutlineIcon,
                text: 'Quản lý tài khoản',
                to: 'manageAccount',
                // show: role == Role.ADMIN,
                show: true,
            },
            {
                icon: NewspaperIcon,
                text: 'Kiểm duyệt bài đăng',
                to: 'censorPost',
                show: true,
            },

            // {
            //     icon: PersonOutlineIcon,
            //     text: 'Quản lý thành viên',
            //     to: 'manageMember',
            //     // show: role == Role.ADMIN,
            //     show: true,
            // },

            {
                icon: PersonOutlineIcon,
                text: 'Quản lý lớp học',
                to: 'manageClass',
                // show: role == Role.ADMIN,
                show: true,
            },

            {
                icon: TaskIcon,
                text: 'Quản lý bài giảng',
                to: 'manageLesson',
                show: true,
            },
            {
                icon: CastForEducationIcon,
                text: 'Quản lý tài liệu',
                to: 'manageDocument',
                show: true,
            },
        ];
    }, [role]);

    const active = useMemo(() => {
        const { pathname } = location;

        const result = menu.find((item) => pathname.includes(item.to));
        return result?.to;
    }, [location]);
    const {
        isOpen: openAddEditModal,
        open: handleOpenAddEditModal,
        close: handleCloseAddEditModal,
    } = useModal();

    return (
        <div className={styles.wrap}>
            {/* <div className={styles.header}>
                <SiderbarClassHeader />
            </div> */}
            {/* <div className={styles.infor}>Danh mục</div> */}
            <div className={styles.list}>
                {menu.map((item, index) => {
                    return (
                        <div key={item.to}>
                            {item?.show && (
                                <SiderbarClassItem
                                    active={item.to === active}
                                    key={index}
                                    Icon={item?.icon}
                                    to={item?.to}
                                    text={item?.text}
                                // footer={Boolean(item?.footer)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            {/* <div
                className={styles.footer}
                onClick={() => {
                    handleOpenAddEditModal();
                }}
            >
                {menu.map((item, index) => {
                    if (item?.footer) {
                        return (
                            <SiderbarClassItem
                                key={index}
                                Icon={item?.icon}
                                to={item?.to}
                                text={item?.text}
                                footer={true}
                            />
                        );
                    }
                })}
            </div>
            <ClassModalAddEdit
                subMitForm={() => { }}
                openAddModal={openAddEditModal}
                handleCloseAddModal={handleCloseAddEditModal}
                title="Chỉnh sửa lớp học hiện tại"
            /> */}
        </div>
    );
}

export default SidebarClassAdmin;
