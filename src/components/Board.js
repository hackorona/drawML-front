import React from 'react';
import AppContext from '../context/AppContext';

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
        return(
        <AppContext.Consumer>
            {
                context => (
                    <>
                        <h1>Welcome to room {context.roomId}</h1>
                        <button onClick={this.startChallenge}>Start</button>
                    </>

                    
                )
            }
        </AppContext.Consumer>
        )}
}

export default Board;

