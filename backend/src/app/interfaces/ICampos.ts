export default interface ICampos {
    id?: number
    name: string
    datatype: CampoDataType
    createdAt?: Date
}

export enum CampoDataType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    DATE = "date",
}