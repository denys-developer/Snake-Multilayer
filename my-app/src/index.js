import React from 'react';
import ReactDom from 'react-dom';
import socket from './components/socket';
import { Field } from './components/Field/field';
import { func } from 'prop-types';
import { Select_Size } from './components/Select_Size/select_size';
import { GameForm } from './components/Game-Form/game-form';
import { RoomList } from './components/Room_lists/room-lists';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './style.css';
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
socket.on('select_size', () => {
    ReactDom.render(
        (
            <Select_Size />
        ), document.getElementById('root'));
});
ReactDom.render((
    <div className="list">
        <GameForm />
        <RoomList />
    </div>
), document.getElementById('root'));
socket.on('wait_other_players', () => {
    ReactDom.render(
        (
            <h1>please wait for other players
           </h1>
        ), document.getElementById('root'));
})








