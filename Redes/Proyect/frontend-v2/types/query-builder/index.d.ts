declare type Operator =
    "eq" |
    "gt" |
    "gte" |
    "in" |
    "lt" |
    "lte" |
    "ne" |
    "nin" |
    "regex"|
    "exists"

declare interface Query {
    header: string;
    operator: Operator;
    value: string;
}
