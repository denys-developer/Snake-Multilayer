import React from 'react';
import SnakeComponent from '../Snake/snake';
import BallComponent from '../Ball/ball';
import AnotherSnake from '../Another-snake/anotherSnake';
import './field.css'
import { Game } from '../game';
import { ScoreComponent } from '../Score/score';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import socket from '../socket';
import { number } from 'prop-types';
interface Props {
    id: Number;
}
@observer
export class Field extends React.Component<Props>{
    game: Game;
    @observable anotherSnake: JSX.Element[] = [];
    users: Number[] = [];
    constructor(props: Props) {
        super(props);
        this.game = new Game();
        socket.on('add_players', (ident: Number[]) => {
            var newArray = ident.filter((item, index) => {
                return this.game.snake.snakeId != item
            })
            this.anotherSnake = newArray.map((item, index) => {
                return (
                    <AnotherSnake game={this.game} id={item} />
                )
            })
        })
    }
    componentWillMount() {
        this.game.snake.setSnakeId(this.props.id);
    }
    render() {
        return (
            <div>
                <ScoreComponent game={this.game} />
                <svg id="field">
                    <SnakeComponent game={this.game} />
                    <BallComponent game={this.game} />
                    {this.anotherSnake}
                </svg>
            </div>
        )
    }
}