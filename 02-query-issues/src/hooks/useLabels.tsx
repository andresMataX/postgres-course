import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../api/githubApi'
import { sleep } from '../helpers/sleep'
import { Label } from '../interfaces/label.interface'

const getLabels = async () => {
  await sleep(2)
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100')
  return data
}

export const useLabels = () => {
  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 791921801,
        node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
        url: 'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
        name: '❤️',
        color: 'ffffff',
        default: false,
      },
      {
        id: 196858374,
        node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
        url: 'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
        name: 'CLA Signed',
        color: 'e7e7e7',
        default: false,
      },
    ],
  })

  return labelsQuery
}
