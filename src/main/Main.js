import React, { Component } from 'react';
import Navigation from './navigation/Navigation';
import Movie from './movies/Movie';
import './Main.css';

export default class Main extends Component {
  state = {
    genre: 'Comedy',
    genres: [],
    year: {
      label: 'year',
      min: 1990,
      max: 2018,
      step: 1,
      value: { min: 2000, max: 2018 }
    },
    rating: {
      label: 'rating',
      min: 0,
      max: 10,
      step: 1,
      value: { min: 8, max: 10 }
    },
    runtime: {
      label: 'runtime',
      min: 0,
      max: 300,
      step: 15,
      value: { min: 60, max: 100 }
    }
  };

  getGenres = () => {
    Axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=4b79163ef3bf5048e4b25dbf42578ca3&language=en-US'
    ).then(res => {
      this.setState({
        genres: res.data.genres
      });
      console.log(this.state.genres);
    });
  };

  onSliderChange = data => {
    this.setState({
      [data.type]: { ...this.state[data.type], value: data.value }
    });
  };

  onGenreChange = event => {
    this.setState({
      genre: event.target.value
    });
  };
  render() {
    const { onGenreChange, onSliderChange } = this;
    return (
      <section className="main">
        <Navigation
          onGenreChange={onGenreChange}
          onSliderChange={onSliderChange}
          {...this.state}
        />
        <Movie />
      </section>
    );
  }
}
