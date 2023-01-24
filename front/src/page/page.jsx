import React, { useState } from 'react';

import Navbar from '../component/navbar';
import Home from '../page/home';
import Research from '../page/research';
import Serie from '../page/Serie';
import Movie from '../page/Movie';
import Category from '../page/category';

const Page = () => {

    const [page, setPage] = useState('Home')

    const changePage = (index) => {
        setPage(index)
    }

    return (
        <div>
            <Navbar changePage={changePage} />
            {page === 'Home' ? (<Home />) : null}
            {page === 'Research' ? (<Research />) : null}
            {page === 'Serie' ? (<Serie />) : null}
            {page === 'Movie' ? (<Movie />) : null}
            {page === 'Category' ? (<Category />) : null}
        </div>
    )
}

export default Page