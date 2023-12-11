import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/actions.service'

interface Options {
  id: number
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isError,
    error,
    isLoading,
    isFetching,
  } = useQuery(['product', id], () => getProductById(id))

  return {
    product,
    isError,
    error,
    isLoading,
    isFetching,
  }
}
