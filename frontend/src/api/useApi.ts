import { useEffect, useRef, useReducer } from 'react'
import { IIngredient } from '../models'

interface IState {
    status: 'idle' | 'fetching' | 'fetched' | 'error'
    error: string | undefined,
    data: any
}
interface IAction {
    type: 'FETCHING' | 'FETCHED' | 'FETCH_ERROR',
    payload: any
}
interface ICacheData {
    [key:string]: any
}

export const useApi = (api:string) => {
  const cacheData = useRef<ICacheData>({})
  const initialState:IState = {
    status: 'idle',
    error: undefined,
    data: [],
  }
  const ApiCallReducer = (state:IState, action: IAction):IState => {
    switch (action.type) {
        case 'FETCHING':
          return { ...initialState, status: 'fetching' }
        case 'FETCHED':
          return { ...initialState, status: 'fetched', data: action.payload as IIngredient[] }
        case 'FETCH_ERROR':
          return { ...initialState, status: 'error', error: action.payload as string }
        default:
          return state
      }
  }

  const [state, dispatch] = useReducer(ApiCallReducer, initialState)

  useEffect(() => {
    let revokeRequest = false
    if (!api || !api.trim()) return
    const renderData = async () => {
      dispatch({ type: 'FETCHING', payload: [] })
      if (cacheData.current[api]) {
        const data = cacheData.current[api]
        dispatch({ type: 'FETCHED', payload: data })
      } else {
        try {
          const res = await fetch(api)
          const data = await res.json()
          cacheData.current[api] = data
          if (revokeRequest) return
          dispatch({ type: 'FETCHED', payload: data })
        } catch (error) {
          if (revokeRequest) return
          dispatch({ type: 'FETCH_ERROR', payload: (error as Error).message })
        }
      }
    }
    renderData()
    return function cleanup() {
      revokeRequest = true
    }
  }, [api])
  return state
}