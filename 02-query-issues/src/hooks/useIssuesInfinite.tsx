import { useInfiniteQuery } from '@tanstack/react-query'
import { githubApi } from '../api/githubApi'
import { sleep } from '../helpers'
import { Issue, State } from '../interfaces'

interface Props {
  state?: State
  labels?: string[]
  page?: number
}

interface QueryProps {
  pageParam?: number
  queryKey: (string | Props)[]
}

const getIssues = async ({ queryKey, pageParam = 1 }: QueryProps) => {
  const [, , args] = queryKey
  const { labels = [], state } = args as Props

  await sleep(2)

  const params = new URLSearchParams()

  if (state) params.append('state', state)
  if (labels.length > 0) params.append('labels', labels.join(','))

  params.append('page', pageParam.toString())
  params.append('per_page', '5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params })
  return data
}

export const useIssuesInfinite = ({ state, labels, page }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels, page }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return

        return pages.length + 1
      },
    }
  )

  return {
    issuesQuery,
  }
}
