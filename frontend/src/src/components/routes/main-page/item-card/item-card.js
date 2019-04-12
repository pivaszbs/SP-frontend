import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CardMedia, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
        width: "50%",
        paddingTop: 10
    },
    card: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 10,
        height: "100%",
        backgroundColor: "#000000",
        border: "3px solid transparent",
        borderImage: "linear-gradient(to bottom right, #1dfaf4 , #fa6442, #fa4c6c)",
        borderImageSlice: 1
    
    },
    text: {
        color: "white"
    },
    content: {
        height: "50%"
    },
    plus: {
        fontSize: "100px",
        color: "white",
    },
    price: {
        color: "#79c9e3",
        border: "2px solid #79c9e3"
    }
};

function ItemCard(props) {

    const { className, classes, image, title, emptyCard, price } = props;
    if (emptyCard) {
        return (
            <Card classes={{ root: classes.card }} className={className}>
                <CardActionArea style={{ height: "100%" }} className={classes.content}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <Icon className={classes.plus}>
                                add_circle
                        </Icon>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    } else {
        return (
            <Card classes={{ root: classes.card }}>
                <CardMedia
                    classes={{ root: classes.root }}
                    component="img"
                    alt={title}
                    title={title}
                    src={`http://greensecurity.ru:42422/${image}`}
                />
                <CardActionArea className={classes.content}>
                    <CardContent>
                        <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography className={classes.price} gutterBottom variant="h5" component="h2">
                            {price} rub.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

export default withStyles(styles)(ItemCard);