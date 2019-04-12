import './routes.css';
import { Route, Switch } from 'react-router-dom';
import MainPage from './main-page/main-page';
import SignUp from './signup-page/signup';
import Login from './login-page/login';
import React, { Component } from 'react'
import Header from '../header-footer/header';
import Footer from '../header-footer/footer';
import Categories from './categories-page/categories';
import RentItem from '../rent/rent-item/rent-item';
import NewItemPage from './new-item-page/new-item-page';
import UserInfo from './user-info';

export default class Routes extends Component {

  state = {
    user: {},
    token: null
  };

  onLogin = token => {
    this.setState({token});
  }

  render() {
    const { token } = this.state;
    const isLoggedIn = token == null ? false : true;
    return (
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} />
        <Switch>
          <Route {...this.props}
            render={() => (
              <Login
                isLoggedIn={isLoggedIn}
                onLogin={this.onLogin} />
            )}
            restricted={false} path="/login" />
          <Route {...this.props}
            render={() => (
              <SignUp
                isLoggedIn={isLoggedIn} />
            )}
            restricted={false} path="/sign-in" />
          <Route {...this.props} restricted={false} path="/user-info"
            render={() => (
              <UserInfo token={token} />
            )}
          />
          <Route {...this.props} restricted={false} path="/item/:id" exact component={RentItem} />
          <Route {...this.props} restricted={false} path="/categories" exact component={Categories} />
          <Route {...this.props}
            render={() => (
              <NewItemPage
                isLoggedIn={isLoggedIn} />
            )}
            restricted={false} path="/new-item-page" />
          <Route {...this.props}
            render={() => (
              <MainPage
                isLoggedIn={isLoggedIn} />
            )}
            restricted={false} path="/" />
        </Switch>

        <Footer />
      </React.Fragment>
    )
  }
}