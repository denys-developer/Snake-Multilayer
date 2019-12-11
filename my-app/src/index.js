import React from 'react';
import ReactDom from 'react-dom';
import socket from './components/socket';
import { Field } from './components/Field/field';
import { Select_Size } from './components/Select_Size/select_size';
import { GameForm } from './components/Game-Form/game-form';
import { RoomList } from './components/Room_lists/room-lists';
import { Authorazation } from './components/Authorization/authorazation';
var PlayerId = Math.random();
var authStatus;

socket.emit('join-game');
socket.on('setId', (id) => {
    socket.on('start_game', () => {
        ReactDom.render(
            (
                <div>
                    <Field id={id} status={authStatus} />
                </div>
            ), document.getElementById('root'));
    })
})
socket.on('select_size', () => {
    ReactDom.render(
        (
            <Select_Size />
        ), document.getElementById('root'));
});
socket.on('snake_setting', (status) => {
    authStatus = status;
    var gameForm;
    if (authStatus) {
        gameForm = <GameForm />
    }
    else {
        gameForm = <div>You cannot create rooms until you are authorized
</div>
    }
    ReactDom.render((
        <div className="list">
            {gameForm}
            <RoomList status={status} />
        </div>
    ), document.getElementById('root'));
})
socket.on('auth',()=>{
    ReactDom.render((
        <Authorazation />
    ), document.getElementById('root'));
})

socket.on('wait_other_players', () => {
    ReactDom.render(
        (
            <h1>please wait for other players
           </h1>
        ), document.getElementById('root'));
})







