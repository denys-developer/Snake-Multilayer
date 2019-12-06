import { Snake } from "./snake";
import { Game } from "../game";
import socket from "../socket";
export class SnakeAction {
    constructor(public game: Game) {
    }
    eatBall(coordinate: { x: number, y: number }) {
        let ballCoordinate = this.game.ball.coordinate;
        var color = this.game.ball.color;
        if ((coordinate.x >= ballCoordinate.x && coordinate.x <= ballCoordinate.x) && (coordinate.y >= ballCoordinate.y && coordinate.y <= ballCoordinate.y)) {
            this.game.ball.changeBallCoordinate();
            this.game.score.addScore();
            this.game.snake.addBlocks(color);
        }
        if (coordinate.x < 0 || coordinate.x > 990 || coordinate.y < 0 || coordinate.y > 590) {
            socket.emit('return_game');
        }
        
    }
}