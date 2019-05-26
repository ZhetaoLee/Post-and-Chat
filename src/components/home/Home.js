import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from '../header/Header';
import Weather from '../weather/Weather';
import PostDetail from '../postdetail/PostDetail';
import { connect } from 'react-redux'; 
import PostList from '../postlist/postList';
import { actions as authActions } from '../../redux/modules/auth';
import { bindActionCreators } from 'redux';
import './Home.css'

class Home extends Component {
  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const{ match, location, userName } = this.props;
    return (
      <div>
        <Header logout={this.handleLogout} location={location} />
        {userName && <Route
          exact
          path={`${match.url}`}
          render={props => <Weather {...props}/>}
        />}
        {<Route
          exact
          path={`${match.url}`}
          render={props => <PostList {...props} />}
        />}
        {<Route
          exact
          path={`${match.url}/postid=:id`}
          render={props => <PostDetail {...props} />}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userName: state.firebase.profile.userName,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);