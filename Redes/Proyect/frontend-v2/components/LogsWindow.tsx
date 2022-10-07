import * as React from "react";

import {
    Button,
    Classes,
    Code,
    Divider,
    Drawer,
    DrawerSize,
    H5,
    HTMLSelect,
    Icon,
    Label,
    Menu,
    MenuItem,
    Switch,
} from "@blueprintjs/core";
import { IDocument } from "types";
import LogPreview from "./LogPreview";
import useLogs from "@hooks/document/useLogs";
import { type } from "os";
import { useEffect } from "react";
import LogsWindowClass from "../styles/LogsWindow.module.css"
import { ILog } from "types/logs";
// import { ILogType } from "types/logs";


declare enum ILogType {
	User = "User",
	Document = "Document",
	Area = "Area",
	Tag = "Tag",
	Permission = "Permission",
	Folder = "Folder",
	Other = "Other",
}

interface WindowProps {
    document: Partial<IDocument>,
    onClose: () => void,
    isOpen: boolean
}



export const LogsWindow = ({document, onClose, isOpen}: WindowProps) =>{
    const [logs, setLogs] = React.useState<ILog[]>([])
    const {data} = useLogs(document._id || "")
    useEffect(()=>{
        if(data){
            setLogs(data.logs)
        }
    },[data])
    return(
        <Drawer isOpen={isOpen} icon="info-sign" onClose={()=>onClose()} hasBackdrop={false}  title={JSON.stringify(document.title)}>
    <div className={Classes.DRAWER_BODY}>
        <div className={`${Classes.DIALOG_BODY} ${LogsWindowClass.Table}` }>
            <div className={LogsWindowClass.TableHeader}>
                <div className={LogsWindowClass.TableHeaderItem}><Icon icon={"changes"}></Icon> Tipo</div>
                <div className={LogsWindowClass.TableHeaderItem}><Icon icon={"calendar"}></Icon> Fecha</div>
                <div className={LogsWindowClass.TableHeaderItem}><Icon icon={"user"}></Icon> Usuario</div>
            </div>
            {logs?.map((value,index)=>{
                return (
                    <LogPreview log={value} key={value.date + "_" + index}></LogPreview>
                )
            })}
            
        </div>
    </div>
    </Drawer>
    )

}

export default LogsWindow
