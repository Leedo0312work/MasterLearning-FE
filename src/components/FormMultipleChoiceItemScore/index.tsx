import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { FormMultipleChoiceInterface } from '~/types/exercise';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { memo, useEffect, useMemo, useState } from 'react';
import mediaServices from '~/services/media';

interface Props {
    type: number;
    no: number;
    point: number;
    onUpdate: (data: any) => void;
    mark?: boolean;
    result?: string;
    correct?: boolean;
    maxPoint: number;
}

function FormMultipleChoiceItemScore({
    type,
    no,
    onUpdate,
    point,
    mark,
    result,
    correct,
    maxPoint,
}: Props) {
    // const { control, watch } = useFormContext<FormMultipleChoiceInterface>();
    let order = 1;
    const [errorMax, setErrorMax] = useState<boolean>(false);
    // Sử dụng watch để lấy giá trị hiện tại của type
    // const type = watch(`answers.${order}.type`);
    console.log('check re', result);
    const handleClick = () => {
        // setActive(order);
    };
    const handleUpdate = (event: any) => {
        console.log('checl e', event.target.value);
        let value = event.target.value;
        if (value > maxPoint) {
            // Nếu vượt quá, đặt lại giá trị của ô input thành maxPoint
            event.target.value = maxPoint;
            setErrorMax(true);
            return;
        }
        setErrorMax(false);
        const data = {
            no: no,
            type: type,
            point: Number.parseInt(event.target.value),
            correct: correct,
            correct_answer: null,
            max_point: maxPoint,
        };
        console.log('data', data);
        onUpdate(data);
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
        <div
            style={{
                border: `1px solid ${type === 2 ? 'red' : '#ccc'}`,
                margin: 12,
            }}
        >
            <div style={{ margin: '12px' }}>
                <p className="tw-text-sm">câu {no}</p>
                {renderType}
                {type != 2 ? (
                    <div>
                        <input
                            disabled={mark}
                            value={result}
                            className="tw-p-2 tw-w-3/4"
                            placeholder="Không có"
                            onChange={handleUpdate}
                        />
                        <div style={{ fontSize: 14, marginTop: 8 }}>
                            Kết quả:{' '}
                            <span style={{ color: 'red ' }}>{correct ? 'đúng' : 'sai'}</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <input
                            className="tw-p-2 tw-w-3/4"
                            placeholder="Giáo viên nhập điểm tại đây"
                            onChange={handleUpdate}
                        />
                        {errorMax ? (
                            <div style={{ color: 'red', fontSize: 12 }}>
                                Không được nhập số điểm vượt qua điểm tối đa
                            </div>
                        ) : (
                            ''
                        )}
                        <div style={{ fontSize: 14, marginTop: 8 }}>
                            Điểm tối đa : <span style={{ color: 'red ' }}>{maxPoint}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(FormMultipleChoiceItemScore);
