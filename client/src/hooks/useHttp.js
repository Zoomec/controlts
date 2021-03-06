import { useState } from "react"

const useHttp = (apiLoadFunc) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const request = async (apiFunc) => {

        setLoading(true)
        try {
            const data = await apiFunc()
            return data
        } catch (error) {
            setError(error.message || 'something went wrong')
        } finally {
            setLoading(false)
        }

    }

    const clearError = () => setError('')

    return { request, loading, error, clearError }

}


export default useHttp