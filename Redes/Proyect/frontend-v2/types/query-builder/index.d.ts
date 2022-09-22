declare type Operator = "eq" | "contains" | "starts-with"

declare interface Query {
    header: string;
    operator: Operator;
    value: string;
}
