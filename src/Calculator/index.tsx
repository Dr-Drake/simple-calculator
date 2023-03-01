import React from 'react';
import { CalculatorActionType, calculatorReducer, CalculatorState, formatOperand } from './calculatorReducer';
import { ButtonGrid, Container, Display } from './styles';

const Calculator: React.FC<any> = ()=>{

    // Initial state
    let initialState: CalculatorState = {
        currentOperand: null,
        previousOperand: null,
        operation: null,
        overwrite: false
    }

    // Reducer
    const [state, dispatch] = React.useReducer(calculatorReducer, initialState);

    // Handlers
    const handleAddDigit = (digit: string)=>{
        dispatch({
            type: CalculatorActionType.ADD_DIGIT,
            payload: { digit: digit }
        })
    }
    const handleDeleteDigit = ()=>{
        dispatch({
            type: CalculatorActionType.DELETE_DIGIT,
            payload:{}
        })
    }
    const handleAddOperation = (operation: string)=>{
        dispatch({
            type: CalculatorActionType.CHOOSE_OPERATION,
            payload: { operation: operation }
        })
    }
    const handleClear = ()=>{
        dispatch({
            type: CalculatorActionType.CLEAR,
            payload:{}
        })
    }

    const handlEvaluate = ()=>{
        dispatch({
            type: CalculatorActionType.EVALUATE,
            payload:{}
        })
    }

    return(
        <Container>
            <Display>
            <div className="previous-operand">
                {formatOperand(state.previousOperand)} {state.operation}
            </div>
            <div className="current-operand">{formatOperand(state.currentOperand)}</div>
            </Display>
            <ButtonGrid>
                <button className='digit clear highlight' onClick={handleClear}>Clear</button>
                <button className='digit del highlight' onClick={handleDeleteDigit}>DEL</button>
                <button className='digit highlight' onClick={()=> handleAddOperation("/")}>&divide;</button>
                <button className='digit' onClick={()=>handleAddDigit("7")}>7</button>
                <button className='digit' onClick={()=>handleAddDigit("8")}>8</button>
                <button className='digit' onClick={()=>handleAddDigit("9")}>9</button>
                <button className='digit highlight' onClick={()=> handleAddOperation("*")}>&times;</button>
                <button className='digit' onClick={()=>handleAddDigit("4")}>4</button>
                <button className='digit' onClick={()=>handleAddDigit("5")}>5</button>
                <button className='digit' onClick={()=>handleAddDigit("6")}>6</button>
                <button className='digit highlight' onClick={()=> handleAddOperation("-")}>&ndash;</button>
                <button className='digit' onClick={()=>handleAddDigit("1")}>1</button>
                <button className='digit' onClick={()=>handleAddDigit("2")}>2</button>
                <button className='digit' onClick={()=>handleAddDigit("3")}>3</button>
                <button className='digit highlight' onClick={()=> handleAddOperation("+")}>+</button>
                <button className='digit' onClick={()=>handleAddDigit("0")}>0</button>
                <button className='digit' onClick={()=>handleAddDigit(".")}>.</button>
                <button className='digit result highlight' onClick={handlEvaluate}>=</button>
            </ButtonGrid>
        </Container>
    )
}

export default Calculator;