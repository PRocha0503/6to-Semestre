import { Tag } from "@blueprintjs/core";
import useDocument from "@hooks/document/useDocument";
import { Method } from "axios";
import { isArrayLike } from "cypress/types/lodash";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import * as React from "react";
import { IDocument } from "types";
import styles from "../styles/Metadata.module.css"

interface DocProps{
    doc: IDocument,
}


const DocPreview:React.FC<DocProps> = ({doc}) =>{
    console.log(doc.tags)
    const localDateTime = new Date(doc.createdAt);
		localDateTime.setTime(localDateTime.getTime());
		const formattedDateTime = localDateTime.toLocaleString("es-MX", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
        const formattedHourTime = localDateTime.toLocaleString("es-MX", {
			hour:"2-digit",
            minute: "2-digit",
            second: "2-digit",
		});
    return( <>
                <div className={styles.box}>
                <div className={styles.item}>
                <span className={styles.title}>Título:</span>
                <span>{doc.title}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.title}>Creado por:</span>
                <span>{doc.createdBy.username}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.title}>Fecha de Creación:</span> 
                <span>{formattedDateTime}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.title}>Hora de Creación:</span> 
                <span>{formattedHourTime}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.title}>Area:</span>
                <span>{doc.area ? doc.area.name : "Sin Area"}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.title}>Expediente:</span>
                <span>{doc.expediente}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.title}>Folio:</span>
                <span>{doc.folio}</span>
                </div>
                {doc.metadata? Object.entries(doc.metadata).map(([key,value])=>{
                    return(
                    <>
                    <div className={styles.item}>
                    <span className={styles.title}>{key}:</span>
                    <span>{value}</span>
                    </div>
                    </>
                    )
                })
                : null}
                <div className={styles.item}>
                <span className={styles.title}>Tags:</span>
                {doc.tags.length!=0 ? doc.tags.map(tag => <Tag style={{backgroundColor:tag.color}} icon={tag.icon} style={{marginLeft:"2px"}}>{tag.name}</Tag>): <span>No Hay Tags</span>}
                </div>
                </div>
            </>
    )
}
export default DocPreview;