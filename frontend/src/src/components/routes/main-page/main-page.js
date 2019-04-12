import React, { Component } from 'react';
import './main-page.css';
import ItemSearch from './search';
import RestService from '../../../services/rest-service';
import CategoryCard from './category-card'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import ItemCard from './item-card/item-card';
const style = theme => ({
  cards: {
    marginTop: 30
  },
  card: {
    textAlign: "center",
    marginBottom: 10,
    height: 250
  },
  1: {
    backgroundColor: "#e94a62"
  },
  2: {
    backgroundColor: '#fc7440'
  },
  3: {
    backgroundColor: '#00f9fa',
  },
  4: {
    backgroundColor: '#0dff76',
  }
});

class MainPage extends Component {
  restService = new RestService();

  state = {
    categories: [],
    items: [],
    display: true
  }

  componentDidMount = () => {
    this.restService.getAllCategories().then(res => {
      this.setState({ categories: res });
    });
    this.restService.getAllItems().then(res => {
      this.setState({ items: res });
    });
  }

  additionalProps = {
    1: "first",
    2: "second",
    3: "third",
    4: "fourth"
  }

  render() {
    const { classes } = this.props;

    const categories = this.state.categories.map((item, i) => (
      <CategoryCard key={item.value} name={item.display_name} styles={classes[i + 1]} ap={this.additionalProps[i + 1]} />
    ));

    const itemsForView = this.state.items.slice(0,8);
    
    const items = itemsForView.map(item => (
      <div className="grid-item">
        <Link to={`item/${item.id}`}>
          <ItemCard
            className={classes.card}
            image={item.image}
            title={item.title}
            emptyCard={false}
            price={item.price}
          />
        </Link>
      </div>
    ))

    return (
      <div className="container">
        <h1 className="main-page-title">
          <span className="main-page-title__left">Don’t buy. </span>
          <span className="main-page-title__right">Just rent.</span>
        </h1>
        <ItemSearch />
        <div className="grid-container">
          {categories}
        </div>
        <div className="center">
          <div className="grid-items-container">
            <div className="grid-item">
              <Link to="/new-item-page">
                <ItemCard
                  className={classes.card}
                  emptyCard
                />
              </Link>
            </div>
            {items}
          </div>
        </div>
      </div>
    )
  }
}


export default withStyles(style)(MainPage);