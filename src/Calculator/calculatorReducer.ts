// Types
export interface CalculatorState{
    currentOperand?: string | null;
    previousOperand?: string | null;
    operation?: string | null;
    overwrite?: boolean | null;
}

export interface CalculatorPayload{
    digit?: string;
    operation?: string;
}

export enum CalculatorActionType {
    ADD_DIGIT = "ADD_DIGIT-digit",
    CHOOSE_OPERATION = "CHOOSE_OPERATION-operation",
    CLEAR = "CLEAR",
    DELETE_DIGIT = "DELETE_DIGIT",
    EVALUATE = "EVALUATE",
}

export interface CalculatorAction{
    type: CalculatorActionType;
    payload: CalculatorPayload;
}


// Evalution function
function evaluate({ currentOperand, previousOperand, operation }: CalculatorState) {
    const prev = parseFloat(previousOperand || '')
    const current = parseFloat(currentOperand || '')
    if (isNaN(prev) || isNaN(current)) return "";

    let computation = 0;
    switch (operation) {
        case "+":
            computation = prev + current
            break

        case "-":
            computation = prev - current
            break

        case "*":
            computation = prev * current
            break

        case "/":
            computation = prev / current
            break
    }
  
    return computation.toString()
}


export const calculatorReducer = (state: CalculatorState, action: CalculatorAction) =>{
    let { type, payload } = action;

    switch (type) {

        case CalculatorActionType.ADD_DIGIT:
            if (state.overwrite) {
                return {
                  ...state,
                  currentOperand: payload.digit,
                  overwrite: false,
                }
            }

            // We don't want zero to follow zero if it's the first digit
            if (payload.digit === "0" && state.currentOperand === "0") {
                return state
            }

            // We don't want consecutive dots
            if (payload.digit === "." && state.currentOperand?.includes(".")) {
                return state
            }
    
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }

        case CalculatorActionType.CHOOSE_OPERATION:

            // If no previous value, no operator
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
    
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
    
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            }

        case CalculatorActionType.CLEAR:
            return {}

        case CalculatorActionType.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }

            if (state.currentOperand == null) return state

            if (state.currentOperand.length === 1) {
                return { ...state, currentOperand: null }
            }
        
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }
    
        case CalculatorActionType.EVALUATE:
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state
            }
        
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            }
    }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})


export function formatOperand(operand?: string | null) {
    if (!operand) return "";
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(Number.parseInt(integer))
    return `${INTEGER_FORMATTER.format(Number.parseInt(integer))}.${decimal}`
}