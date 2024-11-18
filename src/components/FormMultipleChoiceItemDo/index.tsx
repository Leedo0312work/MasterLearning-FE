import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { FormMultipleChoiceInterface } from '~/types/exercise';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './style.module.scss';
import { memo, useEffect, useMemo } from 'react';

interface Props {
    type: number;
    no: number;
}

function FormMultipleChoiceItemDo({ type, no }: Props) {
    // const { control, watch } = useFormContext<FormMultipleChoiceInterface>();
    let order = 1;
    // Sử dụng watch để lấy giá trị hiện tại của type
    // const type = watch(`answers.${order}.type`);

    const handleClick = () => {
        // setActive(order);
    };
    const renderType = useMemo(() => {
        if (type == 0) {
            return <p className="tw-text-sm tw-my-2">Trắc nghiệm</p>;
        } else if (type == 1) {
            return <p className="tw-text-sm tw-my-2">Cầu trả lời ngắn</p>;
        } else if (type == 2) {
            return <p className="tw-text-sm tw-my-2">Tự luận</p>;
        }
    }, [type]);
    return (
        <div style={{ border: '1px solid #ccc', margin: 12 }}>
            <div style={{ margin: '12px' }}>
                <p className="tw-text-sm">câu {no}</p>
                {renderType}
                {type != 2 ? (
                    <input className="tw-p-2 tw-w-3/4" placeholder="Đáp án" />
                ) : (
                    // <div className={styles.btnChooseFile}>
                    //     <input
                    //         type="file"
                    //         accept="application/pdf"
                    //         id="fileUpload"
                    //         // onChange={handleFileUpload}
                    //     />
                    //     <label htmlFor="fileUpload">Chọn tệp PDF</label>
                    // </div>
                    <input className="tw-p-2 tw-w-3/4" placeholder="Đáp án" disabled />
                )}
            </div>
        </div>
    );
}

export default memo(FormMultipleChoiceItemDo);
