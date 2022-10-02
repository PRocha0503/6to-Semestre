import { DialogStep, MultistepDialog } from "@blueprintjs/core"
import CustomUploader from "./CustomUploader";
import FilePreview from "./FilePreview";
import React from "react";
import useUploadBatch from "@hooks/csv/useUploadBatch";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;

}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {

    const [file, setFile] = React.useState<File | null>(null);

    const handleUploaded = (response: any) => {
        console.log("File uploaded: ", file);
        console.log("Response: ", response);

        onClose();
        setFile(null);
    }

    const handleError = (error: Error) => {
        console.error("Error uploading file: ", error);
    }

    const { isLoading, mutate } = useUploadBatch({ onSuccess: handleUploaded, onError: handleError });

    const handleUpload = () => {
        console.log("Upload");

        // upload file
        mutate();
    }

    return (
        <MultistepDialog
            autoFocus
            canEscapeKeyClose
            canOutsideClickClose={false}
            enforceFocus
            isOpen={isOpen}
            onClose={onClose}
            title="Sube tus documentos"
            closeButtonProps={{ minimal: true, text: "Cerrar" }}
            isCloseButtonShown
            showCloseButtonInFooter
            navigationPosition="top"
            initialStepIndex={0}
            icon="upload"
            transitionDuration={300}
            finalButtonProps={{ text: "Subir", onClick: () => handleUpload(), loading: isLoading }}
            backButtonProps={{ text: "Atrás" }}
        >
            <DialogStep
                id={0}
                title="Selecciona el archivo"
                panel={
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                        height: "15rem"
                    }}>
                        <CustomUploader file={file} onChange={setFile} />
                    </div>

                }

                nextButtonProps={{ minimal: true, text: "Siguiente", disabled: file === null }}
            >

            </DialogStep>
            <DialogStep
                id={1}
                title="Selecciona el tipo de documento"
                property="type"
                panel={
                    <FilePreview file={file} previewItems={5} />
                }
            >
            </DialogStep>
        </MultistepDialog>
    )
}


export default UploadModal