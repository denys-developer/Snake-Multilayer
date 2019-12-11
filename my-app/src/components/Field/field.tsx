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
    status: boolean;
}
@observer
export class Field extends React.Component<Props>{
    game: Game;
    @observable anotherSnake: JSX.Element[] = [];
    users: Number[] = [];
    size: number | undefined;
    
    constructor(props: Props) {
        super(props);
        this.game = new Game();
        socket.on('add_players', (ident: Number[]) => {
            console.log(ident);
            console.log(this.game.snake.snakeId);
            var newArray = ident.filter((item, index) => {
                return this.game.snake.snakeId != item
            })
     console.log(newArray);
            this.anotherSnake = newArray.map((item, index) => {
                return (
                    <AnotherSnake game={this.game} id={item} />
                )
            })
        })
        socket.on('setFiledSize', (size: number) => {
            this.size = size;
        })
    }
    componentWillMount() {
        this.game.snake.setSnakeId(this.props.id);
    }
    render() {
        var width = this.size + 'px';
        var height = this.size + 'px';
        return (
            <div>
                <ScoreComponent game={this.game} />
                <svg width={width} height={height} className="field">
                    <SnakeComponent game={this.game} status={this.props.status} />
                    <BallComponent game={this.game} />
                    {this.anotherSnake}
                </svg>
            </div>
        )
    }
}