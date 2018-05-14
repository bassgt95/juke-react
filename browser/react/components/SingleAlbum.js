import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor() {
    super();
    this.state = {
      album: {}
    };
  }

  fetchAlbumById(albumId) {
    axios.get(`/api/Albums/${albumId}`)
      .then(res => res.data)
      .then(album => {
        // album.songs = album.songs.map(convertSong); // optional
        this.setState({ album });
      });
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.fetchAlbumById(albumId);

  }

  componentWillReceiveProps(nextProps) {
    const nextAlbumId = nextProps.match.params.albumId;
    const currentAlbumId = this.props.match.params.albumId;
    if (nextAlbumId !== currentAlbumId) {
      this.fetchAlbumById(nextAlbumId);
    }
  }

  render() {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{album.name}</h3>
          <img src='default-album.jpg' className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
