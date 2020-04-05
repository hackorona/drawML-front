import React from 'react';
import AppContext from '../context/AppContext';
// import Results from './results';
import CanvasDraw from "react-canvas-draw";
import Button from 'react-bootstrap/Button';
import { debounce } from 'lodash';

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
        winner: null,
        definition: null,
        size: 0.5 * window.screen.height
    }

    componentWillMount() {
        this.context.socket.on('connect', () => {
            console.log(`${this.context.playerName} Connected`);
             this.context.socket.emit(JOIN, { roomId: this.context.roomId, playerName: this.context.playerName });
         });

         this.context.socket.on(CHALLENGE, (data) => {
            console.log(`The challenge is ${data.definition}`);
            this.setState({ definition: data.definition })
         });

         this.context.socket.on(GAME_OVER, (data) => {
            console.log(`Game is over, The winner is ${data.winner}`);
            this.setState({ winner: data.winner });
            
         });
    }

    startChallenge = () => {
        this.context.socket.emit(START, { roomId: this.context.roomId });
    }

    rematch = () => {
        this.saveableCanvas.clear();
        this.startChallenge();
        this.setState( { winner: null });

    }


    sendDraw = (e) => {
        if (!this.debouncedFn) {
          this.debouncedFn =  debounce(() => {
            this.context.socket.emit(IDENTIFY, { roomId: this.context.roomId, playerName: this.context.playerName, drawObject: JSON.parse(this.saveableCanvas.getSaveData())})
            console.log('sending draw');
          }, 1000);
        }
        this.debouncedFn();
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
                            {/* {context.winner && <Results rematch={ this.rematch } drawings={ this.state.drawings }/>} */}
                            

                            <button onClick={this.startChallenge}>Start / Change definition </button>
                             
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
                                    <CanvasDraw style={{ boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)", margin: "2% auto" } }
                                                canvasWidth={this.state.size}
                                                canvasHeight={this.state.size} 
                                                lazyRadius = {0} 
                                                brushRadius = {7}
                                                ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                                                onChange={this.sendDraw}
                                                
                                    />
                                </div>
                                
                            
                        </>
                    )
                }
            </AppContext.Consumer>
            )
    }
}

export default Board;

