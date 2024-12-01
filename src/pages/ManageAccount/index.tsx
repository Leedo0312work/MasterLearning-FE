import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getBlockAccount, getListAccount, getUpdateAccount } from '~/repositories/account';
import { IUser } from '~/models/IUser';
import CreateAccount from '~/components/CreateAccount';
import ReactPaginate from 'react-paginate';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RegisterForm, RegisterResponse } from '~/types/register';
import { ResponseAPI } from '~/app/response';
import ModalEditAccount from '~/components/ModalEditAccount';
import { Input, Modal } from 'antd';

const { confirm } = Modal;


function ManageAccount() {
    const [data, setData] = useState<IUser[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<IUser | null>(null);

    const [nameSearch, setNameSearch] = useState('')

    useEffect(() => {
        fetchAccounts(1);
    }, []);

    const fetchAccounts = async (page: any) => {
        try {
            const res = await getListAccount(5, page);
            setData(res.result);
            setTotalPages(res.total_page);
        } catch (error) {
            console.error('Không thể lấy danh sách:', error);
        }
    };

    const handlePageClick = (event: any) => {
        fetchAccounts(event.selected + 1);
    };

    const handleOpenModal = (account: IUser | null = null) => {
        setSelectedAccount(account);  // Set account for editing or null for new account
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedAccount(null);  // Reset selected account
    };

    const mutation = useMutation<RegisterResponse, AxiosError<ResponseAPI>, RegisterForm>(getUpdateAccount, {
        onSuccess: () => {
            toast.success("Chỉnh sửa tài khoản thành công");
            fetchAccounts(1);  // Refresh the account list
            handleCloseModal();
        },
        onError: (error) => {
            toast.error(`Đã có lỗi xảy ra`);
        }
    });

    const submitForm = (data: RegisterForm) => {
        if (selectedAccount) {
            mutation.mutate({ ...data, id: selectedAccount._id }); // Include the account ID for update
        }
    };

    const handleBlock = useMutation(
        (id: string) => getBlockAccount({ user_id: id }), 
        {
            onSuccess: () => {
                toast.success("Chặn tài khoản thành công");
                fetchAccounts(1); // Refresh account list
            },
            onError: (error) => {
                toast.error("Người dùng này đã bị chặn rồi");
            }
        }
    );

    const confirmBlock = (id: string) => {
        confirm({
            title: 'Bạn có chắc chắc muốn chặn tài khoản này',
            okText: 'Chặn',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk() {
                handleBlock.mutate(id);
            },
        });
    };

    const handleInputSearch = (e) => {
        setNameSearch(e.target.value)
    }

    const filteredData = data.filter((acc) =>
        acc.name.toLowerCase().includes(nameSearch.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <CreateAccount />
                <Input
                    placeholder={`Nhập tên tài khoản để tìm kiếm`}
                    allowClear
                    size="large"
                    value={nameSearch}
                    onChange={handleInputSearch}
                />
            </div>
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th>ID</th>
                            <th>Tên tài khoản</th>
                            <th>Email</th>
                            <th>Ngày sinh</th>
                            <th>Role</th>
                            {/* <th>Avatar</th> */}
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((acc) => (
                            <tr key={acc._id}>
                                <td>{acc._id}</td>
                                <td>{acc.name}</td>
                                <td>{acc.email}</td>
                                <td>{new Date(acc.date_of_birth).toLocaleDateString()}</td>
                                <td>{acc.role}</td>
                                <td>{acc.verify}</td>
                                {/* <td>
                                    <img src={acc.avatar} alt={acc.name} className={styles.avatar} />
                                </td> */}
                                <td>
                                    <button onClick={() => handleOpenModal(acc)} className={styles.btnEdit}>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => confirmBlock(acc._id)} className={styles.btnDelete}>
                                        <BlockIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ModalEditAccount 
                    open={openModal}
                    onClose={handleCloseModal}
                    submitForm={submitForm}
                    title="Chỉnh sửa tài khoản"
                    account={selectedAccount} 
                />

                <ReactPaginate
                    className={styles.pagination}              
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="<"
                    pageClassName={styles.pageItem}             
                    pageLinkClassName={styles.pageLink}        
                    previousClassName={styles.pageItem}         
                    previousLinkClassName={styles.pageLink}     
                    nextClassName={styles.pageItem}             
                    nextLinkClassName={styles.pageLink}         
                    breakLabel="..."
                    breakClassName={styles.pageItem}            
                    breakLinkClassName={styles.pageLink}       
                    activeClassName={styles.active}             
                />
            </div>
        </div>
    );
}

export default ManageAccount;
