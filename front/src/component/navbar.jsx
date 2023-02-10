import React, { useState } from 'react';
import { motion } from "framer-motion";
import Cookies from 'universal-cookie';

import fleche_droite from '../img/icons8-flèche-droite-60.png';
import photo_profil from '../img/photo-avatar-profil.png';
import logo from '../img/icons8-fox-64.png';

const Navbar = ({ changePage }) => {

    const cookies = new Cookies();
    const [isOpen, setIsOpen] = useState(false)

    const [bgc, setBgc] = useState({
        Research: 'transparent',
        Home: 'red',
        Serie: 'transparent',
        Movie: 'transparent',
        Category: 'transparent'
    })

    const variants = {
        open: { x: 0 },
        closed: { x: "-95%" },
    }

    const current_page = (e) => {
        setBgc({
            ...bgc,
            Research: 'transparent',
            Home: 'transparent',
            Serie: 'transparent',
            Movie: 'transparent',
            Category: 'transparent',
            [e.target.id]: 'red'
        });
    }

    const logout = () => {
        cookies.remove('token')
        window.location.href = 'http://localhost:3000'
    }

    return (
        <header >
            <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
                <div className='nav-profil flex center items-center'>
                    <div className='profiler txt-center'>
                        <img src={photo_profil} alt="profil" className='nav-photo-profil' />
                        <p className='fts-1-5 mg-top-0 mg-bottom-0 pointer' onClick={() => logout()}>
                            logout
                        </p>
                    </div>
                </div>
                <div className='nav-fleche txt-center'>
                    <motion.p whileHover={{ scale: 1.2 }}
                        onClick={(e) => { current_page(e); changePage(e.target.id) }}
                        style={{ backgroundColor: bgc.Research }}
                        id='Research' className='fts-2 nav-item pointer'>
                        Recherche
                    </motion.p>
                    <motion.p whileHover={{ scale: 1.2 }}
                        onClick={(e) => { current_page(e); changePage(e.target.id) }}
                        style={{ backgroundColor: bgc.Home }}
                        id='Home' className='fts-2 nav-item pointer'>
                        Acceuil
                    </motion.p>
                    <motion.p whileHover={{ scale: 1.2 }}
                        onClick={(e) => { current_page(e); changePage(e.target.id) }}
                        style={{ backgroundColor: bgc.Serie }}
                        id='Serie' className='fts-2 nav-item pointer'>
                        Serie
                    </motion.p>
                    <motion.p whileHover={{ scale: 1.2 }}
                        onClick={(e) => { current_page(e); changePage(e.target.id) }}
                        style={{ backgroundColor: bgc.Movie }}
                        id='Movie' className='fts-2 nav-item pointer'>
                        Film
                    </motion.p>
                    <motion.p whileHover={{ scale: 1.2 }}
                        onClick={(e) => { current_page(e); changePage(e.target.id) }}
                        style={{ backgroundColor: bgc.Category }}
                        id='Category' className='fts-2 nav-item pointer'>
                        Categorie
                    </motion.p>
                    <div className='flex center'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <motion.img whileHover={{ scale: 1.5 }}
                    onClick={() => setIsOpen(isOpen => !isOpen)}
                    src={fleche_droite}
                    alt="fleche droite"
                    className='fleche_droit_nav' />
            </motion.nav>
        </header>
    )
}

export default Navbar