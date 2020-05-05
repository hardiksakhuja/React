import React , { Component } from 'react';
import { Card , CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem,
Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors }from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade , Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => !(val) || (val.length >= len)

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ModalOpen :false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            ModalOpen: !this.state.ModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);    
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.ModalOpen} toggle={this.toggleModal}>
                    <ModalHeader isOpen={this.state.ModalOpen} toggle={this.toggleModal}>Comment Form</ModalHeader>    
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={{ size: 10 }}>
                                    <Control.select 
                                        model=".rating"
                                        name="rating"
                                        className="form-control">
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
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                            className="form-control" placeholder="Your Name"
                                            validators={{required , maxLength :maxLength(15), minLength:minLength(3)}}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".firstname"
                                        show = "touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
            </div>
        );
    };


}


function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        return(
        <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => (
          <ul key={comment.id} className="list-unstyled">
              <Stagger in>
                  <Fade in>
            <li className="mb-2">{comment.comment}</li>
            <li>
              -- {comment.author}{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </li>
            </Fade>
            </Stagger>
          </ul>
        ))}
        <CommentForm dishId={dishId} postComment={postComment} />     
        </div>
    );
} else return <div />;
}
    // function RenderComments({ comments }) {
    //     if (comments!=null) {
    //         const {cmnts} = comments.map(comment => {
    //             return (
    //                 <li key={comment.id}>
    //                     <p>{comment.comment}</p>
    //                     <p>-- {comment.author},
    //                     &nbsp;
    //                     {new Intl.DateTimeFormat('en-US', {
    //                             year: 'numeric',
    //                             month: 'long',
    //                             day: '2-digit'
    //                         }).format(new Date(comment.date))}
    //                     </p>
    //                 </li>
    //             )
    //         })
    //         return (
    //             <div className='col-12 col-md-5 m-1'>
    //                 <h4> Comments </h4>
    //                 <ul className='list-unstyled'>
    //                     {cmnts}
    //                 </ul>
    //             </div>
    //         );
    //     } else return(
    //         <div></div>
    //     );
    // }

    function RenderDish({dish}) {
        if(dish!=null) {
            return( 
                            <div className="col-12 col-md-5 m-1">
                                <FadeTransform in transormProps={{
            exitTransform: 'scale(0.5) trnaslateY(-50%)'
        }}>
                                <Card>
                                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                                    <CardBody>
                                        <CardTitle>{dish.name}</CardTitle>
                                        <CardText>{dish.description}</CardText>
                                    </CardBody>
                                </Card>
                                </FadeTransform>
                            </div>
                    //          <div className="col-12 col-md-5 m-1">
                    //              <h4>Comments</h4>
                    //              <renderComments comments={dish.comments}/>
                    //          </div>
                    //      </div>  
                    //  </div>
                );
            } else return (
                <div></div>
            );
    }

    const DishDetail = props => {
        const { dish }  = props;
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        else if (dish!=null) {
            return (
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                             dishId={props.dish.id}
                         /> 
                    </div>
                </div>
        );
            } else return (
                <div></div>
            );
    }
// export default DishDetail;
// const DishDetail = props => (
//     <div className="container">
//       <div className="row">
//         <Breadcrumb>
//           <BreadcrumbItem>
//             <Link to="/menu">Menu</Link>
//           </BreadcrumbItem>
//           <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
//         </Breadcrumb>
//         <div className="col-12">
//           <h3>{props.dish.name}</h3>
//           <hr />
//         </div>
//       </div>
//       <div className="row">
//         <RenderDish dish={props.dish} />
//         <RenderComments comments={props.comments} />
//       </div>
//     </div>
//   );
  
  export default DishDetail;