export interface Campo {
    id?: number
    name: string
    datatype: 'string' | 'number' | 'boolean' | 'date'
    createdAt?: string
}

export interface Preenchimento {
    id?: number
    name: string
    fieldId: string
    value: string | number | boolean
    createdAt?: string
}