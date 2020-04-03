import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import AppContext from '../context/AppContext';

export default function Setup() {
    return (
        <AppContext.Consumer>
            {
                context => (
                    <Formik
                        initialValues = {{ playerName: context.playerName, roomId: context.roomId }}
                        onSubmit = { 
                            (values) => {
                                context.setParams(values);
                            }
                        }
                    >
                        {() => (
                        <Form>
                            <Field name="playerName"/>
                            <ErrorMessage name="playerName" component="div" />
                            <Field name="roomId"/>
                            <ErrorMessage name="roomId" component="div" />
                            <button type="submit">
                                Submit
                            </button>
                        </Form>
                    )}
                    </Formik>
                )
            }

        </AppContext.Consumer>
        
    )
}