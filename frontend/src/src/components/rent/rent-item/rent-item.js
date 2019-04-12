import React, { Component } from 'react';
import './rent-item.css';
import RestService from '../../../services/rest-service';
import { CardMedia, Card, CardActionArea, CardContent, Typography, withStyles, CardActions, Button, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const style = theme => ({
   root: {
      maxWidth: 500,
      textAlign: "center",
      margin: "auto"
   },
   button: {
      width: "50%"
   }
});

class RentItem extends Component {
   restService = new RestService();
   state = {
      isDeleted: false,
      modifyMode: false,

   };

   componentDidMount() {
      this.restService.getItem(this.props.match.params.id).then(res => {
         this.setState(res);
      })
   }

   onDelete = (event) => {
      this.restService.deleteItem(this.state.id)
         .then(res => {
            if (res.status === 204) {
               return res;
            } else {
               throw new Error("Some shit every time happens");
            }
         })
         .then(() => {
            this.setState({ isDeleted: true });
         })
         .catch(() => {
            this.setState({ isDeleted: true });
         })
   }

   onEdit = (event) => {
      this.setState({ modifyMode: true });
   }

   submitForm = (event) => {
      event.preventDefault();
      let restService = new RestService();
      let dataToSubmit = {};
      for (let key in this.state.formdata) {
         dataToSubmit[key] = this.state.formdata[key];
      }
      restService.updateItem(dataToSubmit, this.state.id).then(res => {
         if (res.status === 200) {
            return res;
         } else {
            throw new Error("suck dick please");
         }
      })
         .then(this.restService.getItem(this.state.id))
         .then(res => {
            return res.json();
         })
         .then(res => {
            this.setState(res);
            this.setState({ modifyMode: false });
         });
   }

   onFormChange = (event, name) => {
      const newFormdata = { ...this.state.formdata }
      newFormdata[name] = event.target.value;
      this.setState({ formdata: newFormdata });
   }

   render() {
      const item = this.state;
      const { classes } = this.props;
      if (item.isDeleted) {
         return (
            <Redirect to="/" />
         )
      }
      if (item.modifyMode) {
         return (
            <div className="container">
               <Card
                  classes={{ root: classes.root }}>
                  <CardMedia
                     component="img"
                     alt={item.title}
                     title={item.title}
                     src={`http://greensecurity.ru:42422/${item.image}`}
                  />
                  <CardActionArea>
                     <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                           <TextField key="title" onChange={(event) => { this.onFormChange(event, "title") }} placeholder={`Title: ${item.title}`} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                           <TextField id="description" key="description" onChange={(event) => { this.onFormChange(event, "description") }} placeholder={`Description: ${item.description}`} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                           <TextField type="number" id="price" key="price" onChange={(event) => { this.onFormChange(event, "price") }} placeholder={`Price: ${item.price}`} />
                        </Typography>
                     </CardContent>
                  </CardActionArea>
                  <CardActions>
                     <Button onClick={this.submitForm} style={{ width: "100%" }} size="large" color="primary">
                        Save changes
                        </Button>]
                     </CardActions>
               </Card>
            </div>
         );
      }
      return (
         <div className="container">
            <Card
               classes={{ root: classes.root }}>
               <CardMedia
                  component="img"
                  alt={item.title}
                  title={item.title}
                  src={item.image ? `http://greensecurity.ru:42422/${item.image}` : null}
               />
               <CardActionArea>
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="h2">
                        Title: {item.title}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="h2">
                        Description: {item.description}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="h2">
                        Price: {item.price}
                     </Typography>
                  </CardContent>
               </CardActionArea>
               <CardActions>
                  <Button onClick={this.onEdit} className={classes.button} size="large" color="primary">
                     Edit
                    </Button>
                  <Button onClick={this.onDelete} className={classes.button} size="large" color="primary">
                     Delete
                    </Button>
               </CardActions>
            </Card>
         </div>
      );
   }
};

export default withStyles(style)(RentItem);