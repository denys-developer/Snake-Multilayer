import React from 'react';
import { observable } from 'mobx';
import socket from '../socket';
import { observer } from 'mobx-react';


@observer
export class RoomList extends React.Component {
    rooms: String[] = [];
    myRef: any;
    @observable roomsList: JSX.Element[] | undefined;
    constructor(props: Readonly<{}>) {
        super(props);
        this.myRef = React.createRef();
    }
    connectToRoom = (room: String) => {
       socket.emit('room_connection',room);
    }
    componentWillMount() {
        socket.on('add_room', (rooms: String[]) => {
            console.log(rooms);
            this.roomsList = rooms.map((item, index) => {
                return (
                    <li ref={this.myRef} key={index} onClick={() => this.connectToRoom(item)}>{item}</li>
                )
            })

        })
    }
    render() {
        return (
            <div>
                <h1>Rooms List</h1>
                <ul>
                    {this.roomsList}
                </ul>
            </div>

        )
    }
}