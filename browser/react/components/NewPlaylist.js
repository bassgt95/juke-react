import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NewPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isDirty: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPlaylist(this.state.inputValue)
        this.setState({ inputValue: '', isDirty: false });
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value, isDirty: true });
    }

    render() {
        return (
            <div className="well">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New Playlist</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input className="form-control" type="text" value={this.state.inputValue} onChange={this.handleChange} />
                            </div>
                        </div>
                        {this.state.inputValue === '' && this.state.isDirty && (<div className="alert alert-warning">Please enter a name</div>)}
                        {this.state.inputValue.length > 16 && (<div className="alert alert-warning">Name cannot be longer than 16 characters</div>)}
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button type="submit" className="btn btn-success" disabled={this.state.inputValue.length > 16 || this.state.inputValue === ''}>
                                    Create Playlist
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    };
}

export default NewPlaylist;