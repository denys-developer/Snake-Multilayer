import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import './auth.css';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import socket from '../socket';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const axios = require('axios').default;
@observer
export class Authorazation extends React.Component {
    authStatus: boolean | undefined;
    login: string | undefined;
    password: string | undefined;
    nickname: string | undefined;
    @observable errorPassword: boolean = false;
    @observable errorLogin: boolean = false;
    constructor(props: Readonly<{}>) {
        super(props);
    }
    setLogin = (event: any) => {
        this.login = event.target.value;
    }
    setPassword = (event: any) => {
        this.password = event.target.value;
    }
    setNickName = (event: any) => {
        this.nickname = event.target.value;
    }
    Login = () => {
        axios
            .post('http://localhost:8080/user/login',
                {
                    login: this.login,
                    password: this.password,
                    nickname: this.nickname
                })
            .then((response: any) => {
                if (response.data == true) {
                    this.authStatus = true;
                    socket.emit('success_login', this.authStatus);
                }
                else if (response.data == 'Wrong password') {
                    this.errorPassword = true;
                }
                else {
                    this.errorLogin = true;
                }
            })
    }
    PlayAsGuest = () => {
        this.authStatus = false;
        socket.emit('success_login', this.authStatus);
    }
    Registration = () => {
        axios
            .post('http://localhost:8080/user/register',
                {
                    login: this.login,
                    password: this.password,
                    nickname: this.nickname
                })
            .then((response: any) => {
                console.log(response);
            })
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="container">
                <p>
                    <TextField className="textField" id="standard-basic" label="Your nick in game" onChange={this.setNickName} />
                </p>
                <p>
                    <TextField type="email" error={this.errorLogin} className="textField" id="standard-basic" label="Login" onChange={this.setLogin} />
                </p>
                <p>
                    <TextField error={this.errorPassword} className="textField" id="standard-basic" label="Password" onChange={this.setPassword} />
                </p>
                <div className="buttons">
                    <Button className="button" variant="outlined" color="primary" onClick={this.Registration}>
                        Registrate
                 </Button>
                    <Button className="button" variant="outlined" onClick={this.Login}>Login</Button>
                    <Button className="button" variant="outlined" color="secondary" onClick={this.PlayAsGuest}>
                        Play as guest
                </Button>
                </div>
            </div>
        )
    }
}