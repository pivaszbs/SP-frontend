import React, { Component } from 'react'
import RestService from '../../../services/rest-service';

export default class UserInfo extends Component {

    restService = new RestService();

    state = {
        //TODO modify mode
        modifyMode: false,
        error: false,
        user: {
            //From DB
        }
    }

    componentDidMount = () => {
        this.restService.getCurrentUser(this.props.token)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error("stuped no such user exception");
        }
    })
    .then(res=> {
        this.setState({user: res});
    })
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">

            </div>
        )
    }
}
