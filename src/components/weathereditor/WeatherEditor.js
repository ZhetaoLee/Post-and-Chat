import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import './WeatherEditor.css';

class WeatherEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleClickSave = () => {
        this.props.onSave(this.state);
    }

    handleClickCancel = () => {
        this.props.onCancel();
    }

    render(){
        const { location } = this.state;
        return(
            <div className="WeatherEditor">
                <input
                    name="location"
                    type="text"
                    value={location}
                    placeholder="Change Location"
                    onChange={this.handleChange}
                />
                <Button className="Apply" onClick={this.handleClickSave}>Apply</Button>
                <Button className="Cancel" onClick={this.handleClickCancel}>Cancel</Button>
            </div>
        );
    }
}

export default WeatherEditor;