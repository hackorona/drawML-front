import React from 'react';
import io from 'socket.io-client';

const AppContext = React.createContext();

class AppContextProvider extends React.Component {

    state = {
        roomId: '',
        playerName: '',
        socket: null,
    };
    createSocket = () => {
        console.log('creating socket');
        const socket = io('http://localhost:5000');
        this.setState({
            socket
        });
    }

    render() {
        return (
        <AppContext.Provider value = {{ 
            roomId: this.state.roomId,
            playerName: this.state.playerName,
            socket: this.state.socket,
            setParams: (params) => {
                this.setState({ playerName: params.playerName, roomId: params.roomId });
                this.createSocket();
       
            },
        }}>
            {this.props.children}
        </AppContext.Provider>
        )
    }
}

export { AppContextProvider };
export default AppContext;