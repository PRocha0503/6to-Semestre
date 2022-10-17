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

declare type ReadableOperator = 
    "empieza con" |
    "contiene" |
    "termina con" |
    "es igual que" |
    "es distinto A" |
    "es mayor que" |
    "es mayor o igual que" |
    "es menor que" |
    "es menor igual que" |
    "existe" 

declare interface Query<T> {
    header: string;
    operator: T;
    value: string;
}

declare type QueryOperator = Query<Operator>
declare type ReadableQueryOperator = Query<ReadableOperator>