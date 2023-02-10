import React, { useState, useEffect } from 'react';
import axios from 'axios';
import no_image from '../img/No_Image_Available.jpg';
import logo from '../img/icons8-fox-64.png';

const Home = ({ selecter }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            axios.get("http://api.betaseries.com/shows/list?key=d60da5bb872f&limit=40")
                .then((response) => {

                    setData(response.data.shows)
                    // console.log(response.data.shows)
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
                        return <div className='txt-center mg-left-1 pointer mg-bottom-2' key={index} onClick={() => selecter(res.id)} >
                            {res.images.poster === null ? (
                                <img src={no_image} alt="poster" className='home-poster' />
                            ) : (
                                <img src={res.images.poster} alt="poster" className='home-poster' />
                            )}
                            <p className='fts-1-2 mg-bottom-0'>{title}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className='mg-top-2'>
                <p className='fts-1-5 mg-left-4 cl-gray'>Oscar</p>
                <div className='mg-top-2 flex home-content'>
                    {data.filter(res => res.title !== "").slice(20, 39).map((res, index) => {
                        const title = res.title.replace('#', "")
                        return <div className='txt-center mg-left-1 pointer mg-bottom-2' key={index} onClick={() => selecter(res.id)} >
                            {res.images.poster === null ? (
                                <img src={no_image} alt="poster" className='home-poster' />
                            ) : (
                                <img src={res.images.poster} alt="poster" className='home-poster' />
                            )}
                            <p className='fts-1-2 mg-bottom-0'>{title}</p>
                        </div>
                    })}
                </div>
            </div>

        </section>
    )
}

export default Home