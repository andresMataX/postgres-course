import { useState } from 'react'
import { useIssuesInfinite } from '../../hooks'
import { State } from '../../interfaces'
import { LoadingIcon } from '../../share/components/LoadingIcon'
import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'

export const ListViewInfinte = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setstate] = useState<State>()

  const { issuesQuery } = useIssuesInfinite({
    labels: selectedLabels,
    state,
  })

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className='row mt-5'>
      <div className='col-8'>
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChange={(newState) => setstate(newState)}
          />
        )}

        <button
          className='btn btn-outline-primary mt-2'
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage}
        >
          Load more
        </button>
      </div>

      <div className='col-4'>
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelChange={onLabelChange}
        />
      </div>
    </div>
  )
}
