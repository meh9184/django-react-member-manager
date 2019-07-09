import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props){
        this.state = {
            loginId: '',
            loginPw: '',
        }

        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangePw = this.handleChangePw.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeId(event){
        this.setState({ loginId: event.target.value });
    }

    handleChangePw(event){
        this.setState({ loginPw: event.target.value });
    }

    handleSubmit(event){
        console.log('this.loginId -> ', this.loginId);
        console.log('this.loginPw -> ', this.loginPw);
    }


    render(){
        return (
            <div>
                <div className="login-container"/>
            </div>
        );
    }
}

export default Login;