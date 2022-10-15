
// only and as a logical operator is supported
const AND = "AND";

const operators = [
    "eq",
    "gt",
    "gte",
    "in",
    "lt",
    "lte",
    "ne",
    "nin",
    "regex",
    "exists",
    // add time operators
]

const validateOperator = (operator) => {
    if (operators.includes(operator)) {
        return true
    }
    
    throw new Error("Invalid operator")
}

const parseQuery = (query) => {
    try {
        const queries = query.split(" " + AND + " ")
        const parsedQueries = queries.map((query) => {
            const [key, operator, value] = query.split(":")

            validateOperator(operator)

            return {
                key,
                operator,
                value
            }
        })
        return parsedQueries
    } catch (e) {
        return []
    }   
}

module.exports = {
    parseQuery
};