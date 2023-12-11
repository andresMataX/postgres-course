import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/actions.service'

interface Options {
  filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    data: products = [],
    isError,
    error,
    isLoading,
    isFetching,
  } = useQuery(['products', { filterKey }], () => getProducts({ filterKey }), {
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return {
    products,
    isError,
    error,
    isLoading,
    isFetching,
  }
}
