import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import starRating from '../assets/Star.svg';

class PopularPoster extends Component{
    constructor(){
        super();
        this.state = {
            id: null,
            posterPath: '',
            title: '',
            genres: [],
            voteAverage: null,
            showButton: false
        }
        this.toggleButton = this.toggleButton.bind(this);
    }
    componentDidMount(){
        let { id, posterPath, title, voteAverage, genres } = this.props.movie;
        this.setState({
            ...this.state,
            id, posterPath, title,
            voteAverage, genres
        })
    }
    toggleButton(){
        this.setState({ showButton: !this.state.showButton })
    }
    render(){
        let { id, posterPath, title, voteAverage, genres, showButton } = this.state;
        return(
            <>
                    <div className={ `popularPoster ${ showButton ? 'noShadow' : '' }` } onClick={ this.toggleButton }>
                        <img src={ posterPath } alt={ title } className='moviePoster'/>
                        <div className='movieDetails row'>
                            <span className='movieTitle'>{ title }</span>
                            <span className='userRating blue'>
                                <img src={starRating} alt='Star Rating'/>{ voteAverage }
                            </span>
                            <span className='genreList grey'>{ genres.join(', ') }</span>
                        </div>
                        {
                            showButton ?
                            (
                                <Link to={{ pathname: `/movie/${id}` }}>
                                    <button>View Details</button>
                                </Link>
                            )
                            : null
                        }
                    </div>
            </>
        );
    }
}

export default PopularPoster;