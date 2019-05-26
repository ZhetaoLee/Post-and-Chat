import React, { Component } from 'react';
import { actions as weatherActions } from '../../redux/modules/weather';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './Weather.css';

class Weather extends Component {    
    render(){
        const { city } = this.props;
        if (city){
            this.props.loadLocation(city);
            const { userName, temp_c, text, icon } = this.props;
            return (
                <div>
                    {userName &&
                        <div>
                            <div className="weatherData">
                                <div>{city}</div>
                                <div>{temp_c} °C</div>
                                <img src={icon} alt="icon"/>
                                <div>{text}</div>
                            </div>
                        </div>
                    }
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const id = state.firebase.auth.uid;
    const users = state.firestore.data.users;
    console.log(users);
    console.log(id);
    if (users !== undefined){
        const user = users[id];
        return {
            userName: state.firebase.profile.userName,
            city: user.city,
            temp_c: state.weather.temp_c,
            text: state.weather.text,
            icon: state.weather.icon,
        }
    } else {
        return {
            city: null,
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(weatherActions, dispatch),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users'}
    ]),
)(Weather)