import styled from "styled-components";

export const Container = styled.div`
    background-color: #101116;
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    // width: 256px;
`;

export const Display = styled.div`
    height: 75px;
    font-size: 25px;
    font-weight: 500;
    letter-spacing: 1px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: .75rem;
    word-wrap: break-word;
    word-break: break-all;

    .previous-operand {
        color: rgba(255, 255, 255, .75);
        font-size: 1.5rem;
    }

    .current-operand {
        color: white;
        font-size: 2.5rem;
    }
`;

export const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(70px, auto);
    // gap: 10px;

    .digit{
        min-width: 70px;
        font-size: 16px;
        background: #262834;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;
    }

    .clear{
        grid-column: 1/3;
        grid-row: 1;
        color: #262834;
    }

    .del{
        color: #262834;
    }

    .result{
        grid-column: 3/5;
        grid-row: 5;
        color: #262834;
    }

    .highlight{
        background: #56cbdb;
    }
`;