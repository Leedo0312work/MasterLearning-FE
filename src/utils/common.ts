export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export function formatDateTime(isoDate: string): string {
    const dateObj = new Date(isoDate);

    // Lấy các phần của ngày
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = dateObj.getUTCFullYear();

    // Lấy giờ và phút
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();

    // Xác định AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;

    // Định dạng chuỗi kết quả
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year} ${hours}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;

    return formattedDate;
}

export function formatNumber(number: number): string {
    if (number >= 1_000_000_000) {
        return (
            (number / 1_000_000_000)
                .toFixed(1)
                .replace(/\.0$/, "")
                .replace(".", ",") + "B"
        );
    } else if (number >= 1_000_000) {
        return (
            (number / 1_000_000)
                .toFixed(1)
                .replace(/\.0$/, "")
                .replace(".", ",") + "M"
        );
    } else if (number >= 1_000) {
        return (
            (number / 1_000).toFixed(1).replace(/\.0$/, "").replace(".", ",") +
            "K"
        );
    }
    return number.toString().replace(".", ",");
}

export function timeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);

    // Chuyển thời gian UTC sang múi giờ
    const pastInVn = new Date(past.getTime() + -7 * 60 * 60 * 1000);

    const diffInSeconds = Math.floor((now.getTime() - pastInVn.getTime()) / 1000);

    const seconds = diffInSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `${seconds} giây trước`;
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else {
        return `${days} ngày trước`;
    }
}

export function formatCurrency(value: number): string {
    return value.toLocaleString("vi-VN") + "đ";
}
