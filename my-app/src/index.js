import React from 'react';
import ReactDom from 'react-dom';
import socket from './components/socket';
import { Field } from './components/Field/field';
import { func } from 'prop-types';
var PlayerId = Math.random();
socket.emit('join-game', PlayerId);
socket.on('setId', (id) => {
    socket.on('start_game', () => {
        ReactDom.render(
            (
                <div>
                    <Field id={id} />
                </div>
            ), document.getElementById('root'));
    })

})
ReactDom.render(
    (
        <h1>please wait for other players
       </h1>
    ), document.getElementById('root'));







