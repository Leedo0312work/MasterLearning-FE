import { useState, memo } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import mediaServices from '~/services/media';


interface Prop {
    isFullScreen?: boolean;
    pdfUrl?: string | null; // Add pdfUrl prop
    onFileUpload?: (url: string) => void;
}

function PreviewFileMultipleChoice({ isFullScreen = false, pdfUrl, onFileUpload }: Prop) {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const response = await mediaServices.uploadPDF(file);
            const uploadedUrl = response.result?.[0]?.url;
            if (uploadedUrl) {
                if (onFileUpload) onFileUpload(uploadedUrl);
                setFileName(file.name);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const removePdf = () => {
        if (onFileUpload) onFileUpload(null); // Clear the PDF in the parent component as well
        setFileName(null);
    };

    return (
        <div
            className={clsx({
                [styles.wrapper]: !isFullScreen,
                'tw-h-screen tw-w-full': isFullScreen,
            })}
        >
            <div className={styles.btnChooseFile}>
                <input
                    type="file"
                    accept="application/pdf"
                    id="fileUpload"
                    onChange={handleFileUpload}
                />
                <label htmlFor="fileUpload">Chọn tệp PDF</label>
            </div>

            {pdfUrl && (
                <div>
                    <div className={styles.mediaItem}>
                        <embed
                            src={pdfUrl}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                        />
                        <div className={styles.mediaInfo}>
                            <span>{fileName || "No name available"}</span>
                            <button onClick={removePdf} className={styles.removeButton}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(PreviewFileMultipleChoice);
