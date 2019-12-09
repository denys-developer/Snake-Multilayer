import { Snake } from "./snake";
import { Game } from "../game";
import socket from "../socket";
import { number } from "prop-types";
import { kMaxLength } from "buffer";
export class SnakeAction {
    fieldSize: number = 200;
    snakeSize: number = 10;

    constructor(public game: Game) {

        socket.on('setFiledSize', (size: number) => {
            this.fieldSize = size;
        })
        socket.on('setSnakeSize', (size: number) => {
            this.snakeSize = size;
        })
    }

    eatBall(coordinate: { x: number, y: number }) {
        let ballCoordinate = this.game.ball.coordinate;
        var color = this.game.ball.color;
        if ((coordinate.x >= ballCoordinate.x && coordinate.x <= (ballCoordinate.x + this.snakeSize)) && (coordinate.y >= ballCoordinate.y && coordinate.y <= (ballCoordinate.y + this.snakeSize))) {
            this.game.ball.changeBallCoordinate();
            this.game.score.addScore();
            this.game.snake.addBlocks(color);
        }

        if (coordinate.x < 0 || coordinate.x > this.fieldSize - 10 || coordinate.y < 0 || coordinate.y > this.fieldSize - 10) {
        
            socket.emit('return_game');
        }

    }
}