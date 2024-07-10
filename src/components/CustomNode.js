import { Handle, Position } from '@xyflow/react';
import {memo} from 'react'

export default memo(({data}) => {
    return(
        <div style={{ border: '2px solid', color: data.borderColor, padding: 10 }}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
})
