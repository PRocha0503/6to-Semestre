import { Tag } from "@blueprintjs/core";
import { Method } from "axios";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import * as React from "react";
import { IDocument } from "types";

interface DocProps{
    doc: IDocument,
}