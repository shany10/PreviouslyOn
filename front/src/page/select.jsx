import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import no_image from '../img/No_Image_Available.jpg';
import croix from '../img/icons8-multiplier-60.png';
import archiver from '../img/icons8-classeur-96.png'

const Select = ({ id, selecter }) => {
    const cookies = new Cookies();
    const [element, seelemente] = useState({
        description: "",
        image: "",
        episodes: "",
        genres: [],
        seasons: "",
        notes: 0,
    })

    const archiveShows = () => {
        axios.post(`https://api.betaseries.com/shows/archive?
        id=${id}&
        token=${cookies.get('token')}&
        key=${process.env.REACT_APP_KEY_CLIENT}`)
            .then((response) => {
                alert("Votre serie a été bien archiver")
            })
            .catch((error) => {
                // console.log(error.response.data.errors[0].text)
                alert("Vous avez pas cette serie dans votre compte")
            })
    }

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://api.betaseries.com/shows/display?
            id=${id}&
            key=${process.env.REACT_APP_KEY_CLIENT}`)
                .then((response) => {
                    let image = no_image;

                    if (response.data.show.images.poster !== null) {
                        image = response.data.show.images.poster
                    }
                    console.log(response.data.show.episodes)
                    seelemente(oldItem => {
                        const newItem = {
                            ...oldItem,
                            description: response.data.show.description,
                            image: image,
                            episodes: response.data.show.episodes,
                            genres: Object.values(response.data.show.genres),
                            seasons: response.data.show.seasons,
                            notes: response.data.show.notes.total
                        }
                        return newItem
                    })
                })
        }
        getData()
    }, [id])

    return (
        <section className='select'>
            <div className='flex content-right select-box-croix'>
                <img src={croix} alt="cancel" onClick={() => selecter(null)} className='mg-right-2 mg-top-1 pointer select-croix' />
            </div>
            <div className='flex pd-bottom-1 select-box-info'>
                <div className='mg-top-2 mg-left-6'>
                    <p className='select-description fts-1-5 mg-bottom-0'>{element.description}</p>
                </div>
                <div className='mg-top-2 mg-left-2'>
                    <div className='mg-top-6'>
                        <p className='mg-top-0 mg-bottom-1'>Nombre de season: {element.seasons}</p>
                        <p>Nombre d'episode: {element.episodes}</p>
                        <p>score: {element.notes}</p>
                        <div className='flex center select-archiver'>
                            <div className='pointer' onClick={() => archiveShows()}>
                                <div className='flex center'>
                                    <img src={archiver} alt="archiver" className='archiver' />
                                </div>
                                <p className='txt-center mg-top-0'>archiver</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={element.image} alt="poster" className='select-poster mg-top-2 mg-left-4' />
            </div>
            <div className='flex center box-genre'>
                {element.genres.map((genre, index) => {
                    return <p className='fts-1-5 mg-left-2 mg-right-2 cl-red italic' key={index}>{genre}</p>
                })}
            </div>
        </section>
    )
}

export default Select