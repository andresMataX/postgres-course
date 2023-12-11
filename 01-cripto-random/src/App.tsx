import './App.css'
import { useRandom } from './hooks/useRandom'

export const App = () => {
  const query = useRandom()

  return (
    <>
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : query.isError ? (
        <h3>{`${query.error}`}</h3>
      ) : (
        <h1>Número aleatorio: {query.data}</h1>
      )}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? 'Cargando...' : 'Refrescar'}
      </button>
    </>
  )
}
