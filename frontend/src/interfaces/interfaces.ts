export interface Field {
    id: string
    name: string
    dataType: 'string' | 'number' | 'boolean' | 'date'
    createdAt: string
}

export interface Fill {
    id: string
    name: string
    fieldId: string
    value: string | number | boolean
    createdAt: string
}

export enum datatype {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    DATE = 'date'
}