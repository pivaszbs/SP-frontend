import React, { Component } from 'react';
import './list-of-items.css';
import Item from '../item'
import Grid from '@material-ui/core/Grid';
import { Element } from 'react-scroll';

export default class ListOfItems extends Component {

    state = {
        items: []
    }

    componentDidMount = () => {
        this.props.items.then(res => {
            this.setState({ items: res })
        })
    }

    render() {
        const item = this.state.items.map(item => (
            <Item key={item.id} item_info={item} />
        ))
        if (this.props.display === undefined || this.props.display) {
            return (
                <Element name={this.props.category_name}>
                    <Grid container direction='row' justify='space-around' className="category">
                        {item}
                    </Grid>
                </Element>
            );    
        } else {
            return null;
        }
    }
}

