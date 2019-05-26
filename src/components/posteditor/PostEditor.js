import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { actions as postActions } from '../../redux/modules/posts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import './PostEditor.css';

class PostEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            contents: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }); 
    }

    handleClickSave = () => {
        const { title, contents } = this.state;
        this.props.checkTitle(title);
        this.props.checkContents(contents);
        if (title.length > 0 && contents.length > 0){
            this.props.onSave(this.state);
        }
    }

    handleClickCancel = () => {
        this.props.closeWarningMessage();
        this.props.onCancel();
    }

    render(){
        const { title, contents } = this.state;
        const { titleWarningMessage, contentsWarningMessage} = this.props;
        return(
            <div className="postEditor">
                <input
                    name="title"
                    type="text"
                    value={title}
                    placeholder="title"
                    onChange={this.handleChange}
                />
                <textarea className="contents"
                    name="contents"
                    value={contents}
                    placeholder="contents"
                    onChange={this.handleChange}
                />
                <Button className="Save" onClick={this.handleClickSave}>Save</Button>
                <Button className="CancelPost" onClick={this.handleClickCancel}>Cancel</Button>
                { titleWarningMessage && <Alert variant='danger'>{titleWarningMessage}</Alert> }
                { contentsWarningMessage && <Alert variant='danger'>{contentsWarningMessage}</Alert> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        titleWarningMessage: state.posts.titleWarningMessage,
        contentsWarningMessage: state.posts.contentsWarningMessage,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(postActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);