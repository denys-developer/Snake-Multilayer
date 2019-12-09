import React from 'react';
import { observable } from 'mobx';
import socket from '../socket';
import { observer } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


@observer
export class RoomList extends React.Component {
    rooms: String[] = [];
    myRef: any;
    @observable roomsList: JSX.Element[] | undefined;
    constructor(props: Readonly<{}>) {
        super(props);
        socket.on('add_room', (rooms: String[]) => {
            this.roomsList = rooms.map((item, index) => {
                return (
                    <div > 
                    <List key={index}>
                        <li onClick={() => this.connectToRoom(item)}>
                            <ListItem button>
                                {item}
                            </ListItem>
                        </li>
                    </List>
                    </div>
                )
            })

        })
    }
    connectToRoom = (room: String) => {
        socket.emit('room_connection', room);
    }
    componentDidMount() {

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