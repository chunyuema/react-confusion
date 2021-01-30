import React, { Component } from 'react'; 
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Row, Button, Modal, ModalBody, ModalHeader, Col, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'; 
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) =>  (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props); 
        this.state  = {isModalOpen: false};
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }; 

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return (
            <div>
                <Button color="primary" onClick = {this.toggleModal}>
                    <span className='fa fa-pencil'>Submit Comments</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Your Comments </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor='rating' md={12}> Rating </Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Name" className="form-control" validators={{required, minLength:minLength(2), maxLength: maxLength(15)}}></Control.text>
                                    <Errors className="text-danger" model=".author" show="touched" messages={{
                                        required: 'Required', 
                                        minLength: 'Must be greater than 2 characters', 
                                        maxLength: 'Must be less than 15 characters'
                                    }}></Errors>
                                </Col>    
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}> Comment </Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="author" placeholder="Thoughts on the dish" rows={5} className="form-control" validators={{required}}></Control.textarea>
                                    <Errors className="text-danger" model='.comment' show="touched" messages={{
                                        required: 'You cannot submit empty comments :)'
                                    }}></Errors>
                                </Col>
                            </Row>
                            <Button type="submit" color="primary"> Submit </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle> {dish.name} </CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>
        </div>
    ); 
}

function RenderComments({comments, addComment, dishId}) {
    if (comments != null) {
        const commentText = comments.map((comment) => {
            return (
                <li key={comment.id}>
                <p>
                    {comment.comment} -- {comment.author}，
                    {new Intl.DateTimeFormat('en-US', {
                        year : 'numeric', 
                        month: 'short', 
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))} 
                </p>
                </li>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul>{commentText}</ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    if (dish == null) { return (<div></div>)}
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
                <RenderDish dish={props.dish} />
                <RenderComments 
                    comments= {props.comments} 
                    addComment= {props.addComment}
                    dishId = {props.dish.id}/>
            </div>
        </div>      
    )
}

export default DishDetail;