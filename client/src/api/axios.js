import axios from "axios"

const API =  axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use( req => {
    const jwt = localStorage.getItem('accessToken') || null
    if(jwt)
        req.headers.Authorization = `Bearer ${jwt}`
    
    return req
})

export const userLogin = (formData) => API.post('/users/login', formData)
export const userRegister = (formData) => API.post('/users/register', formData)

export const getCompanies = () => API.get('/companies')
export const createCompany = (formData) => API.post('/companies', formData)
export const updateCompany = (id, formData) => API.patch(`/companies/${id}`, formData)
export const deleteCompany = (id) => API.delete(`/companies/${id}`)

export const getProducts = () => API.get('/products')
export const createProduct = (formData) => API.post('/products', formData)
export const updateProduct = (id, formData) => API.patch(`/products/${id}`, formData)
export const deleteProduct = (id) => API.delete(`/products/${id}`)