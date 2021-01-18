import React from 'react'; 
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

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

function RenderComments({comments}) {
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
    const comments = dish.comments;
    return (
        <div className="container">
            <div className='row'>
                <RenderDish dish={ dish } />
                <RenderComments comments = { comments } />
            </div>
        </div>  
    )
}
export default DishDetail;