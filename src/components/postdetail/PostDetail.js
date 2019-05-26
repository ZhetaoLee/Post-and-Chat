import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { actions as postsActions } from '../../redux/modules/posts';
import { bindActionCreators } from 'redux';
import "./PostDetail.css";

class PostDetail extends Component {
    handleClickUp = (event) => {
        event.preventDefault();
        const { upvote } = this.props.post;
        const postID  = this.props.match.params.id;
        this.props.upvote(upvote, postID);
    }
    
    handleClickDown = (event) => {
        event.preventDefault();
        const { downvote } = this.props.post;
        const postID  = this.props.match.params.id;
        this.props.downvote(downvote, postID);
    }

    render(){
        if (this.props.post){
            const { title, author, date, contents, upvote, downvote } = this.props.post;
            return(
                <div className="postDetail">
                    <div className="postTitle">{title}</div>
                    <div className="solidLine"></div>
                    <div className="postAuthor">{author}</div>
                    <div className="postDate">posted on {moment(date.toDate()).fromNow()}</div>
                    <div className="solidLine"></div>
                    <div className="postContents">{contents}</div>
                    <i onClick={this.handleClickUp} className='fa fa-thumbs-o-up fa-1g leftMargin'></i>&nbsp;{upvote}&nbsp;&nbsp;&nbsp;&nbsp;
                    <i onClick={this.handleClickDown} className='fa fa-thumbs-o-down fa-1g'>&nbsp;</i>{downvote}
                    <div className="solidLine"></div>
                </div>
            );
        } else {
            return(
                <div className="loading"><i className="fa fa-spinner fa-spin fa-pulse fa-5x"></i></div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null;
    return {
        post: post,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postsActions, dispatch),
    };
};
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts'}
    ]),
  )(PostDetail)