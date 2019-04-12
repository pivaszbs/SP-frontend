import React, { Component } from 'react'
import { Grid, Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import RestService from '../../../services/rest-service';
import CategoryCard from '../main-page/category-card';
import ListOfItems from '../main-page/list-of-items';
import { withStyles } from '@material-ui/core';
const style = theme => ({
    label: {
        color: "white"
    },
    root: {
        color: "white"
    }
});
class Categories extends Component {
    restService = new RestService();

    state = {
        categories: [],
        display: true
    }

    componentDidMount = () => {
        this.restService.getAllCategories().then(res => {
            this.setState({ categories: res })
        })
    }

    handleChange = (name, checked) => {
        let newState = { ...this.state };
        for (let i = 0; i < newState.categories.length; i++) {
            if (newState.categories[i].value === name) {
                newState.categories[i].display = checked;
            }
        }
        for (let i = 0; i < newState.categories.length; i++) {
            if (newState.categories[i].display === undefined) {
                newState.categories[i].display = false;
            }
        }
        let flag = false;
        for (let i = 0; i < newState.categories.length; i++) {
            flag = flag || newState.categories[i].display;
        }
        newState.display = !flag;
        this.setState(newState);
    }

    render() {
        const { classes } = this.props;
        const categories = this.state.categories.map(item => (
            <CategoryCard key={item.value} name={item.display_name} />
        ));

        const categoriesAndItems = this.state.categories.map(item => (
            <div key={item.value} className='categories'>
                <ListOfItems
                    display={this.state.display ? true : item.display}
                    items={this.restService.getAllItemsOfCategory(item.value)}
                    category_name={item.display_name}
                />
            </div>
        ));

        const сheckboxes = this.state.categories.map(item => (
            <FormControlLabel
                key={item.value}
                label={item.display_name}
                classes={{
                    root: classes.root,
                    label: classes.label
                }}
                control={
                    <Checkbox
                    className={classes.label}    
                    onChange={(event, checked) => this.handleChange(item.value, checked)} value={item.value} />
                    }
            />
        ));
        return (
            <React.Fragment>
                <div className="main-page_checkbox">
                    <FormControl component="fieldset">
                        <FormLabel classes={{root: classes.root}} component="legend">Categories</FormLabel>
                        <FormGroup>
                            {сheckboxes}
                        </FormGroup>
                    </FormControl>
                </div>
                <div className="container">
                    <Grid container direction='column' className="main" justify='space-between'>
                        <Grid container direction='row' justify='space-between'>
                            {categories}
                        </Grid>
                        {categoriesAndItems}
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(style)(Categories)