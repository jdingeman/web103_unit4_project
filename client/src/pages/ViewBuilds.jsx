import React, { useState, useEffect } from 'react'
import BuildsAPI from '../services/BuildsAPI'
import '../App.css'
import Build from '../components/Build'
import { Link } from 'react-router-dom'

const ViewBuilds = () => {

    const [builds, setBuilds] = useState([])

    useEffect(() => {
        const fetchBuilds = async () => {
            const data = await BuildsAPI.getAllBuilds()
            console.log("Fetched builds:", data)
            setBuilds(data)
        }

        fetchBuilds()
    }, [])
    
    return (
        <div>
            <main>
                {
                    builds && builds.length > 0 ? builds.map((build, index) => 
                        <Link
                            key={build.id}
                            to={`/custombuilds/${build.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Build
                                build={build}
                            />
                        </Link>
                        
                    ) : <h2>{'No PCs yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default ViewBuilds