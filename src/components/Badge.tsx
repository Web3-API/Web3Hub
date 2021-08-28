/** @jsxImportSource theme-ui **/
import { cloudFlareGateway } from '../constants'

type BadgeProps = {
  label: string
  ipfsHash?: string
  onDark?: boolean
}

const Badge = ({ label, onDark, ipfsHash }: BadgeProps) => {
  return (
    <div
      sx={{
        textTransform: 'uppercase',
        borderRadius: '1.125rem',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        px: '10px',
        py: '2px',
        color: onDark ? '#CAD9F3' : 'white',
        fontFamily: '"Poppins"',
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
        cursor: ipfsHash ? 'pointer' : 'default'
      }}
      onClick={()=>{
        if(ipfsHash) {
          window.open(cloudFlareGateway+ipfsHash)
        }
      }}
    >
      {label}
    </div>
  )
}

export default Badge
