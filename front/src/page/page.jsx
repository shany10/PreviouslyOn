import React, { useState } from 'react';

import Navbar from '../component/navbar';
import Home from '../page/home';
import Research from '../page/research';
import Serie from '../page/Serie';
import Movie from '../page/Movie';
import Category from '../page/category';
import Select from './select';

const Page = () => {
    const [page, setPage] = useState('Home')
    const [select, setSelect] = useState(null)

    const changePage = (index) => {
        setPage(index)
        setSelect(null)
    }

    const selecter = (id) => {
        setSelect(id)
    }



    return (
        <div className='pd-bottom-4'>
            <Navbar changePage={changePage} />
            {select !== null ? (<Select id={select} selecter={selecter} />) : null}
            {page === 'Home' ? (<Home selecter={selecter} />) : null}
            {page === 'Research' ? (<Research selecter={selecter} />) : null}
            {page === 'Serie' ? (<Serie selecter={selecter} />) : null}
            {page === 'Movie' ? (<Movie selecter={selecter} />) : null}
            {page === 'Category' ? (<Category selecter={selecter} />) : null}
        </div>
    )
}

export default Page