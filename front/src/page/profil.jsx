import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import photo_profil from '../img/photo-avatar-profil.png';
import no_image from '../img/No_Image_Available.jpg';
import croix from '../img/icons8-multiplier-96.png';

const Profil = ({ selecter }) => {
    const cookies = new Cookies();
    const user = cookies.get("user")
    const token = cookies.get("token")
    const [profilUser, setProfilUser] = useState({
        avatar: photo_profil,
        shows: [],
        numberShows: 0
    })
    const [showRemove, setShowRemove] = useState("")
    useEffect(() => {
        const getData = async () => {

            //récuperation des infos utilisateur ligne 21 => 36 
            await axios.get(`https://api.betaseries.com/members/infos?
                            id=${user.id}&
                            key=${process.env.REACT_APP_KEY_CLIENT}`)
                .then((response) => {
                    setProfilUser(oldItem => {
                        const newItem = {
                            ...oldItem,
                            avatar: response.data.member.avatar,
                            numberShows: response.data.member.stats.shows
                        }
                        return newItem
                    })
                })
                .catch(error => {
                    console.log(error)
                })

            //récuperation des series de l'utilisateur ligne 40 => 55

            await axios.get(`https://api.betaseries.com/shows/member?   
                            id=${user.id}&
                            key=${process.env.REACT_APP_KEY_CLIENT}`)
                .then(response => {
                    setProfilUser(oldItem => {
                        const newItem = {
                            ...oldItem,
                            shows: response.data.shows
                        }
                        return newItem
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getData()
    }, [user.id, showRemove])
    const changeProfilPhoto = (e) => {

        axios.post(`https://api.betaseries.com/members/avatar?
        avatar=${e.target.value}&
        token=${token}&
        key=${process.env.REACT_APP_KEY_CLIENT}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const removeShow = (id) => {
        axios.delete(`https://api.betaseries.com/shows/show?
        id=${id}&
        token=${token}&
        key=${process.env.REACT_APP_KEY_CLIENT}`)
            .then(response => {
                console.log(response)
                setShowRemove(id)
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <div className='profil'>
            <div className='box-user'>
                <div className="profil-info">
                    <div className='flex center'>
                        <h1 className='cl-red mg-top-1 mg-bottom-2'>{cookies.get("user").login}</h1>
                    </div>
                    <div className='flex center box-show-xp'>
                        <p>shows: {profilUser.numberShows}</p>
                        <p>XP: {cookies.get("user").xp}</p>
                    </div>
                    <div className='flex center'>
                        <label htmlFor="avatar">
                            {profilUser.avatar !== null ?
                                (<img src={profilUser.avatar} alt="profil"
                                    className='mg-left-2 profil-photo pointer' />) :
                                (<img src={photo_profil} alt="profil"
                                    className='mg-left-2 profil-photo pointer' />)}
                        </label>
                        <input type="file"
                            className='input-photo'
                            id='avatar'
                            onChange={(e) => changeProfilPhoto(e)} />

                    </div>
                </div>
                <div className='profil-box-shows pd-bottom-2'>
                    {profilUser.shows.map((item, index) => {
                        return <div key={index}
                            className="profil-show mg-bottom-2 pd-left-4 pd-right-4 flex">
                            <div>
                                <p className='mg-bottom-0 mg-top-4 txt-center '>
                                    {item.slug}
                                </p>
                            </div>
                            <div className='flex items-center'>
                                {item.images.poster !== null ?
                                    (<img src={item.images.poster} alt="poster" className='profil-shows-image' />) :
                                    (<img src={no_image} alt="poster" className='profil-shows-image' />)
                                }
                                <button onClick={() => selecter(item.id)}
                                    className='profil-see-show fts-1-2' >
                                    info
                                </button>
                            </div>
                            <img src={croix}
                                alt="croix"
                                className='profil-remove-shows'
                                onClick={() => removeShow(item.id)} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profil