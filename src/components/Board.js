import React from 'react';
import AppContext from '../context/AppContext';

import CanvasDraw from "react-canvas-draw";
import Button from 'react-bootstrap/Button';


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
        definition: null
    }

    componentWillMount() {
        this.context.socket.on('connect', () => {
            console.log(`${this.context.playerName} Connected`);
             this.context.socket.emit(JOIN, { roomId: this.context.roomId });
         });

         this.context.socket.on(CHALLENGE, (data) => {
            console.log(`The challenge is ${data.definition}`);
            this.setState({ definition: data.definition })
         })
    }

    startChallenge = () => {
        this.context.socket.emit(START, { roomId: this.context.roomId });
        this.setState({
            displayDrawingTable: !this.state.displayDrawingTable 
        })
    }
   

    render(){
        
        return(
            <AppContext.Consumer>
                {
                    context => 
                        (
                        <>
                            <h1>Hello {context.playerName}, Welcome to room {context.roomId}</h1>
                            { this.state.definition && <h3>Draw { this.state.definition }</h3> }
                            <button onClick={this.startChallenge}>Start</button>
                            
                            {this.state.displayDrawingTable && 
                                <div className="App">
                                    <Button
                                        onClick={() => {
                                        console.log(JSON.parse(this.saveableCanvas.getSaveData()))
                                        
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => {
                                        this.saveableCanvas.clear();
                                        }}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        onClick={() => {
                                        this.saveableCanvas.undo();
                                        }}
                                    >
                                        Undo
                                    </Button>

                                    {/* <div className='drawContainer'> */}
                                        <CanvasDraw style={{ boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)", width: "80%", margin: "auto auto" } }
                                                    canvasWidth={400}
                                                    canvasHeight={400} 
                                                    lazyRadius = {0} 
                                                    brushRadius = {2}
                                                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                                                    

                                        />
                                    {/* </div> */}
                                     
                                </div>
                                
                            } 
                        </>
                    )
                }
            </AppContext.Consumer>
            )
    }
}

export default Board;

