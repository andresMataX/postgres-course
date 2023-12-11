import axios from 'axios'

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer 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`,
  },
})
