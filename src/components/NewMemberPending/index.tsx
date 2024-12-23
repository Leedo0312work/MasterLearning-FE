import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getAccept, getPendingMember } from '~/repositories/class';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type User = any;
type Member = {
    user: User[];
};

const NewMemberPending = () => {
    
    const [pendingMembers, setPendingMembers] = useState<Member[]>([]);

    const { id: classId } = useParams();

    useEffect(() => {
        const fetchAcceptedMember = async () => {
            try {
                const response = await getPendingMember(classId);
                setPendingMembers(response);
            } catch (error) {
                console.error('Không thể lấy danh sách member:', error);
            }
        };
        fetchAcceptedMember();
    }, [classId]);

    const renderUserAvatar = (user: any) => {
        return user.avatar 
            ? <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
            : <div className={styles.avatarPlaceholder}>{user.name.charAt(0).toUpperCase()}</div>;
    };

    const getSum = () => {
        let sum = 0;
    
        pendingMembers.forEach(member => {
            member.user.forEach(user => {
                sum += 1;
            });
        });
    
        return sum;
    };

    const handleAccept = async (id: string) => {
        console.log("Id học sinh", id);
        try {     
            const res = await getAccept(id);
            console.log("Kết quả", res);
            if (res.result) {
                setPendingMembers(prevMembers => 
                    prevMembers.filter(member => member._id !== id)
                );
                toast.success('Đã thêm học sinh vào lớp!');
            } else {
                toast.error('Không thể thêm học sinh.');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <span className={styles.title}>Chờ xét duyệt</span>
                <span>{getSum()} thành viên</span>
            </div>
    
            <hr />
    
            <table className={styles.membersTable}>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Ngày sinh</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pendingMembers.map(member => (
                        member.user.map(user => (
                            <tr key={user._id}>
                                <td className={styles.avatarCell}>
                                    {renderUserAvatar(user)}
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.date_of_birth).toLocaleDateString('vi-VN')}</td>
                                <td>
                                    <button
                                        onClick={() => handleAccept(member._id)}
                                        className={styles.buttonAccept}
                                    >
                                        Chấp nhận
                                    </button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewMemberPending;
