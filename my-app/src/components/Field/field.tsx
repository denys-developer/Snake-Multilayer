import React from 'react';
import SnakeComponent from '../Snake/snake';
import BallComponent from '../Ball/ball';
import AnotherSnake from '../Another-snake/anotherSnake';
import './field.css'
import { Game } from '../game';
import { ScoreComponent } from '../Score/score';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Block } from '../Block/block';
import socket from '../socket';
@observer
export class Field extends React.Component {
    game: Game;
    @observable anotherSnake: JSX.Element | undefined;
    constructor(props: Readonly<{}>) {
        super(props);
        this.game = new Game();
    }
    componentDidMount() {
        this.anotherSnake = <AnotherSnake game={this.game} />
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