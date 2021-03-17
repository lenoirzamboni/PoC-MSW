import styled, { css } from 'styled-components'
import useGetPeople from './useGetPeople'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5em;
`

const CustomFont = css`
  font-size: 2em;
`

const Loading = styled.p`
  ${CustomFont}
  color: green;
`

const Error = styled.p`
  ${CustomFont}
  color: red;
`

const Person = styled.p`
  ${CustomFont}
  padding: 0;
  margin: 0.3em;
  color: blue;
`

function App() {
  const { isLoading, hasError, people } = useGetPeople()

  return (
    <Wrapper>
      {isLoading && <Loading>Loading...</Loading>}
      {hasError && <Error>Error...</Error>}
      {people &&
        people.map((item, index) => (
          <Person key={index}>{`${item.name}`}</Person>
        ))}
    </Wrapper>
  )
}

export default App
