import React, { useState, useEffect } from 'react';
import axios from 'axios';
import no_image from '../img/No_Image_Available.jpg';
import croix from '../img/icons8-multiplier-60.png';

const Select = ({ id , selecter}) => {

    const [movie, setMovie] = useState({
        description: "",
        image: "",
        episodes: [],
        genres: [],
        saissons:[],
    })

    useEffect(() => {
        axios.get("http://api.betaseries.com/shows/display?id=" + id + "&key=" + process.env.REACT_APP_KEY_CLIENT)
            .then((response) => {

                const arr = []
                let image = no_image;
                for (let i = 1; i <= response.data.show.episodes; ++i) {
                    arr.push(<div className='box-episode fts-1-5 pd-top-2 pd-bottom-2 pd-left-4' key={i}>Episode {i}</div>)
                }

                if (response.data.show.images.poster !== null) {
                    image = response.data.show.images.poster
                }

                if(response.data.show.seasons_details.length !== 0) {
                    
                }
                setMovie(oldItem => {
                    const newItem = {
                        ...oldItem,
                        description: response.data.show.description,
                        image: image,
                        episodes: arr,
                        genres: Object.values(response.data.show.genres)
                    }
                    return newItem
                })
                // console.log(response.data.show.seasons_details)
            })

    }, [id])

    return (
        <section className='select'>
            <div className='flex content-right select-box-croix'>
            <img src={croix} alt="cancel" onClick={() => selecter(null)} className='mg-right-2 mg-top-1 pointer select-croix'/>
            </div>
            <div className='flex pd-bottom-1 select-box-info'>
                <p className='select-description fts-1-5 mg-top-2 mg-left-6'>{movie.description}</p>
                <div className='container-episode mg-top-2 mg-left-2'>
                    {/* {movie.episodes.map(episode => {
                        return episode
                    })} */}
                </div>
                <img src={movie.image} alt="poster" className='select-poster mg-top-2 mg-left-4' />
            </div>
            <div className='flex center box-genre'>
                {movie.genres.map((genre, index) => {
                    return <p className='fts-1-5 mg-left-2 mg-right-2 cl-red italic' key={index}>{genre}</p>
                })}
            </div>
        </section>
    )
}

export default Select