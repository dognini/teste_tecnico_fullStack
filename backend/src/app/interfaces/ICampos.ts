export default interface ICampos {
    id?: number
    name: string
    dataType: "string" | "number" | "boolean" | "date"
    createdAt?: Date
}