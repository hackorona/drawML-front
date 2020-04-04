import React from 'react';
import AppContext from '../context/AppContext';

import CanvasDraw from "react-canvas-draw";
import "./Board.css";

const ROOM_ID = 'roomId'
const JOIN = 'join'
const IDENTIFY = 'identify'
const USERNAME = 'username'
const IMAGE_MATRIX = 'matrix'
const GAME_OVER = 'gameOver'
const WINNER = 'winner'
const START = 'start'
const DEFINITION = 'definition'
const CHALLENGE = 'challenge'



class Board extends React.Component {
    static contextType = AppContext;

    state = {
        displayDrawingTable: false,
        start: false
    }

    displayQuestion = () => {
        this.setState({
            displayDrawingTable: !this.state.displayDrawingTable || !this.state.start,
        })
    }
    
    componentWillMount() {
        this.context.socket.on('connect', () => {
            console.log(`${this.context.playerName} Connected`);
             this.context.socket.emit(JOIN, { roomId: this.context.roomId });
         });

         this.context.socket.on(CHALLENGE, (data) => {
            console.log(`The challenge is ${data.definition}`);
         })
    }

    startChallenge = () => {
        this.context.socket.emit(START, { roomId: this.context.roomId });
    }
   

    render(){
        let drawingBoard = null;
        if ( this.state.displayDrawingTable ) {
            drawingBoard = (
                <div className="App">
                <h1>React-Canvas-Draw</h1>
                <h3>A simple yet powerful canvas-drawing component for React</h3>
                <iframe
                  title="GitHub link"
                  src="https://ghbtns.com/github-btn.html?user=embiem&repo=react-canvas-draw&type=star&count=true"
                  frameborder="0"
                  scrolling="0"
                  width="160px"
                  height="30px"
                />
               
                <CanvasDraw
                  style={{
                    boxShadow:
                      "0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)",
                     

                  } } canvasWidth={1200} canvasHeight={500} lazyRadius = {0} brushRadius = {2}
                />
                <p>
                  Like what you see? Play around in{" "}
                  <a href="https://codesandbox.io/s/6lv410914w">this CodeSandbox</a> & see
                  some more{" "}
                  <a href="https://embiem.github.io/react-canvas-draw/">Advanced Demos</a>
                  !
                </p>
              </div>


            );

        }


        return(
            <AppContext.Consumer>
                {
                    context => 
                        (
                        <>
                            <h1>Welcome to room {context.roomId}</h1>
                            <button onClick={this.startChallenge, this.displayQuestion}>Start</button>
                            {drawingBoard}
                        </>
                    )
                }
            </AppContext.Consumer>
            )
    }
}

export default Board;

