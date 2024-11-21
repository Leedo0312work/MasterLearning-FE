import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { FormMultipleChoiceInterface } from '~/types/exercise';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { memo, useEffect } from 'react';

interface Prop {
    active: boolean;
    order: number;
    emitChange: (index: number, key: 'answer' | 'point' | 'type', value: string | number) => void;
    setActive: (index: number) => void;
}

function FormMultipleChoiceItem({ active, order, emitChange, setActive }: Prop) {
    console.log('check', active, order, emitChange, setActive);
    const { control, watch } = useFormContext<FormMultipleChoiceInterface>();

    // Sử dụng watch để lấy giá trị hiện tại của type
    const type = watch(`answers.${order}.type`);

    const handleClick = () => {
        setActive(order);
    };

    return (
        <div
            onClick={handleClick}
            className={clsx([
                'tw-bg-slate-100 tw-border-2 tw-border-solid tw-border-slate-50 tw-cursor-pointer tw-rounded-xl tw-p-5',
                { 'tw-bg-blue-50 tw-border-blue-600': active },
            ])}
        >
            <div>Câu {order + 1}</div>

            <div className={'tw-mt-4'}>
                <Controller
                    name={`answers.${order}.type`}
                    control={control}
                    defaultValue={0} // Đặt giá trị mặc định là 0
                    render={({ field }) => (
                        <Select
                            value={field.value ?? 0}
                            fullWidth
                            onChange={(event) => {
                                const newValue = Number(event.target.value);
                                emitChange(order, 'type', newValue);
                                field.onChange(newValue);
                            }}
                        >
                            <MenuItem value={0}>Trắc nghiệm</MenuItem>
                            <MenuItem value={1}>Câu trả lời ngắn</MenuItem>
                            <MenuItem value={2}>Tự luận</MenuItem>
                        </Select>
                    )}
                />
            </div>

            {type !== 2 && (
                <div className={'tw-mt-4'}>
                    <Controller
                        rules={{
                            required: 'Không được để trống',
                        }}
                        name={`answers.${order}.answer`}
                        control={control}
                        render={({ field, fieldState: { error, invalid } }) => (
                            <TextField
                                error={invalid}
                                helperText={error?.message}
                                fullWidth
                                size="small"
                                label="Đáp án"
                                value={field.value}
                                onChange={(event) => {
                                    emitChange(order, 'answer', event.target.value);
                                    field.onChange(event);
                                }}
                            />
                        )}
                    />
                </div>
            )}

            <div className={'tw-mt-4'}>
                <Controller
                    rules={{
                        required: 'Không được để trống điểm',
                        min: {
                            value: 0,
                            message: 'Điểm không hợp lệ',
                        },
                    }}
                    name={`answers.${order}.point`}
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                        <TextField
                            error={invalid}
                            helperText={error?.message}
                            type="number"
                            fullWidth
                            size="small"
                            onChange={(event) => {
                                emitChange(order, 'point', event.target.value);
                                field.onChange(event);
                            }}
                            value={field.value}
                            label="Điểm"
                        />
                    )}
                />
            </div>
        </div>
    );
}

export default memo(FormMultipleChoiceItem);
