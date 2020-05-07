import React from 'react'
import {Card, CardBody, CardImg, CardTitle, CardText} from 'reactstrap';

const Comment = ({comment})=>{
    return(
    <div key={comment.id}>
        <h4 className="text-primary">{comment.comment}</h4>
        <div className="row">
            <div className="col-6">
            <h5>By : {comment.author}</h5>
            </div>
            <div className="col-6">
                <h5>Time : {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</h5>                            
            </div>
            <br/>
        </div>
    </div>
    )
}

const RenderSelectedDish = ({dish})=>{
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
                <Comment comment = {comment}/>    
            ))}
            </div>
        </div>
        )
    }
}


const Dishdetail = (props)=>{
    return (
        <div className="container">
            <RenderSelectedDish dish = {props.dish} />
        </div>
    )
}

export default Dishdetail;