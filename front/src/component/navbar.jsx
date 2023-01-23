import React, { useState } from 'react';
import { motion } from "framer-motion";
import fleche_droite from '../img/icons8-flèche-droite-60.png';
import photo_profil from '../img/photo-avatar-profil.png';
import logo from '../img/icons8-fox-64.png';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [bgc, setBgc] = useState({
        recherche: 'transparent',
        acceuil: 'rgb(73, 73, 73)',
        serie: 'transparent',
        film: 'transparent',
        categorie: 'transparent'
    })

    const variants = {
        open: { x: 0 },
        closed: { x: "-95%" },
    }

    const current_page = (e) => {
        setBgc({
            ...bgc,
            recherche:'transparent',
            acceuil: 'transparent',
            serie: 'transparent',
            film:'transparent',
            categorie:'transparent',
            [e.target.id]: 'rgb(73, 73, 73)'
        });

        // setBgc({ ...bgc, [e.target.id]: 'rgb(73, 73, 73)' })
        console.log(bgc)
    }

    return (
        <header>
            <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
                <div className='nav-profil'>
                    <img src={photo_profil} alt="profil" className='nav-photo-profil' />
                </div>
                <div className='nav-fleche txt-center'>
                    <motion.p whileHover={{ scale: 1.2 }} onClick={(e) => current_page(e)} style={{ backgroundColor: bgc.recherche }} id='recherche' className='fts-2 nav-item pointer'>Recherche</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} onClick={(e) => current_page(e)} style={{ backgroundColor: bgc.acceuil }} id='acceuil' className='fts-2 nav-item pointer'>Acceuil</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} onClick={(e) => current_page(e)} style={{ backgroundColor: bgc.serie }} id='serie' className='fts-2 nav-item pointer'>Serie</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} onClick={(e) => current_page(e)} style={{ backgroundColor: bgc.film }} id='film' className='fts-2 nav-item pointer'>Film</motion.p>
                    <motion.p whileHover={{ scale: 1.2 }} onClick={(e) => current_page(e)} style={{ backgroundColor: bgc.categorie }} id='categorie' className='fts-2 nav-item pointer'>Categorie</motion.p>
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