import React, { Component } from 'react';
import './item.css';

export default class Item extends Component{
  render() {
    //console.log(this.props.item_info);
    return (
            <div className="flip-card">
                    <div className="flip-card-inner">
                    <div className="flip-card-front">
                        {/* <img src={`http://35.240.151.168:42422/${this.props.item_info.image}`}> */}
                        <p>Image of Item {this.props.item_info.id}</p>
                    </div>
                    <div className="flip-card-back">
                        <h1>{this.props.item_info.title}</h1>
                        <p>{this.props.item_info.description}</p>
                        <p>Cost: {this.props.item_info.price} per month</p>
                    </div>
                </div>
            </div>
    )
  }
}

