/** @jsxImportSource theme-ui **/
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Flex, Themed } from 'theme-ui'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const SignInArea = dynamic(() => import('./SignInArea'), { ssr: false })
import onboardInit from '../utils/onboardInit'
import { useStateValue } from '../state/state'
import SearchBox from './SearchBox'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import { height } from 'styled-system'

const Head = () => {
  const router = useRouter()
  const [{ dapp }, dispatch] = useStateValue()
  const [onboard, setOnboard] = useState<any>()

  const [searchOptions, setsearchOptions] = useState(dapp.apis)
  useEffect(() => {
    const onboard = onboardInit(dispatch)
    setOnboard(onboard)
  }, [])

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem('selectedWallet')

    if (previouslySelectedWallet && onboard) {
      onboard?.walletSelect(previouslySelectedWallet)
    }
  }, [onboard])

  const handleSearchValuesChange = (value: APIData[]) => {
    if (value.length === 0) {
      dispatch({
        type: 'sortSelectApi',
        payload: -1,
      })
    } else {
      dispatch({
        type: 'sortSelectApi',
        payload: value,
      })
    }
  }

  return (
    <header
      role="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: '3.5rem',
        pr: '4.5rem',
        height: '8rem',
        background: 'rgba(30, 29, 34, 0.9)',
        '> *': { display: 'flex' },
        '.col': { flex: 2, '&:last-of-type': { justifyContent: 'flex-end' } },
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Link href="/">
          <a
            sx={{
              display: 'block',
              width: '12.5rem',
              height: '3rem',
              mr: '2.5rem',
              mt: '-0.5rem',
            }}
          >
            <img src="/images/logo.svg" alt="logo" />
          </a>
        </Link>
        <SearchBox
          detachedResults
          dark
          searchBy="name"
          placeholder={'Search'}
          labelField="name"
          valueField="name"
          options={searchOptions}
          values={[]}
          onChange={handleSearchValuesChange}
        />
      </Flex>
      <div className="col">
        <SignInArea onDark />
      </div>
    </header>
  )
}

export default Head
