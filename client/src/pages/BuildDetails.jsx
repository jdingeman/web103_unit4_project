import React, { useState, useEffect } from 'react'
import '../css/Build.css'
import { useParams } from 'react-router-dom'
import tower from '../assets/pc-tower.svg'
import BuildsAPI from '../services/BuildsAPI'

const BuildDetails = () => {
    
    const [build, setBuild] = useState([])
    const { id } = useParams()
    useEffect(() => {
        const fetchBuild = async () => {
            const data = await BuildsAPI.getBuildById(id)
            setBuild(data)
        }

        fetchBuild()
    }, [id])

    const handleDelete = async () => {
        console.log(id)
        try {
            await BuildsAPI.deleteBuild(id)
        } catch (error) {
            console.error("Error deleting build:", error)
        }
    }

    return(
        <div className="build-item">
            <div className="build-left">
                <div className="build-header">
                    <img src={tower} className="icon" alt="PC tower" />
                    <h2>{build.name}</h2>
                </div>
                <h3>${build.price}</h3>

                <div className="build-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>



            <div className="build-right">
                {build.case && (
                    <div className="build-part">
                        <div className="part-info">
                            <strong>Case</strong>
                            <span>{build.case.name}</span>                           
                        </div>
                        <img src={build.case.image} alt={build.case.name} className="part-image" />
                    </div>
                )}
                {build.cpu && (
                    <div className="build-part">
                        <div className="part-info">
                            <strong>CPU</strong>
                            <span>{build.cpu.name}</span>                           
                        </div>
                        <img src={build.cpu.image} alt={build.cpu.name} className="part-image" />
                    </div>
                )}
                {build.gpu && (
                    <div className="build-part">
                        <div className="part-info">
                            <strong>GPU</strong>
                            <span>{build.gpu.name}</span>                           
                        </div>
                        <img src={build.gpu.image} alt={build.gpu.name} className="part-image" />
                    </div>
                )}
                {build.motherboard && (
                    <div className="build-part">
                        <div className="part-info">
                            <strong>Motherboard</strong>
                            <span>{build.motherboard.name}</span>                           
                        </div>
                        <img src={build.motherboard.image} alt={build.motherboard.name} className="part-image" />
                    </div>
                )}
                {build.ram && (
                    <div className="build-part">
                        <div className="part-info">
                            <strong>RAM</strong>
                            <span>{build.ram.name}</span>                           
                        </div>
                        <img src={build.ram.image} alt={build.ram.name} className="part-image" />
                    </div>
                )}
                {build.storage && (
                    <div className="build-part">
                        <div className="part-info">
                            <strong>Storage</strong>
                            <span>{build.storage.name}</span>                           
                        </div>
                        <img src={build.storage.image} alt={build.storage.name} className="part-image" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BuildDetails