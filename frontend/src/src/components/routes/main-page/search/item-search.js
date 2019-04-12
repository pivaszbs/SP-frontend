import React, { Component } from 'react';
import { Grid, Paper, IconButton, withStyles, InputBase } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const style = theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        paddingLeft: '25px',
        borderRadius: '40px',
        border: "3px solid #00ffff",
        backgroundColor: "#0a0c0d",
        marginBottom: "10vh"
    },
    input: {
        color: "white"
    },
    iconButton: {
        padding: 10,
        color: "white"
    },
    grid: {
        marginBottom: 20
    }
});

// Just a fancy form for now, functionality will be added later
// TODO: handleChange - event handler for controlled input
// TODO: handleSubmit - event handler for triggering search (passing roomSearch from the state)
class ItemSearch extends Component {

    state = {
        itemSearch: ''
    }

    handleType = event => {
        this.setState({ itemSearch: event.target.value });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={12} className={classes.grid}>
                <Paper className={classes.paper}>
                    <IconButton className={classes.iconButton}>
                        <SearchIcon />
                    </IconButton>
                    <InputBase name='itemSearch' className={classes.input} onChange={this.handleType} value={this.state.roomSearch} placeholder='Type to search a item...' fullWidth type='search' />
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(style)(ItemSearch);