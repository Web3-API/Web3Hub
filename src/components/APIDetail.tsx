/** @jsxImportSource theme-ui **/
import { useEffect } from 'react'
import { Flex, Themed, Button } from 'theme-ui'
import BottomSpace from '../components/BottomSpace'
import Stars from '../components/Stars'
import PlaygroundImg from '../../public/images/playground.svg'
import { cloudFlareGateway, domain } from '../constants'
import { useRouter } from 'next/router'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import { useStateValue } from '../state/state'
import { useAuth } from '../hooks/useAuth'

type APIDetailProps = {
  api?: APIData
  update: () => Promise<void>
}

const APIDetail = ({ api, update }: APIDetailProps) => {
  const router = useRouter()
  const [{ dapp }] = useStateValue()
  const { authenticate } = useAuth(dapp)

  const handleFavorite = async () => {
    if (!dapp.did) return authenticate()

    const response = await fetch(domain + '/api/apis/favorites/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userDid: dapp.did, apiId: api.id }),
    })
    const result = await response.json()

    if (result.status === 200) {
      await update()
    }
  }

  useEffect(() => {
    if (dapp.did) {
      update()
    }
  }, [dapp.did])

  return (
    <div
      className="wrap"
      sx={{
        borderRadius: '20px',
        bg: 'black',
        p: '3.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '12px 20px 54px -6px #141316',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Flex className="left" sx={{ flexDirection: 'column', width: '100%' }}>
        <Flex sx={{ alignItems: 'flex-start', gap: '40px' }}>
          <img
            className="api-logo"
            src={`${cloudFlareGateway}${api.locationUri}${api.icon.replace('./', '/')}`}
            sx={{
              width: '6.25rem',
              height: '6.25rem',
              borderRadius: '20px',
            }}
          />
          <div className="api-info" sx={{ width: '100%', mb: '2.5rem' }}>
            <Themed.h2 className="title" sx={{ mb: '.75rem' }}>
              {api.name}
            </Themed.h2>
            <div
              className="subtitle"
              sx={{
                color: '#FFF',
                mb: '.75rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {api.subtext}
            </div>
            <p
              className="description"
              sx={{
                fontSize: '.875rem',
                color: 'rgba(255, 255, 255, .5)',
              }}
            >
              {api.description}
            </p>
          </div>
        </Flex>
        <Flex className="bottom">
          <div sx={{ width: '100%', maxWidth: '50rem' }}>
            <Themed.h3 sx={{ textAlign: 'left' }}>Get Started</Themed.h3>
            <Themed.code>
              <Themed.pre>{`yarn install @web3api/client`}</Themed.pre>
            </Themed.code>
            <Themed.code>
              <Themed.pre>
                {`import {
  Web3API,
  Ethereum,
  IPFS,
  Subgraph
} from "@web3api/client-js";

const api = new Web3API({
  uri: "simplestorage.eth",
  portals: {
    ethereum: new Ethereum({ provider: (window as any).ethereum }),
    ipfs: new IPFS({ provider: "http://localhost:5001" }),
    subgraph: new Subgraph({ provider: "http://localhost:8020" })
  }
})`}
              </Themed.pre>
            </Themed.code>
          </div>
        </Flex>
      </Flex>
      <Flex className="right" sx={{ width:'100%', maxWidth: '300px' }}>
        <div className="info-card">
          <Flex
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '1rem',
            }}
          >
            <Themed.h3 className="title">{api.name}</Themed.h3>
            <Stars onClick={handleFavorite} count={api.favorites || 0} large onDark />
          </Flex>
          <ul
            className="links"
            sx={{
              mb: '3rem',
              '*': {
                color: 'rgba(255, 255, 255, 0.5)',
                textDecoration: 'none',
              },
              li: {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '.875rem',
                lineHeight: '120%',
                mb: '11px',
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            {'pointerUris' in api &&
              api.pointerUris.map((pointer, idx) => {
                return (
                  <li sx={{ display: 'flex' }} key={idx + 'pointerURI'}>
                    <img
                      sx={{ maxWidth: '1rem', mr: '.5rem' }}
                      src="/images/link.svg"
                      alt="icon"
                    />
                    <a href={pointer} target="_BLANK">
                      {pointer}
                    </a>
                  </li>
                )
              })}
            {'locationUri' in api && (
              <li sx={{ display: 'flex' }}>
                <img
                  sx={{ maxWidth: '1rem', mr: '.5rem' }}
                  src="/images/link.svg"
                  alt="icon"
                />
                <a href={`${cloudFlareGateway}${api.locationUri}`} target="_BLANK">
                  {('ipfs/' + api.locationUri).substring(0, 25) + '...'}
                </a>
              </li>
            )}
            {/* {'links' in api &&
              api.links.map((link, idx) => {
                if (link.name === 'github') {
                  return (
                    <li sx={{ display: 'flex' }} key={'apilink' + idx}>
                      <img
                        sx={{ maxWidth: '1.1875rem', mr: 2 }}
                        src="/images/github.svg"
                        alt="icon"
                      />
                      <a href="https://www.github.com/ORG/REPO" target="_BLANK">
                        github.com/ORG/REPO
                      </a>
                    </li>
                  )
                }
                if (link.name === 'website') {
                  return (
                    <li sx={{ display: 'flex' }} key={'apilink' + idx}>
                      <img
                        sx={{ maxWidth: '1.1875rem', mr: 2 }}
                        src="/images/doc.svg"
                        alt="icon"
                      />
                      <a href="https://www.github.com/ORG/docs" target="_BLANK">
                        github.com/ORG/DOCS
                      </a>
                    </li>
                  )
                }
              })} */}
          </ul>
          <Button
            variant="secondaryMedium"
            sx={{ backgroundColor: 'white', color: 'black', ml: 'auto' }}
            onClick={() => {
              router.push(`/playground/ens/${api.pointerUris[0]}`)
            }}
          >
            Open Playground
          </Button>
        </div>
      </Flex>
    </div>
  )
}

export default APIDetail
