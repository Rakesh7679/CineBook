import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
})

export async function register(username, email, password) {
    try{
        const response = await api.post('/register', {
            name: username,
            email,
            password
        })
        return response.data
    }
    catch(error){
        console.error('Error in register:', error)
        
    }

}

export async function login(email, password) {
    try{
        const response = await api.post('/login', {
            email,
            password
        })
        return response.data
    }
    catch(error){
        console.error('Error in login:', error)
      
    }
}

export async function getMe(){
    try{
        const response = await api.get('/get-me')
        return response.data
    }
    catch(error){
        console.error('Error in getMe:', error)
        return null
    }

}

