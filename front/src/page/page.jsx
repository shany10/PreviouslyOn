import React, { useState, useEffect } from 'react';

import Navbar from '../component/navbar';
import Home from '../page/home';
import Research from '../page/research';
import Serie from '../page/Serie';
import Category from '../page/category';
import Select from './select';
import Profil from './profil';
import SelectEpisodes from './selectEpisodes';

const Page = () => {
    const [page, setPage] = useState('Home')
    const [select, setSelect] = useState(null)
    const [infoEpisodes, setInfoEpisodes] = useState(null)

    const changePage = (index) => {
        setPage(index)
        setSelect(null)
        setInfoEpisodes(null)
        localStorage.setItem('page', index)
    }

    const selecter = (id) => {
        setSelect(id)
    }

    const selecterEpisodes = (id) => {
        setInfoEpisodes(id)
    }

    useEffect(() => {
        if (localStorage.getItem("page") !== "") {
            setPage(localStorage.getItem("page"))
        }
    }, [])

    return (
        <div className='pd-bottom-4'>
            <Navbar changePage={changePage} />
            {select !== null ? (<Select id={select} selecter={selecter} />) : null}
            {infoEpisodes !== null ? (<SelectEpisodes id={infoEpisodes} selecterEpisodes={selecterEpisodes} />) : null}
            {page === 'Profil' ? (<Profil selecter={selecter} />) : null}
            {page === 'Home' ? (<Home selecter={selecter} selecterEpisodes={selecterEpisodes} />) : null}
            {page === 'Research' ? (<Research selecter={selecter} />) : null}
            {page === 'Serie' ? (<Serie selecter={selecter} />) : null}
            {page === 'Category' ? (<Category selecter={selecter} />) : null}
        </div>
    )
}

export default Page