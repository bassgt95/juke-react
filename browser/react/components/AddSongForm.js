import React, { Component } from 'react';
import axios from 'axios';
import Playlist from './Playlist';

export default class AddSongForm extends Component {

    constructor() {
        super();
        this.state = {
            songs: [],
            inputValue: 1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props);
        console.log(this.state.inputValue);
        const { playlistId } = this.props;
        // this.props.addSong(this.state.inputValue)
        axios.post(`/api/playlists/${playlistId}/songs`, { "id": this.state.inputValue })
            .then(() =>this.setState({ inputValue: 1 }));
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value});
    }

    componentDidMount() {
        axios.get('/api/songs/')
            .then(res => res.data)
            .then(songs => {
                this.setState({ songs })
            });
    }

    render() {
        const { songs } = this.state;
        return (
            <div className="well">
                <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Add to Playlist</legend>
                        <div className="form-group">
                            <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                            <div className="col-xs-10">
                                <select className="form-control" name="song" onChange={this.handleChange}>
                                    {songs.map(song => (<option value={song.id} key={song.id}>{song.name}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                <button type="submit" className="btn btn-success">Add Song</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}