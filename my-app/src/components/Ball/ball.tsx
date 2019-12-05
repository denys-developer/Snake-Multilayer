import React from 'react';
import { Game } from '../game';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { string } from 'prop-types';
import socket from '../socket';
interface Props {
    game: Game;
}
export class Ball {
    roomName: String | undefined;
    @observable coordinate: { x: Number, y: Number } = {
        x: 0,
        y: 0
    }
    constructor() {
    }
    @action genericBall() {
        socket.emit('genricBall');
        socket.on('ball', (coordinate: { x: Number, y: Number }) => {
            this.coordinate = coordinate;
        });
    }
    @action changeBallCoordinate() {
        socket.emit('changeBallCoordinate');
        socket.on('ballNew', (coordinate: { x: Number, y: Number }) => {
            this.coordinate = coordinate;
        });
    }
}
@observer
export default class BallComponent extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }
    componentWillMount() {
        this.props.game.ball.genericBall();
    }

    render() {
        var { x, y } = this.props.game.ball.coordinate;
        return (
            <rect x={String(x)} y={String(y)} width="10" height="10" />
        )
    }

}