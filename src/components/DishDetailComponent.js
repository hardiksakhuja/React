import React , { Component } from 'react';
import { Card , CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

    }

    renderComments(comments) {
        if (comments!=null) {
            let options = {year:"numeric",month:"short",day:"numeric"}
            return comments.map(comment => (
                <ul key={comment.id} className="list-unstyled">
                    <li className="mb-2">{comment.comment}</li>
                    <li>
                        --{comment.author}
                        {new Date(comment.date).toLocaleDateString("en-US",options)}
                    </li>
                </ul>
            ));
        } else return(
            <div></div>
        );
    }

    render() {
        const { dish }  = this.props;
        if(dish!=null) {
        return( 
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments(dish.comments)}
                    </div>
                </div>        
            );
        } else return (
            <div></div>
        );    
    }
}
export default DishDetail;