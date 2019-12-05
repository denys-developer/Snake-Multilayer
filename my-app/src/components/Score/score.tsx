import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Game } from '../game';
import socket from '../socket';
interface Props {
    game: Game;
}
export class Score {
    @observable yourScore:number = 0;
    @observable enemyScore: Number = 0;
    constructor() {
        socket.on('setEnemyScore', (score: Number) => {
            this.addEnemyScore(score);
        })
    }
    @action addEnemyScore(score: Number) {
        console.log(score);
        this.enemyScore = score;
    }
    @action addScore() {
        this.yourScore++;
        socket.emit('addScore', this.yourScore);
    }
}
@observer
export class ScoreComponent extends React.Component<Props> {
    yourScore: Number | undefined;
    enemyScore:Number | undefined
    constructor(props: Props) {
        super(props);

    }
    render() {
        this.yourScore = this.props.game.score.yourScore;
        this.enemyScore = this.props.game.score.enemyScore;
        return (
            <div>
                <div>Your score {this.yourScore} </div>
                <div>Enemy score {this.enemyScore} </div>
            </div>

        )
    }
}