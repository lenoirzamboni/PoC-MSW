import axios from 'axios'
import { useEffect, useReducer } from 'react'
import { BASE_URL } from './constants'

function reducer(currentState, newState) {
  return { ...currentState, ...newState }
}

const initState = {
  isLoading: false,
  hasError: false,
  people: null,
}

export default function useGetPeople() {
  const [state, setState] = useReducer(reducer, initState)

  useEffect(() => {
    const fetchData = async () => {
      setState({ isLoading: true, hasError: false, people: null })
      try {
        const { data, status } = await axios.get(`${BASE_URL}/people`)

        if (status === 200) {
          setState({ isLoading: false, hasError: false, people: data.results })
        } else {
          setState({ isLoading: false, hasError: true, people: null })
        }
      } catch (error) {
        setState({ isLoading: false, hasError: true, people: null })
      }
    }

    fetchData()
  }, [])

  const { isLoading, hasError, people } = state

  return { isLoading, hasError, people }
}
