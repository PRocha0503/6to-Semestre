import { Tag } from "@blueprintjs/core";
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
            return "Acceso";
        case "POST":
            return "Subir"
        case "DELETE":
            return "Eliminar"
        case "PUT":
            return "Actualizar"
        default:
            return "Desconocido"
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

        const endpoint = React.useCallback(()=>{
            return typeOfEndpoint(log.method as Method)
        },[log.method])

        const color = React.useCallback(()=>{
            console.log(log.method)
            switch(log.method){
                case "GET":
                    return "#06b73c";
                case "POST":
                    return "#2B93FF"
                case "DELETE":
                    return "#FF6060"
                case "PUT":
                    return "#ffb32b"
                default:
                    return "gray"
            }
        }
        ,[log.method])


        

    return(
        <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr 1fr ",
            columnGap:"1px",
            padding:"10px"

        }}>

            <div
                style={{
                    alignSelf:"center",
                    margin: "auto",
                }}
            >
                <Tag
                    style={{
                        backgroundColor:color(),
             
                        // minWidth:"100px",
                    }}
                >{endpoint()}</Tag>
            </div>

            <div style={{
                display:"flex",
                fontFamily: "monospace",
                justifyContent:"space-around",
                alignItems:"center",
                flexDirection:"column",
                textAlign:"center"
                
            }}>
            {formattedDateTime}
            <strong style={{}}>{formattedHourTime}</strong>
            </div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                alignItems:"center",
                flexDirection:"column",
                textAlign:"center"

            }}>
            <strong>{log.user.username}</strong>
            <span style={{
                fontWeight:"normal",
            }}>{log.message}</span>
            </div>
        </div>
    )
}

export default LogPreview;