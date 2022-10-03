import { Classes, Icon } from "@blueprintjs/core";
import React, { useRef, useState } from "react";
import ClassesUploader from "../../styles/Uploader.module.css";

interface IProps {
    file: File | null;
    onChange: (file: File) => void;
}

const CustomUploader: React.FC<IProps> = ({file, onChange}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isDragActive, setIsDragActive] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
            return
        }

        // send notification
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log("Drop");

        const file = e.dataTransfer.files?.[0];
        if (file) {
            onChange(file);
            setIsDragActive(false);
            return
        }

        setIsDragActive(false);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(true);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            border: "1px dashed #ccc",
            minWidth: "25rem",  
            minHeight: "8rem",
        }}
            className={ (file ? " " + ClassesUploader.DropzoneActive : ClassesUploader.Dropzone) + (isDragActive ? " " + ClassesUploader.DropzoneDragActive : "") }
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
            onDragExit={() => setIsDragActive(false)}
            onDragEnd={() => setIsDragActive(false)}


        >
            <input type="file" onChange={handleFileChange} ref={inputRef} style={{ display: "none" }} accept=".xlsx" />
            <div style={{
                margin: "1rem",
            }}>
                {file === null ?
                    <div >
                        <span style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }} >Da click aqui o arrastra un archivo</span>
                        <div style={{
                            marginTop: "1rem",
                        }}>
                            El archivos debera ser de tipo <span style={{
                                color: "#0d6efd",
                                fontWeight: "bold",
                            }}>.XLSX</span>
                        </div>
                    </div> : 
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.3rem",
                        position: "relative",
                    }}> 
                        <div style={{
                            textAlign: "center",
                        }}>
                        <Icon icon="tick-circle" iconSize={16} color="#fff" style={{ marginRight: "0.5rem" }}/>
                        <span>{file.name} </span>    
                        </div>
                        <div>
                           Has click o arrastra otro archivo para reemplazarlo
                        </div>
                       
                    </div>}
        </div>
        </div>
    );
}

export default CustomUploader;