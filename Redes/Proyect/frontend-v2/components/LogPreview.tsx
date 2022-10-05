import { Method } from "axios";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import * as React from "react";
import { ILog } from "types/logs";

interface LogProps{
    log: ILog,
}

const typeOfEndpoint = (endp: Method) =>{
    switch(endp){
        case "GET":
            return("Acceso");
        case "POST":
            return("Subir")
    }
}

const LogPreview:React.FC<LogProps> = ({log})=>{
    const localDateTime = new Date(log.date);
		localDateTime.setTime(localDateTime.getTime());
		const formattedDateTime = localDateTime.toLocaleString("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
        const formattedHourTime = localDateTime.toLocaleString("en-US", {
			hour:"2-digit",
            minute: "2-digit",
            second: "2-digit"
		});

        

    return(
        <div style={{
            display:"grid",
            gridTemplateColumns:"120px 120px",
            columnGap:"1px",
            margin:"5px"

        }}>
            <div style={{
                display:"grid"
            }}>
            {formattedDateTime}
            <strong style={{color:"blue"}}>{formattedHourTime}</strong>
            </div>
            <div style={{
                display:"grid"
            }}>
            <strong>{log.user.username}</strong>
            {log.message}
            </div>
        </div>
    )
}

export default LogPreview;