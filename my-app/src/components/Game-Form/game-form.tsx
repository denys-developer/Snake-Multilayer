import React from 'react';
import socket from '../socket';
export class GameForm extends React.Component {
    roomName: String = '';
    constructor(props: Readonly<{}> ) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.changeRoomName = this.changeRoomName.bind(this);
   
    }
    createRoom() {
        socket.emit('create_room',this.roomName);
    }
    changeRoomName(event: any) {
        this.roomName = event.target.value;
    }
    render() {
        return (
            <div>
                    <h1>Create room</h1>
                    <input type="text" placeholder="Room name" onChange={this.changeRoomName} />
                    <input type="button" value="Create Room" onClick={this.createRoom} />

            </div>
        )
    }
}