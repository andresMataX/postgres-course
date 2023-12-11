import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../api/githubApi'
import { sleep } from '../helpers/sleep'
import { Issue } from '../interfaces'

export const getIssueInfo = async (issueNumber: number) => {
  await sleep(2)
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

export const getIssueComments = async (issueNumber: number) => {
  await sleep(2)
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  )
  return data
}

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssueInfo(issueNumber),
    {
      staleTime: 1000 * 60 * 5, // 5 minutos
    }
  )

  const commentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueNumber),
    {
      staleTime: 1000 * 60 * 5, // 5 minutos
      enabled: issueQuery.isSuccess,
    }
  )

  return { issueQuery, commentsQuery }
}
