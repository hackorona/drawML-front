import React from 'react';

import AppContext from '../context/AppContext';
import CanvasDraw from "react-canvas-draw";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Results(props) {
    return (
        <AppContext.Consumer>
            {
                context => (
                    <>
                        <h3>Player {context.winner} won!!</h3>
                        <button onClick={ props.rematch }>Rematch</button>
                        <Container>
                            <Row>
                            {
                                props.drawings.forEach(element => {
                                    return (
                                        <Col>
                                            <CanvasDraw
                                                disabled
                                                hideGrid
                                                ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                                                saveData={element}
                                            />
                                        </Col>
                                    )
                                    
                                })
                            }
                            </Row>
                        </Container>
                        
                    </>
                )
            }
        </AppContext.Consumer>
    )

}