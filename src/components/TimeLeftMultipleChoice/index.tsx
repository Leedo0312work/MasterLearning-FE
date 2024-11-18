import useMultipleChoiceTestStore from '~/store/useMultipleChoiceTestStore';
import { useEffect, useMemo, useState } from 'react';

function TimeLeftMultipleChoice(time?: any) {
    // const timeLeft = useMultipleChoiceTestStore((state) => state.timeLeft);
    const [timeLeftSecond, setTimeLeft] = useState(0);
    useEffect(() => {
        setTimeLeft(time.time * 60);
    }, [time]);
    const timeLeftConvert = useMemo<string>(() => {
        // const timeLenght = time.time;

        if (!timeLeftSecond) return '';
        console.log('check time', timeLeftSecond);

        const hour = Math.floor(timeLeftSecond / 3600);
        const minute = Math.floor((timeLeftSecond - hour * 3600) / 60);
        const second = timeLeftSecond - hour * 3600 - minute * 60;
        console.log('minute', hour, minute);
        return `${hour}h:${minute}:${second}`;
    }, [timeLeftSecond]);
    useEffect(() => {
        if (timeLeftSecond <= 0) return;

        // Cài đặt interval để đếm ngược
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Dọn dẹp interval khi component unmount hoặc khi timeLeft thay đổi
        return () => clearInterval(timerId);
    }, [timeLeftSecond]);
    console.log('chjeck', timeLeftSecond);
    return <div>{timeLeftConvert}</div>;
}

export default TimeLeftMultipleChoice;
