import React from 'react';
import socket from '../socket';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class GameForm extends React.Component {
    roomName: String = '';
    constructor(props: Readonly<{}>) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.changeRoomName = this.changeRoomName.bind(this);

    }
    createRoom() {
        socket.emit('create_room', this.roomName);
    }
    changeRoomName(event: React.ChangeEvent<HTMLInputElement>) {
        this.roomName = event.target.value;
    }
    render() {
        return (
            <>
                <div className="left_column">
                    <h2>Create room</h2>
                    <TextField color="primary" id="standard-basic" label="room name" onChange={this.changeRoomName} />
                </div>

                <Button variant="outlined" color="primary" onClick={this.createRoom} >
                    Create Room
                </Button>

            </>
        )
    }
}