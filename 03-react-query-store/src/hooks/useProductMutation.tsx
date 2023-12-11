import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '../products'
import { createProduct } from '../services'

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProduct,

    onMutate: (product) => {
      // Optimistic product
      const optimisticProduct: Product = {
        id: Math.random(),
        ...product,
      }

      // Almacenar en caché
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct]

          return [...old, optimisticProduct]
        }
      )

      return { optimisticProduct }
    },

    onSuccess: (product, _, context) => {
      // queryClient.invalidateQueries(['products', { filterKey: data.category }])

      queryClient.removeQueries(['products', context?.optimisticProduct.id])

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [product]

          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct
          })
        }
      )
    },

    onError: (_, variables, context) => {
      queryClient.removeQueries(['products', context?.optimisticProduct.id])

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (old) => {
          if (!old) return []

          return old.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id
          })
        }
      )
    },
  })

  return mutation
}
