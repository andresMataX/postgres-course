import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { githubApi } from '../api/githubApi'
import { sleep } from '../helpers/sleep'
import { Issue, State } from '../interfaces'

interface Props {
  state?: State
  labels: string[]
}

const getIssues = async (
  labels: string[] = [],
  state?: State,
  page: number = 1
) => {
  await sleep(2)

  const params = new URLSearchParams()

  if (state) params.append('state', state)
  if (labels.length > 0) params.append('labels', labels.join(','))

  params.append('page', page.toString())
  params.append('per_page', '5')

  const { data } = await githubApi.get<Issue[]>('/issues', { params })
  return data
}

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [labels, state])

  const issuesQuery = useQuery(
    ['issues', { state, labels, page }],
    () => getIssues(labels, state, page),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  )

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return

    setPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading' : page,
    nextPage,
    prevPage,
  }
}
