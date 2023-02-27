import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import no_image from '../img/No_Image_Available.jpg';
import logo from '../img/icons8-fox-64.png';
import plus from '../img/icons8-plus-60.png';
import { motion } from "framer-motion";

const Home = ({ selecter, selecterEpisodes }) => {
    const cookies = new Cookies();
    const [data, setData] = useState([])
    const [event, setEvent] = useState({
        start: 0,
        end: 0,
    })

    const clickDown = () => {
        setEvent({
            ...event,
            start: Date.now()
        })
    }

    const clickUp = (res) => {
        const time = Date.now() - event.start
        if (Math.floor(time / 10) > 130) {
            selecter(res.id)
        }
        else {
            axios.post(`https://api.betaseries.com/shows/show?
            id=${res.id}&
            token=${cookies.get('token')}&
            key=${process.env.REACT_APP_KEY_CLIENT}`)
                .then((response) => {
                    alert("Votre serie a bie nété ajouter")
                })
                .catch((error) => {
                    console.log(error.response.data.errors[0].text)
                    alert("La serie est déjà dans votre compte")
                })
        }
    }

    useEffect(() => {
        const getData = async () => {
            axios.get("http://api.betaseries.com/shows/list?key=d60da5bb872f&limit=40")
                .then((response) => {
                    setData(response.data.shows)
                })
        }
        getData()
    }, [])

    return (
        <section className='home pd-top-4'>
            <div className='flex center home-container-logo'>
                <div className='flex center pd-top-1 pinceau'>
                    <p className='cl-red fts-2 mg-bottom-1 bold lt-spacing-2 '>FLEXOR</p>
                    <img src={logo} alt="logo" className='logo' />
                </div>
            </div>
            <div className=''>
                <p className='fts-1-5 mg-left-4 cl-gray mg-top-0'>tendance actuele</p>
                <div className='mg-top-2 flex home-content'>
                    {data.filter(res => res.title !== "").slice(0, 19).map((res, index) => {
                        const title = res.title.replace('#', "")
                        return <div className='txt-center mg-left-1 mg-bottom-2' key={index}  >
                            {res.images.poster === null ? (
                                <img src={no_image} alt="poster" className='home-poster pointer' onClick={() => selecterEpisodes(res.id)} />
                            ) : (
                                <img src={res.images.poster} alt="poster" className='home-poster pointer' onClick={() => selecterEpisodes(res.id)} />
                            )}
                            <motion.div whileHover={{ scale: 1.2 }}
                                onMouseDown={(e) => clickDown(e)}
                                onMouseUp={() => clickUp(res)}
                                className='box-plus flex center items-center pointer'>
                                <img src={plus} alt="plus" />
                            </motion.div>
                            <p className='fts-1-2 mg-bottom-0 mg-top-1'>{title}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className='mg-top-2'>
                <p className='fts-1-5 mg-left-4 cl-gray'>Oscar</p>
                <div className='mg-top-2 flex home-content'>
                    {data.filter(res => res.title !== "").slice(20, 39).map((res, index) => {
                        const title = res.title.replace('#', "")
                        return <div className='txt-center mg-left-1 pointer mg-bottom-2' key={index}>
                            {res.images.poster === null ? (
                                <img src={no_image} alt="poster" className='home-poster' onClick={() => selecterEpisodes(res.id)} />
                            ) : (
                                <img src={res.images.poster} alt="poster" className='home-poster' onClick={() => selecterEpisodes(res.id)} />
                            )}
                            <motion.div whileHover={{ scale: 1.2 }}
                                onMouseDown={() => clickDown()}
                                onMouseUp={() => clickUp(res)}
                                className='box-plus flex center items-center pointer'>
                                <img src={plus} alt="plus" />
                            </motion.div>
                            <p className='fts-1-2 mg-bottom-0'>{title}</p>
                        </div>
                    })}
                </div>
            </div>

        </section>
    )
}

export default Home