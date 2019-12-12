import React from 'react';
import { observable } from 'mobx';
import socket from '../socket';
import { observer } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import ListSubheader from '@material-ui/core/ListSubheader';

interface Props {
    status: boolean;
}

@observer
export class RoomList extends React.Component<Props>{
    rooms: String[] = [];
    myRef: any;
    @observable roomsList: JSX.Element[] | undefined;
    constructor(props: Props) {
        super(props);
        socket.on('add_room', (rooms: String[]) => {
            this.roomsList = rooms.map((item, index) => {
                return (
                    <ListItem key={index} button  onClick={() => this.connectToRoom(item)}>
                        {item}
                    </ListItem>
                )
            })
        })
    }
    connectToRoom = (room: String) => {
        socket.emit('room_connection', { room: room, status: this.props.status });
    }
    componentDidMount() {
    }
    render() {
        return (
            <ul>
                <List
                    subheader={
                        <ListSubheader component="h1" id="nested-list-subheader">
                            Rooms
                            </ListSubheader>
                    }>
                    {this.roomsList}
                </List>

            </ul>
        )
    }
}