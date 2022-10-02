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
    Label,
    Menu,
    MenuItem,
    OptionProps,
    Position,
    Switch,
} from "@blueprintjs/core";
import { IDocument } from "types";
import LogPreview from "./LogPreview";
import useLogs from "@hooks/document/useLogs";

interface WindowProps {
    document: Partial<IDocument>,
    onClose: () => void,
    isOpen: boolean
}



export const LogsWindow = ({document, onClose, isOpen}: WindowProps) =>{
    const {data} = useLogs(document._id || "")
    return(
        <Drawer isOpen={isOpen} icon="info-sign" onClose={()=>onClose()} hasBackdrop={false}  title={JSON.stringify(document.title)}>
    <div className={Classes.DRAWER_BODY}>
        <div className={Classes.DIALOG_BODY}>
            
            {data?.logs?.map((value,index)=>{
                return (
                    <LogPreview log={value} key={value.date + "_" + index}></LogPreview>
                )
            })}
            
        </div>
    </div>
    <div className={Classes.DRAWER_FOOTER}>Footer</div>
    </Drawer>
    )

}

export default LogsWindow
