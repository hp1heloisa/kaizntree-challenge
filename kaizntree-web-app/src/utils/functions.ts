import { APICallError } from "./errors"

export const createAccount = async (data: {
    email: string,
    password: string,
    confirm_password: string
}) => {
    const url = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? 'http://localhost:8000/api') + process.env.NEXT_PUBLIC_SIGNUP_ROUTE
    const result = await fetch(url,{method: "POST", body: JSON.stringify(data), headers: {"Content-type": 'application/json'}})
        .then(res => {return res})
        .catch(error => {throw new APICallError(error.status, error.message)})
    
    const response = await result.json()

    if (result.status === 201)
        return {status: 201, response}
    else 
        throw {error: response.email[0], status: result.status}
}

export const getCategories = async (token: string) => {
    const url = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? 'http://localhost:8000/api') + process.env.NEXT_PUBLIC_GET_CATEGORIES
    const result = await fetch(url,{method: "GET", headers: {"Content-type": 'application/json',  "Authorization": `Bearer ${token}`}})
        .then(res => {return res})
        .catch(error => {throw new APICallError(error.status, error.message)})
    
    const response = await result.json()

    if (result.status === 200)
        return response
    else 
        throw {error: response.email[0], status: result.status}
}

export const getItems = async (token: string) => {
    const url = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? 'http://localhost:8000/api') + process.env.NEXT_PUBLIC_GET_ITEMS
    const result = await fetch(url,{method: "GET", headers: {"Content-type": 'application/json',  "Authorization": `Bearer ${token}`}})
        .then(res => {return res})
        .catch(error => {throw new APICallError(error.status, error.message)})
    
    const response = await result.json()

    if (result.status === 200)
        return response
    else 
        throw {error: response.email[0], status: result.status}
}