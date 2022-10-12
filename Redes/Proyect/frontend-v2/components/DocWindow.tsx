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
import DocPreview from "./DocPreview";

interface WindowProps {
    document: IDocument,
    onClose: () => void,
    isOpen: boolean
}

export const DocWindow = ({document, onClose, isOpen}: WindowProps) =>{
    return(
        <Drawer isOpen={isOpen} icon="info-sign" onClose={()=>onClose()} hasBackdrop={false}  title="Detalles">
        <div className={Classes.DRAWER_BODY}>
            <DocPreview doc={document}></DocPreview>
        </div>
    </Drawer>
    )

}

export default DocWindow
