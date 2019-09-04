import React, { useState } from 'react'

import api from '../services/api'
import logo from '../assets/logo.svg'

import './Login.css'

export default function Login({ history }) {
    const [username, setUsername] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        
        const resp = await api.post('/devs', {
            username,
        })

        const { _id } = resp.data

        history.push(`/dev/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="TinDev" />
                <input
                    placeholder="Digite seu usuário do github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
