const API_URL = '/api/parts'

const getAllCases = async () => {
    const response = await fetch(`${API_URL}/cases`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error('Failed to fetch builds');
    return await response.json();
}

const getCaseById = async (id) => {
    const response = await fetch(`${API_URL}/cases/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error(`Failed to fetch case ${id}`);
    return await response.json();
}


export default {
    getAllCases,
    getCaseById
}