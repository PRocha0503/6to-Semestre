import { DialogStep, MultistepDialog } from "@blueprintjs/core"
import CustomUploader from "./CustomUploader";
import FilePreview from "./FilePreview";
import React, { useEffect } from "react";
import useUploadBatch from "@hooks/csv/useUploadBatch";
import { Header } from "./HeaderSelect";
import { Sheet, SheetCell } from "@hooks/csv/useSheets";
import * as XLSL from "xlsx";
import Notifications from "@components/Notifications";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;

}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {

    const [file, setFile] = React.useState<File | null>(null);
    const [updatedFile, setUpdatedFile] = React.useState<File | null>(null);
    const [headers, setHeaders] = React.useState<Header[]>([]);
    const [sheet, setSheet] = React.useState<Sheet| null>(null);
    const [toasts, setToasts] = React.useState<any[]>([]);

    const handleUploaded = (response: any) => {
        console.log("File uploaded: ", file);
        console.log("Response: ", response);

        onClose();
        setFile(null);
    }

    const handleError = (error: Error) => {
        console.error("Error uploading file: ", error);
    }

    const { isLoading, mutate, error, isError } = useUploadBatch({ onSuccess: handleUploaded, onError: handleError, file: updatedFile });

    const mapHeadersToColumns = (sheet: Sheet | null, headers: Header[]) => {
            if (!sheet) return;
           const newWorkbook = XLSL.utils.book_new();
           // merge headers with columns
           for (let i = 0; i < headers.length; i++) {
               const header = headers[i];
               console.log("Header: ", header);
               sheet.headers[header.column] = header.key;
               
           }

            const newSheet = XLSL.utils.aoa_to_sheet([sheet?.headers.map((header, index) => {
                return {
                    v: header || index.toString(),
                    t: "s"
                }
            }), ...sheet?.data || []] as any[]);

            console.log("New sheet: ", newSheet);

        
              // add new sheet to workbook  
            XLSL.utils.book_append_sheet(newWorkbook, newSheet, sheet?.name);

           // write workbook
           const data = XLSL.write(newWorkbook, { 
            bookType: 'xlsx', 
            type: 'buffer',
            });
            
            return data
    }

    useEffect(() => {
        if (updatedFile) {
            mutate();
        }
    }, [updatedFile, mutate]);

    useEffect(() => {
        if (isError) {
            setToasts((prev) => [...prev, { message: "Internal server error", type: "danger" }]);
        }
    }, [isError]);

    const handleUpload = () => {
        if (file) {
            const mergedFile = mapHeadersToColumns(sheet, headers);
            const newFile = new File([mergedFile], file.name, { type: file.type });
            setUpdatedFile(newFile);
        }
    }

    return (
        <>
      <Notifications toasts={toasts} setToasts={setToasts} />
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
                    <FilePreview file={file} onSheetChange={setSheet} onHeadersChange={(headers) => {
                        setHeaders(headers)
                    }} previewItems={5} />
                }
            >
            </DialogStep>
        </MultistepDialog>
        </>
    )
}


export default UploadModal