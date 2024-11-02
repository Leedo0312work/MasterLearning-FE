import { useState, memo } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import mediaServices from '~/services/media';

interface Prop {
    isFullScreen?: boolean;
}

function PreviewFileMultipleChoice({ isFullScreen = false, onFileUpload }: any) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const response = await mediaServices.uploadPDF(file);
            setPdfUrl(response.result?.[0]?.url);
            setFileName(file.name);
            
            if (onFileUpload) {
                onFileUpload(response.result?.[0]?.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const removePdf = () => {
        setPdfUrl(null);
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
                            <span>{fileName}</span>
                            <button onClick={removePdf} className={styles.removeButton}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(PreviewFileMultipleChoice);

