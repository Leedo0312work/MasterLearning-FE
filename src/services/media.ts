import axiosIns from '~/services/axios';

export const uploadImage = async (file: File | File[]) => {
    const formData = new FormData();

    if (Array.isArray(file)) {
        file.forEach((f: File) => {
            formData.append('image', f);
        });
    } else {
        formData.append('image', file);
    }

    try {
        const response = await axiosIns.post('/medias/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const uploadVideoHLS = async (file: File | File[]) => {
    const formData = new FormData();

    if (Array.isArray(file)) {
        file.forEach((f: File) => {
            formData.append('video', f);
        });
    } else {
        formData.append('video', file);
    }

    try {
        const response = await axiosIns.post('/medias/upload-video-hls', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const uploadVideo = async (file: File | File[]) => {
    const formData = new FormData();

    if (Array.isArray(file)) {
        file.forEach((f: File) => {
            formData.append('video', f);
        });
    } else {
        formData.append('video', file);
    }

    try {
        const response = await axiosIns.post('/medias/upload-video', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const uploadPDF = async (file: File | File[]) => {
    const formData = new FormData();

    if (Array.isArray(file)) {
        file.forEach((f: File) => {
            formData.append('pdf', f);
        });
    } else {
        formData.append('pdf', file);
    }

    try {
        const response = await axiosIns.post('/medias/upload-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const getStatusUploadVideoHLS = async (uploadId: string) => {
    try {
        const response = await axiosIns.get(`/medias/getStatusUploadVideoHLS/${uploadId}`);
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const mediaServices = {
    uploadImage,
    uploadVideoHLS,
    uploadVideo,
    uploadPDF,
    getStatusUploadVideoHLS,
};

export default mediaServices;
