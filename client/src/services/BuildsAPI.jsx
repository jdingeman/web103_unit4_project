const API_URL = '/api/builds'
const getAllBuilds = async () => {
    const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error('Failed to fetch builds');
    return await response.json();
}

const getBuildById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error(`Failed to fetch build ${id}`);
    return await response.json();
}

const createBuild = async (buildData) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData)
    }

    const response = await fetch(`${API_URL}`, options)
    if (!response.ok) throw new Error('Failed to create build');
    window.location = '/'
}

const updateBuild = async (id, buildData) => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData)
    }

    const response = await fetch(`${API_URL}/${id}`, options)
    if (!response.ok) throw new Error(`Failed to update build ${id}`);
    window.location = '/'
}

const deleteBuild = async (id) => {
    const options = {
        method: 'DELETE',
    }

    const response = await fetch(`${API_URL}/${id}`, options)
    if (!response.ok) throw new Error(`Failed to delete build ${id}`);
    window.location = '/'
}

export default {
    getAllBuilds,
    getBuildById,
    createBuild,
    updateBuild,
    deleteBuild
}