import React from 'react';
import './category-card.css';
import { scroller } from 'react-scroll';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 250,
        textAlign: "center",
        marginBottom: 10
    },
    text: {
        display: "inline-block",
        paddingTop: "10%",
        paddingBottom: "10%"
    },
    content: {
        height: "100%"
    }
};

function CategoryCard(props) {
    const scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -80
        });
    }
    const { classes, name, styles, ap } = props;
    return (
        <Card className={classes.card + " " + styles + " " + ap} onClick={() => scrollToElement(props.name)}>
            <CardActionArea className={classes.content}>
                <CardContent>
                    <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


CategoryCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryCard);