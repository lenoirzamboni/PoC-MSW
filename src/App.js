import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'

import styled, { css } from 'styled-components'
import useGetPeople from './useGetPeople'

import error from './images/error.png'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: black;
`

const CustomFont = css`
  font-size: 2em;
`

const Loading = styled.p`
  ${CustomFont}
  color: green;
`

const Error = styled.img`
  background-color: black;
  width: 60%;
  height: 60%;
  align-self: center;
`

const Person = styled.p`
  ${CustomFont}
  padding: 0;
  margin: 0.3em;
  color: yellow;
`

function App() {
  const { isLoading, hasError, people } = useGetPeople()

  return (
    <Wrapper>
      {hasError && <Error src={error} alt="error" />}
      <Crawl>
        {isLoading && <Loading>Loading...</Loading>}
        {people &&
          people.map((item, index) => (
            <Person key={index}>{`${item.name}`}</Person>
          ))}
      </Crawl>
    </Wrapper>
  )
}

export default App
