import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { connect } from 'react-redux'; 
import { actions as postsActions } from '../../redux/modules/posts';
import { bindActionCreators } from 'redux';
import './PostItem.css';

class PostItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isBold : false,
        }
    }

    onMouseEnter = () => {
        this.setState({
            isBold : true,
        });
    }

    onMouseLeave = () => {
        this.setState({
            isBold : false,
        });
    }

    handleClickUp = (event) => {
        event.preventDefault();
        const { upvote } = this.props.post;
        const postID = this.props.post.id;
        this.props.upvote(upvote, postID);
    }

    handleClickDown = (event) => {
        event.preventDefault();
        const { downvote } = this.props.post;
        const postID = this.props.post.id;
        this.props.downvote(downvote, postID);
    }

    render(){
        const { id, title, author, date, upvote, downvote} = this.props.post;
        return(
            <div>
                {this.state.isBold ? 
                    <Link style={{textDecoration:'none', color: 'black'}} to={`/posts/postid=${id}`}>
                        <div className='ItemBold' onMouseLeave={this.onMouseLeave}> 
                            <div className='author'>{author} </div> 
                            <div className='date'> posted on {moment(date.toDate()).fromNow()}</div>
                            <div className='title'>{title}</div>
                            <i onClick={this.handleClickUp} className='fa fa-thumbs-o-up fa-1g'></i>&nbsp;{upvote}&nbsp;&nbsp;&nbsp;&nbsp;
                            <i onClick={this.handleClickDown} className='fa fa-thumbs-o-down fa-1g'>&nbsp;</i>{downvote}
                        </div>
                    </Link>:
                    <div className='Item' onMouseEnter={this.onMouseEnter}> 
                        <div className='author'>{author} </div> 
                        <div className='date'> posted on {moment(date.toDate()).fromNow()}</div>
                        <div className='title'>{title}</div>
                        <i className='fa fa-thumbs-o-up fa-1g'></i>&nbsp;{upvote}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i className='fa fa-thumbs-o-down fa-1.5g'>&nbsp;</i>{downvote}
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postsActions, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(PostItem)