import React from 'react'
import {Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const RenderDish = ({dish})=>{
    return(
        <div className="col-12 col-md-6 mt-3  ">
            <Card >
                <CardImg width="100%" src={dish.image} alt="Card image cap" />
                <CardBody>
                <CardTitle className="text-success">{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>     
        </div>
    )
}

const RenderComment = ({comments})=>{
    return(
        <div className="col-12 col-md-6 mt-3">
            <h1>Comments</h1>
            {comments.map(comment =>{
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
            })}
        </div>
    )
}


const Dishdetail = (props)=>{
    if(props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish = {props.dish}/>
                    <RenderComment comments = {props.comments}/>
                </div>
                
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
    
}

export default Dishdetail;