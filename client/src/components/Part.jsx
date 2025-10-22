import React, { useState, useEffect } from 'react'
import '../App.css'
import PartsAPI from '../services/PartsAPI'

const Part = (props) => {
    const [part, setPart] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const partData = await PartsAPI.getCaseById(props.id)
                setPart(partData)
            } catch (error) {
                throw error
            }
        })
        ()
    }, [])

    return(
        <article>
            <div>
                <img src={part.imageurl} />
            </div>
            <h2>{part.name}</h2>
            <p>{part.price}</p>
        </article>
    )
}

export default Part