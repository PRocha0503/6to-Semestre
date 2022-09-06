import {  TreeNode, TreeView } from "@carbon/react"
import { Folder } from "@carbon/react/icons"
import {  useState } from "react"
import Image from 'next/image';

import styles from "../styles/FolderExplorer.module.scss"

function renderTree({ nodes }: any) {
  if (!nodes) {
    return;
  }
  return nodes.map(({ children, renderIcon, label, ...nodeProps } : any) => {
    const [expanded, setExpanded] = useState(false)

    return (
      <TreeNode
        key={nodeProps.id}
        renderIcon={() =>  expanded ? <Image src="/icons/filledFolder.svg" height={16} width={16} /> :  <Folder/>  }
        isExpanded={expanded}
        onClick={() =>{
          if (!children ) return;
           setExpanded((prev) => !prev)}
        } 
        label={<span>{label}</span>}
        value={label}
        {...nodeProps}>
        {renderTree({ nodes: children })}
      </TreeNode>
      )}
  );
}

interface Node {
  id: string,
  label: string
}

interface FolderExplorerProps {
    onSelect: (node: Node)  => void
}

const FolderExplorer = ({ onSelect } : FolderExplorerProps) => {
  const nodes = [
    {
      id: '1',
      label: 'Artificial intelligence',
      children: [
        {
          id: '1-1',
          label: 'Artificial intelligence',
        },
      ]
    },
    {
      id: '2',
      label: `Quidem, placeat?`,
    },
    {
      id: '3',
      label: 'Lorem ipsum dolor sit amet.',
      children: [
        {
          id: '1-5',
          label: 'Artificial intelligence',
        },
      ]
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },

      {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },
      {
      id: '4',
      label: 'Artificial intelligence',
    },  {
      id: '4',
      label: 'Artificial intelligence',
    },
    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    {
      id: '4',
      label: 'Artificial intelligence',
    },

    
  ];

return (
    <div className={styles.folderExplorer}>
      <TreeView
        label="Tree View"
        onSelect={(_ev: PointerEven, node: any) => onSelect?.(node)}
      >
      {renderTree({nodes})}
      </TreeView>
    </div>
  )
}

export default FolderExplorer;