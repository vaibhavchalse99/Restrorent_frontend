import React, { Component } from 'react'
import {Card, CardBody, Row, CardImg,Label, CardTitle, CardText, Breadcrumb, BreadcrumbItem,Button, Modal,ModalBody,ModalHeader, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control,Errors} from 'react-redux-form';
import {Loading}  from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val)=> val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const RenderDish = ({dish})=>{
    return(
        <div className="col-12 col-md-6 mt-3  ">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card >
                <CardImg width="100%" src={baseUrl + dish.image} alt="Card image cap" />
                <CardBody>
                <CardTitle className="text-success">{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card> 
            </FadeTransform>    
        </div>
    )
}

class CommentForm extends Component {

    constructor(props){
        super(props)
        this.state={
            isModelOpen: false
        }
        this.toggleModel = this.toggleModel.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }
    handleForm(value){
        console.log(JSON.stringify(value))
        this.props.postComment(this.props.dishId, value.rating, value.author, value.comment)
    }

    toggleModel(){
        this.setState({
            isModelOpen: !this.state.isModelOpen
        })
    }

    render(){
        return(
            <React.Fragment>
                <Button onClick={this.toggleModel} color="secondary fa fa-pencil fa-lg">Submit Comment</Button>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel} >
                    <ModalHeader toggle={this.toggleModel}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value)=>this.handleForm(value)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col >
                                    <Control.select
                                    model=".rating"
                                    name="rating"
                                    className="form-control"
                                    >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col>
                                    <Control.text
                                    model=".author"
                                    name="author"
                                    id="author"
                                    className="form-control"
                                    validators={{
                                        required,minLength:minLength(3),maxLength:maxLength(15)
                                    }}
                                    />
                                    <Errors
                                    className="text-danger" 
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required:'Required',
                                        minLength:'Must be greater than 2 character',
                                        maxLength:'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col>
                                    <Control.textarea
                                    model=".comment"
                                    name="comment"
                                    id="comment"
                                    rows="6"
                                    className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

const RenderComment = ({comments, postComment, dishId})=>{
    return(
        <div className="col-12 col-md-6 mt-3">
            <h1>Comments</h1>
            <ul className="list-unstyle">
            <Stagger in>
            {comments.map(comment =>{
                return(
                    <Fade in>
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    </Fade>
                )
            })}
            </Stagger>
            </ul>
            <CommentForm dishId = {dishId} postComment = {postComment}/>
            </div>
    )
}


const Dishdetail = (props)=>{
    if (props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null){
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
                    <RenderComment comments = {props.comments}
                    postComment = {props.postComment}
                    dishId = {props.dish.id}/>
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