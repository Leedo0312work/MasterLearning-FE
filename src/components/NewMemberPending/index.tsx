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

            <div className={styles.membersList}>
                {pendingMembers.map(member => (
                    member.user.map(user => (
                        <div className={styles.itemWrap}>
                            <div key={user._id} className={styles.memberItem}>
                                <div className={styles.avatarContainer}>
                                    {renderUserAvatar(user)}
                                </div>
                                <div className={styles.memberDetails}>
                                    <p className={styles.userName}>{user.name}</p>
                                    <p className={styles.userEmail}>{user.email}</p>
                                </div>
                            </div>
                            <div>
                            <button onClick={() => handleAccept(member._id)} className={styles.buttonAccept}>Chấp nhận</button>
                            </div>
                        </div>
                    ))          
                ))}
            </div>
        </div>
    );
};

export default NewMemberPending;
