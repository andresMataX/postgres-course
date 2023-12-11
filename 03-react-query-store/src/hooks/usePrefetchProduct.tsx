import { useQueryClient } from '@tanstack/react-query'
import { getProductById } from '../services'

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient()

  const prefetchProduct = async (id: number) => {
    queryClient.prefetchQuery(['product', id], () => getProductById(id))
  }

  return prefetchProduct
}
