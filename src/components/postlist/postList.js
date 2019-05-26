import React, { Component } from 'react';
import PostItem from '../postitem/PostItem';
import { connect } from 'react-redux'; 
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Button } from 'react-bootstrap';
import { actions as postsActions } from '../../redux/modules/posts';
import { actions as weatherActions } from '../../redux/modules/weather';
import { bindActionCreators } from 'redux';
import PostEditor from '../posteditor/PostEditor';
import WeatherEditor from '../weathereditor/WeatherEditor';
import { Alert } from 'react-bootstrap';
import './postList.css';

class PostList extends Component {
    handleClick = () => {
        this.props.newPost();
        this.props.cancelLocation();
    }
    
    handleChangeLocation = () => {
        this.props.newLocation();
        this.props.cancelPost();
    }

    handleSave = (data) => {
        const { username, userid } = this.props;
        const { title, contents } = data;
        this.props.savePost(title, contents, username, userid);
        this.props.cancelPost();
    }
    
    handleCancel = () => {
        this.props.cancelPost();
    }

    handleWeatherSave = (data) => {
        const { location } = data;
        const { userid } = this.props;
        this.props.saveLocation(location, userid);
        this.props.cancelLocation();
    }

    handleWeatherCancel = () => {
        this.props.cancelLocation();
    }

    handleHide = () => {
        this.props.hideError();
    }

    render() {
        const{ username, createPost, posts, openLocation, search_contents, weatherError, showError } = this.props;
        var filterPosts = posts;
        if (search_contents !== "") {
            filterPosts = posts.filter(post =>{
                return post.title.toLowerCase().startsWith(search_contents.toLowerCase());
            });
        }
        return (
            <div className='PostList'>
                {username && <Button onClick={this.handleClick} className='newPost'>New Post</Button>}
                {username && <Button onClick={this.handleChangeLocation} className='newPost'>Change Location</Button>}
                {username && openLocation &&
                    <WeatherEditor onSave={this.handleWeatherSave} onCancel={this.handleWeatherCancel}></WeatherEditor>}
                {username && weatherError &&
                    <Alert dismissible show={showError} onClose={this.handleHide} className="weatherError" variant='danger'>{weatherError}</Alert> }
                {username && createPost &&
                    <PostEditor onSave={this.handleSave} onCancel={this.handleCancel}></PostEditor>}
                {filterPosts && filterPosts.map(post =>{
                    return <PostItem key={post.id} post={post}/>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        username: state.firebase.profile.userName,
        userid: state.firebase.auth.uid,
        createPost: state.posts.createPost,
        openLocation: state.weather.openLocation,
        search_contents: state.posts.search_contents,
        weatherError: state.weather.weatherError,
        showError: state.weather.showError,
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postsActions, dispatch),
        ...bindActionCreators(weatherActions, dispatch),
    };
};
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'posts', orderBy: ['date', 'desc']}
    ]),
)(PostList)