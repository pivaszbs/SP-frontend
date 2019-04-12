import './header.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AvatarImage from './avatar-image';

const styles = {
   header: {
      backgroundColor: '#000000',
      boxShadow: 'none',
      padding: '10px 0',
      opacity: '0.8',
   },
   link: {
      textDecoration: 'none'
   },
   button: {
      textTransform: 'none',
      color: "white",
      fontSize: "20px"
   }
};

function Header(props) {

   const { classes } = props;

   const logreg = props.isLoggedIn ?
      <div className="right">
         <AvatarImage />
      </div>
      :
      <div className="right">
         <Link className={classes.link} to="/sign-in">
            <Button className={classes.button}>
               Registration
            </Button>
         </Link>
         <Link className={classes.link} to="/login">
            <Button className={classes.button}>
               Login
            </Button>
         </Link>
      </div>

   return (
      <AppBar
         position="fixed"
         className={classes.header}>
         <Toolbar style={{ display: 'flex', marginLeft: '40px'}}>
            <Link className={classes.link} to="/">
               <Button className={classes.button}>Menu</Button>
            </Link>
            <Link className={classes.link} to="/categories">
               <Button className={classes.button}>Categories</Button>
            </Link>
            {logreg}
         </Toolbar>
      </AppBar>
   );
}


export default withStyles(styles)(Header);