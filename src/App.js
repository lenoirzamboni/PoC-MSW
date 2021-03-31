import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'

import styled, { css } from 'styled-components'
import useGetData from './useGetData'

import error from './images/error.png'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: black;
`

const CustomFont = css`
  font-size: 2em;
  color: yellow;
`

const Loading = styled.p`
  ${CustomFont}
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
`

function App() {
  const { isLoading, hasError, data } = useGetData()

  return (
    <Wrapper>
      {hasError && <Error src={error} alt="error" />}
      <Crawl>
        {isLoading && <Loading>Loading...</Loading>}
        {data &&
          data.map((item, index) => (
            <Person key={index}>{`${item.name}`}</Person>
          ))}
      </Crawl>
    </Wrapper>
  )
}

export default App
