import React, { Component } from 'react';
import {
    loginAction
  } from '../actions';
  import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            account : {
                username: '',
                password: ''
            },
            errMsg: null,
            errLogin: false
        }
    }

    onChange = ({currentTarget}) => {
        const account = {...this.state.account}
        account[currentTarget.name] = currentTarget.value;
        this.setState({account, errLogin: false})
    }

    doSubmit = (e) => {
        const {  loginAction, loginPageData } = this.props;
        e.preventDefault();
        loginAction(this.props, this.state.account);
        if(!loginPageData.loginBtnEnabledStatus || loginPageData.loginBtnEnabledStatus === false) {
            this.setState({
                errMsg: loginPageData.errMsg,
                errLogin: true     
            })
        }  
    }
    render() {
        let displayError = "";
        if(this.state.errLogin === true) {
            displayError = <span style={{color:'red'}}>Please provide valid credentials</span>;
        }
        return (
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            {displayError}
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin" onSubmit={this.doSubmit}>
                                <div className="form-label-group">
                                    <input onChange={this.onChange} type="text" id="username" name="username" className="form-control" placeholder="Username" required />
                                    <label htmlFor="inputEmail">Username</label>
                                </div>
                                <div className="form-label-group">
                                    <input onChange={this.onChange} type="password" name="password" id="password" className="form-control" placeholder="Password" required />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      loginPageData: state.loginReducer
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      loginAction: dispatch(loginAction)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);