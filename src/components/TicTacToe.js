import React, { useState } from "react";
import '/Users/maka/personal_projects/tic-tac-toe/src/TicTacToe.css';

const TicTacToe = () => {

    const [turn, setTurn] = useState('x');
    const [cells, setCells]= useState(Array(9).fill(''));
    const [winner, setWinner] = useState();

    const checkForWinner = (squares)=>{
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diag: [
                [0, 4, 8],
                [2, 4, 6],
            ]
        };

        for (let combo in combos) {
            combos[combo].forEach((pattern) =>{
                if (
                    // if pattern combo is empty in cells array
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ){
                    // do nothing
                } else if (
                    // if pattern combo match
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]) {
                        setWinner(squares[pattern[0]]);
                }
            })
        }
    }

    const handleClick = (num) =>{
        // to avoid clicking same cell twice
        if (cells[num] !== ''){
            alert('This has already been clicked')
            return;
        }
        
        let squares = [...cells];
// when i click on box the turn should change from x to o
        if (turn === 'x') {
            squares[num] = 'x' // putting x in empty index when clicked
            setTurn('o')
        } else {
            squares[num] = 'o' // putting o in empty index when clicked
            setTurn('x')
        }
        checkForWinner(squares)
        setCells(squares)
        // console.log(squares)
    } 
    const handleRestart = () =>{
        setWinner(null);
        setCells(Array(9).fill(''))
        setTurn('x')
    }

    const Cell = ({ num }) =>{
        return <td onClick={()=> handleClick(num)}>{cells[num]}</td>
    };
    return (
        <div className="container">
            <h1>Tic-Tac-Toe</h1>
        <h3 className="turn">Turn: {turn}</h3>
        <div className="game-board">
            <table>
                <tbody>
                    <tr>
                        <Cell num={0}/>
                        <Cell num={1}/>
                        <Cell num={2}/>
                    </tr>
                    <tr>
                        <Cell num={3}/>
                        <Cell num={4}/>
                        <Cell num={5}/>
                    </tr>
                    <tr>
                        <Cell num={6}/>
                        <Cell num={7}/>
                        <Cell num={8}/>
                    </tr>
                </tbody>
            </table>
        </div>
            
            {winner && (
                <>
                <h3 className="winner">{winner} is the winner!</h3>
                <button onClick={()=> handleRestart()}>Play Again</button>
                </>
            )}
            
        </div>
    );
}

export default TicTacToe;