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
    changeRoomName(event: any) {
        this.roomName = event.target.value;
    }
    render() {
        return (
            <div>
                <h1>Create room</h1>

                <TextField id="standard-basic" label="room name" onChange={this.changeRoomName} />
           
                <Button variant="outlined" color="primary" onClick={this.createRoom} >
                    Create Room
                </Button>

            </div>
        )
    }
}