import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Placeholder from './avatar-image.png';
import { Button } from '@material-ui/core';
import { MyLink } from '../ui/misc';

const styles = {
  bigAvatar: {
    display: "inline-flex",
    margin: 10,
    width: 60,
    height: 60,
  },
  username: {
    textDecoration: "none",
    textTransform: "none",
    color: "white"
  }
};

function AvatarImage(props) {
  const { classes } = props;
  return (
    <Button className={classes.button} component={MyLink} to="/user-info">
      <Avatar alt="Remy Sharp" src={Placeholder} className={classes.bigAvatar} />
      <span className={classes.username}>User name</span>
    </Button>
  );
}

AvatarImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvatarImage);