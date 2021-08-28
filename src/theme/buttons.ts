let buttons: Record<string, any> = {}

const buttonBase = {
  fontFamily: 'Nunito Sans',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '14px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  letterSpacing: '-0.6px',
  borderRadius: '20px',
  bg: 'transparent',
  border: '2px solid transparent',
  color: 'white',
  transition: 'all .2s'
}

const buttonPaddingSizes = {
  small: {
    px: '2rem',
    py: '0.75rem'
  },
  medium: {
    px: '1.125rem',
    py: '0.625rem'
  },
  large: {
    px: '4rem',
    py: '1.25rem'
  },
}

const buttonColorStates = {
  primary: {
    backgroundColor: 'w3ButtonPrimary',
    borderColor: 'w3ButtonPrimary',
    '&:hover': {
      bg: 'w3ButtonPrimaryHover',
      borderColor: 'w3ButtonPrimaryHover',
    },
    '&:active': {
      bg: '#255661',
      borderColor: '#255661',
    },
    '&[disabled]': {
      bg: 'w3TextNavTeal',
      borderColor: 'w3TextNavTeal',
      cursor: 'not-allowed'
    }
  },
  secondary: {
    bg: 'w3ButtonSecondary',
    borderColor: 'w3ButtonSecondary',
    color: 'white',
    '&:active': {
      bg: 'rgba(104, 129, 132, 0.2)',
    },
    '&[disabled]': {
      cursor: 'not-allowed'
    }
  },
  hollow: {
    boxShadow: 'none',
    color: 'white',
  },
  callout: {
    color: 'white',
    background: 'linear-gradient(0deg, #529DAD 1.85%, #60C092 97.11%)',
  },
}

Object.keys(buttonColorStates).map((name) => {
  Object.keys(buttonPaddingSizes).map((size) => {
    buttons[name+(size.charAt(0).toUpperCase() + size.slice(1))] = {
      ...buttonBase,
      ...buttonColorStates[name as keyof typeof buttonColorStates],
      ...buttonPaddingSizes[size as keyof typeof buttonPaddingSizes]
    }
  })
})

export default buttons
