import React, { Component } from 'react'
import {Card, CardBody, CardImg, CardTitle, CardText} from 'reactstrap';

export default class DishdetailComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    renderSelectedDish(dish){
        

        if(dish == null){
            return(
                <div></div>
            )
        }
        else{
            return(
            <div className="row">
                
                <div className="col-12 col-md-6 mt-3  ">
                    <Card >
                        <CardImg width="100%" src={dish.image} alt="Card image cap" />
                        <CardBody>
                        <CardTitle className="text-success">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>     
                </div>
                <div className="col-12 col-md-6 mt-3">
                <h1>Comments</h1>
                {dish.comments.map((comment) => (
                    <div key={comment.id}>
                        <h4 className="text-primary">{comment.comment}</h4>
                        <div className="row">
                            <div className="col-6">
                            <h5>By : {comment.author}</h5>
                            </div>
                            <div className="col-6">
                            <h5>Time : {comment.date}</h5>
                            </div>
                            <br/>
                        </div>

                    </div>

                ))}
                </div>
            </div>
            
            )
            
            
        }
    }
    render() {
        
        return (
            <div>
                {this.renderSelectedDish(this.props.selectedDish)}
            </div>
        )
    }
}
