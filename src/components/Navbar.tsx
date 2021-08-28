/** @jsxImportSource theme-ui **/
import { Flex, useThemeUI } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import APIs from '../../public/images/apis.svg'
import PlaygroundImg from '../../public/images/playground.svg'
import Doc from '../../public/images/doc.svg'

const navItems: { [key: string]: { [key: string]: string } } = {
  apis: {
    color: 'w3NavPink',
    bg: 'w3NavPinkBg',
  },
  playground: {
    color: 'w3NavGreen',
    bg: 'w3NavGreenBg',
  },
  docs: {
    color: 'w3NavYellow',
    bg: 'w3NavYellowBg',
  },
}

const NavItem = ({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children?: any
}) => {
  return (
    <li
      className={className}
      sx={{
        transition: 'background-color 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        svg: {
          stroke: navItems[label].color,
          mr: '14px',
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: 0,
          height: '100%',
          width: '0.5rem',
          borderRadius: '4px',
          transition: 'background-color 0.5s ease',
        },
        '&:hover, &.active': {
          backgroundColor: navItems[label]?.bg,
          '&:before': {
            backgroundColor: navItems[label].color,
          },
        },
        a: {
          py: '17px',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          pl: '3.75rem',
          width: '100%',
          height: '50px',
          span: {
            color: 'white',
            fontSize: '1rem',
          },
        },
      }}
    >
      {children}
    </li>
  )
}
const Navbar = () => {
  const { pathname } = useRouter()
  const { theme } = useThemeUI()

  const activeRoute = (path: string, optionalPath?: string): string =>
    (optionalPath && pathname === optionalPath) || pathname.includes(`${path}`)
      ? 'active'
      : ''
  return (
    <nav
      role="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: '82px',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        maxWidth: '15rem',
        zIndex: 100,
        '*': { display: 'flex', flexDirection: 'column' },
        '.col': { flex: 3, '&:last-of-type': { justifyContent: 'flex-end' } },
      }}
    >
      <Flex sx={{ flex: 1, width: '100%' }}>
        <ul
          sx={{
            flex: 1,
            justifyContent: 'flex-start',
            gap: '30px',
            li: {
              width: '100%',
            },
          }}
        >
          <NavItem label="apis" className={activeRoute('/apis', '/')}>
            <Link href="/">
              <a sx={{ alignItems: 'center' }}>
                <APIs />
                <span className="text-nav">Wrappers</span>
              </a>
            </Link>
          </NavItem>
          <NavItem label="playground" className={activeRoute('/playground')}>
            <Link href="/playground">
              <a className="text-nav">
                <PlaygroundImg />
                <span className="text-nav">Playground</span>
              </a>
            </Link>
          </NavItem>
          <NavItem label="docs">
            <a className="text-nav" href="https://web3api.dev" target="_BLANK">
              <Doc />
              <span className="text-nav">Web3API Docs</span>
            </a>
          </NavItem>
        </ul>
      </Flex>
      {/*       <div className="col" sx={{ flex: '3 !important' }}>
        <a href="https://web3api.typeform.com/to/AkTwem3f" target="_BLANK" sx={{
          color: 'white',
          fontSize: 1,
          '&:hover': {
            textDecoration: 'underline'
          }
        }}>Feedback</a>
      </div> */}
    </nav>
  )
}

export default Navbar
