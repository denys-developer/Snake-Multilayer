import { Snake } from './Snake/snake';
import { Ball } from './Ball/ball';
import { Score } from './Score/score';
export class Game {
    score: Score;
    snake: Snake;
    ball: Ball;
    constructor() {
        this.snake = new Snake();
        this.ball = new Ball();
        this.score = new Score();
    }
}