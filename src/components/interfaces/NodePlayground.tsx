export interface NodePlayground {
    id: string,
    data: NodePlaygroundData,
    position: NodePlaygroundCoords,
}

export interface NodePlaygroundData {
    label:string
}

export interface NodePlaygroundCoords {
    x: number,
    y: number
}

export interface NodePlaygroundConnection {
    id: string,
    source: string,
    target: string,
    animated: boolean
}