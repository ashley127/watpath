import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import {memo} from 'react'
import '../App.css'

export type NodeData = {
    title: string;
    subline: string;
}

export default memo(({data}: NodeProps<Node<NodeData>>) => {
    return(
        <>
            <div className='wrapper gradient'>
                <div className='inner'>
                    <div className='body'>
                        <div className="title">{data.title}</div>
                        <div className="subline">{data.subline}</div>
                    </div>
                </div>
            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    )
})
