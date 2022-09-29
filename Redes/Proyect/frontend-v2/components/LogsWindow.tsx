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

interface WindowProps {
    document: Partial<IDocument>,
    onClose: () => void,
    isOpen: boolean
}



export const LogsWindow = ({document, onClose, isOpen}: WindowProps) =>{

    return(
        <Drawer isOpen={isOpen} icon="info-sign" onClose={()=>onClose()} title="Palantir Foundry">
    <div className={Classes.DRAWER_BODY}>
        <div className={Classes.DIALOG_BODY}>
            <p>
                <strong>
                    Data integration is the seminal problem of the digital age. For over ten years,
                    we’ve helped the world’s premier organizations rise to the challenge.
                </strong>
            </p>
            <p>
                Palantir Foundry radically reimagines the way enterprises interact with data by
                amplifying and extending the power of data integration. With Foundry, anyone can source,
                fuse, and transform data into any shape they desire. Business analysts become data
                engineers — and leaders in their organization’s data revolution.
            </p>
            <p>
                Foundry’s back end includes a suite of best-in-class data integration capabilities: data
                provenance, git-style versioning semantics, granular access controls, branching,
                transformation authoring, and more. But these powers are not limited to the back-end IT
                shop.
            </p>
            <p>
            document: {JSON.stringify(document)}
            </p>
            <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
        </div>
    </div>
    <div className={Classes.DRAWER_FOOTER}>Footer</div>
    </Drawer>
    )

}

export default LogsWindow
