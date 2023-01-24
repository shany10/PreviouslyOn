// import React, { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Connexion = () => {
    const Login = async () => {
        const searchParams = new URLSearchParams(document.location.search)

        /*
        const options = {
            url: 'https://api.betaseries.com/oauth/access_token',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                client_id: process.env.REACT_APP_KEY_CLIENT,
                client_secret: process.env.REACT_APP_KEY_PRIVAT,
                redirect_uri: 'http://localhost:3000/connexion',
                code: searchParams.get('code')
            }
        }
        */

        try {
            /*
            const data= {
               client_id: process.env.REACT_APP_KEY_CLIENT,
               client_secret: process.env.REACT_APP_KEY_PRIVAT,
               redirect_uri: "http://localhost:3000/connexion",
               code: searchParams.get("code")
            };
            */
           const data = `client_id=${process.env.REACT_APP_KEY_CLIENT}&client_secret=${process.env.REACT_APP_KEY_PRIVAT}&code=${searchParams.get("code")}&redirect_uri=http://localhost:3000/connexion`;
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
            console.log("data = ", data)
            console.log("config = ", config)
            
            const response = await axios.post("https://api.betaseries.com/oauth/access_token", data, config)
            console.log("response = ", response)
        } catch (err) {
            console.log("err = ", err)
        }
    }

    return (
        <section className='connexion'>
            <h1>connexion</h1>
            <button onClick={Login}>Se connecter</button>
        </section>
    )
}

export default Connexion