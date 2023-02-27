import React, { useEffect, useState } from 'react'
import axios from 'axios';
import croix from '../img/icons8-multiplier-60.png';

const SelectEpisodes = ({ id, selecterEpisodes }) => {

    const [episodes, setEpisodes] = useState([])
    const [seasons, setSeasons] = useState([])
    const [startSeason, setStartSeason] = useState(1)

    useEffect(() => {
        const getData = async () => {

            //récuperer les seasons
            await axios.get(`https://api.betaseries.com/shows/seasons?
            id=${id}&
            key=${process.env.REACT_APP_KEY_CLIENT}`)
                .then(response => {
                    setSeasons(response.data.seasons)
                })

            //récuperer les episodes
            await axios.get(`https://api.betaseries.com/shows/episodes?
            id=${id}&
            key=${process.env.REACT_APP_KEY_CLIENT}`)
                .then(response => {
                    console.log(response.data.episodes)
                    setEpisodes(response.data.episodes)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getData()
    }, [id])

    const seasonSelected = (option) => {
        setStartSeason(option.value)
    }

    return (
        <div className='selectEpisodes'>
            <div className='flex content-right select-box-croix'>
                <img src={croix}
                    alt="cancel"
                    onClick={() => selecterEpisodes(null)}
                    className='mg-right-2 mg-top-1 pointer select-croix' />
            </div>
            <div className='flex center'>
                <select onChange={(e) => seasonSelected(e.target)} 
                className="selectEpisode-container-seasons">
                    {seasons.map((item, index) => {
                        return <option value={item.number} key={index}>
                            season: {item.number}
                        </option>
                    })}
                </select>
            </div>
            <div className='selectEpisodes-container-episodes'>
                {episodes.filter((episode) => episode.season === parseInt(startSeason)).map((item, index) => {
                    return <div className='selectEpisode-box-episode' key={index}>
                        {item.title}
                    </div>
                })}
            </div>
        </div>
    )
}

export default SelectEpisodes