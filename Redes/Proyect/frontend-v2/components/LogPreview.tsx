import * as React from "react";
import { ILog } from "types/logs";

interface LogProps{
    log: ILog,
}

const LogPreview:React.FC<LogProps> = ({log})=>{
    console.log(log)
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
            padding: "1rem"
        }}>
            <div>
            {formattedDateTime}
            </div>
            <div>
            <strong>{formattedHourTime}</strong>
            </div>
        </div>
    )
}

export default LogPreview;