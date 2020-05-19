import React, { Component } from 'react'
import {Card, CardBody, Row, CardImg,Label, CardTitle, CardText, Breadcrumb, BreadcrumbItem,Button, Modal,ModalBody,ModalHeader, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control,Errors} from 'react-redux-form';
import {Loading}  from './LoadingComponent';

const required = (val)=> val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


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
        this.props.addComment(this.props.dishId, value.rating, value.author, value.comment)
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

const RenderComment = ({comments, addComment, dishId})=>{
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
            <CommentForm dishId = {dishId} addComment = {addComment}/>
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
                    addComment = {props.addComment}
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