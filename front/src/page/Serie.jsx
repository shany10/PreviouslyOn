import React from 'react';
import logo from '../img/icons8-fox-64.png';

const Serie = () => {
    return(
        <section className='Serie flex center'>
            <div className='flex center pd-top-1'>
                <p className='cl-red fts-1-5 mg-bottom-1'>FLEXOR</p>
                <img src={logo} alt="logo" />
            </div>
        </section>
    )
}

export default Serie