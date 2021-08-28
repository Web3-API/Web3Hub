/** @jsxImportSource theme-ui **/
import { Flex, Themed } from 'theme-ui'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Stars from './Stars'
import Badge from './Badge'
import Dots from '../../public/images/dots.svg'
import { cloudFlareGateway } from '../constants'
import stripIPFSPrefix from '../utils/stripIPFSPrefix'
import { APIData } from '../hooks/ens/useGetAPIfromENS'

type CardProps = {
  api?: APIData
  ipfsHash?: string
  boxShadowOn?: boolean
  noHover?: boolean
  redirectUrl?: string
}

const Card = ({ api, ipfsHash, boxShadowOn, noHover, redirectUrl }: CardProps) => {
  const router = useRouter()

  const redirect = useMemo(
    () => ipfsHash || redirectUrl || 'apis/ens/' + api?.pointerUris[0],
    [ipfsHash, redirectUrl, api?.pointerUris],
  )

  return (
    <div
      className="Card"
      sx={{
        borderRadius: '1.25rem',
        bg: 'cardBg',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        height: '13.4375rem',
        transition: 'transform .2s ease',
        boxShadow: boxShadowOn ? '0rem 2rem 2.75rem rgba(28, 94, 93, 0.1)' : 'none',
      }}
    >
      {api && api.pointerUris && api.pointerUris.length > 0 ? (
        <a
          href="#"
          sx={{
            textDecoration: 'none',
            p: '2rem',
            pb: '1.5rem',
            width: '100%',
            height: '100%',
          }}
          onClick={() => router.replace(redirect)}
        >
          <div className="wrap-contents">
            <div sx={{ display: 'flex', gap: '1.5rem' }}>
              <img
                className="api-logo"
                src={`${cloudFlareGateway}${
                  ipfsHash || stripIPFSPrefix(api.locationUri)
                }${api.icon.replace('./', '/')}`}
                sx={{
                  width: '4.25rem',
                  height: '4.25rem',
                  borderRadius: '20px',
                }}
              />
              <Flex sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Badge label="ipfs" />
                <Stars count={api.favorites} onDark large />
              </Flex>
              <Dots sx={{ position: 'absolute', top: '-4px', right: '-12px' }} />
            </div>

            <div className="info">
              <div className="row" sx={{ justifyContent: 'space-between' }}>
                <Themed.h3
                  className="title"
                  sx={{
                    my: 2,
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    lineHeight: '1.75rem',
                    letterSpacing: '-0.01em',
                    color: 'white',
                  }}
                >
                  {api.name}
                </Themed.h3>
                <div
                  className="subtitle"
                  sx={{
                    my: 2,
                    fontFamily: 'Nunito Sans',
                    fontSize: '0.875rem',
                    lineHeight: '1.125rem',
                    color: 'text',
                    mixBlendMode: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {api.subtext}
                </div>
              </div>
            </div>
          </div>
        </a>
      ) : null}
    </div>
  )
}

export default Card
