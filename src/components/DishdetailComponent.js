import React, { Component } from 'react'; 
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    renderDish(dish) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle> {dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
                </Card>
            </div>
        ); 
    }

    renderComments(comments) {
        if (comments != null) {
            const commentText = comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    <p>
                        {comment.comment} -- {comment.author}，
                        {new Intl.DateTimeFormat('en-US', {
                            year : 'numeric', 
                            month: 'short', 
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))} 
                    </p>
                  </div>
                );
            });
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{commentText}</div>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    render() {
        const dish = this.props.dish;
        const comments = dish.comments
        return (
            <div className='row'>
                {this.renderDish(dish)}
                {this.renderComments(comments)}
            </div>
        )
    }
}

export default DishDetail;