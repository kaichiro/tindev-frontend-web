import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import './Main.css'

export default function Main({ match }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [match.params.id])

    async function handleLikeOrDislike(id, isLike) {
        await api.post(`/devs/${id}/${!isLike ? 'dis' : ''}likes`, null, {
            headers: {
                user: match.params.id
            }
        })
        setUsers(users.filter(user => user._id !== id))
    }

    const Footer = ({ name, bio }) => {
        return (
            <footer>
                <strong>{name}</strong>
                <p>{bio}</p>
            </footer>
        )
    }

    const GroupButtons = ({ _id }) => {
        return (
            <div className="buttons">
                <button type="button" onClick={() => handleLikeOrDislike(_id, false)}>
                    <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLikeOrDislike(_id, true)}>
                    <img src={like} alt="Like" />
                </button>
            </div>
        )
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="TinDev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img
                                src={user.avatar}
                                alt={`User name: ${user.name}`}
                            />
                            {Footer(user)}
                            {GroupButtons(user)}
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty">Acabou :(</div>
                )}
        </div>
    )
}
