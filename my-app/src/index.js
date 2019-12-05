import React from 'react';
import ReactDom from 'react-dom';
import socket from './components/socket';
import { Field } from './components/Field/field';
import { func } from 'prop-types';
socket.emit('join-game');
ReactDom.render(
    (
        <h1>please wait for other players
       </h1>
    ), document.getElementById('root'));
socket.on('start_game', () => {
    ReactDom.render(
        (
            <div>
                <Field />
            </div>
        ), document.getElementById('root'));
})






