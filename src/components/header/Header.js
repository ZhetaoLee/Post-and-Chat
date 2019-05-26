import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'; 
import { actions as postsActions } from '../../redux/modules/posts';
import { bindActionCreators } from 'redux';
import './Header.css';

class Header extends Component {
    handleChange = (event) => {
        this.props.search(event.target.value);
    }

    render(){
        const {userName, logout, location, search_contents } = this.props;
        return (
            <div className='header'>
                <div className='appName'><Link style={{textDecoration:'none', color: 'black'}} to="/">Post and Chat</Link></div>
                {
                    userName ? (
                        <div className='loginblock'>
                            <div className="name"> Hello, {userName} </div>&nbsp;&nbsp;
                            <Button className="logoutButton" onClick={logout}> Log out</Button>
                        </div>
                    ) : (
                        <div className='wrapper'>
                            <div className="signup">
                                <Link to={{ pathname: "/signup", state: { from: location } }}>
                                    <Button> Sign up</Button>
                                </Link>
                            </div>
                            <div className="login">
                                <Link to={{ pathname: "/login", state: { from: location } }}>
                                    <Button> Log in</Button>
                                </Link>
                            </div>
                        </div>
                    )
                }
                <FormGroup className="search">
                    <i className="fa fa-search fa-1g"></i>
                    <FormControl type="text" value={search_contents} onChange={this.handleChange} placeholder="Search Title"/>
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.firebase.profile.userName,
        search_contents: state.posts.search_contents,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postsActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);