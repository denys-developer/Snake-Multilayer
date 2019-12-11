import React from 'react';
import './select_size.css';
import { number } from 'prop-types';
import socket from '../socket';
export class Select_Size extends React.Component {
    field: number = 200;
    snake: number = 10;
    constructor(props: Readonly<{}>) {
        super(props);
    }
    SaveSelect = () => {
        socket.emit('set_size', { snake: this.snake, field: this.field });
    }
    selectSnakeSize = (event: any) => {

        this.snake = parseInt(event.target.value);
    }
    selectFieldSize = (event: any) => {
        this.field = parseInt(event.target.value);
    }
    render() {
        return (
            <div>
                <h1>
                    Select snake size
           <select className="select custom-select custom-select-lg mb-3" onChange={this.selectSnakeSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </h1>
                <h1>
                    Select field size
             <select className="select custom-select custom-select-lg mb-3" onChange={this.selectFieldSize}>
                        <option value="200"> 200</option>
                        <option value="400">400</option>
                        <option value="600">600</option>
                    </select>
                </h1>
                <button className="btn btn-secondary" onClick={this.SaveSelect}> Save</button>
            </div>

        )
    }
}