/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import { useStateValue } from '../state/state'

import Layout from '../components/Layout'
import SortNav from '../components/SortNav'
import ApiGrid from '../components/ApiGrid'
import Navbar from '../components/Navbar'
import Head from '../components/Head'
import BGCircles from '../components/BGCircles'
import BottomSpace from '../components/BottomSpace'

const Home = () => {
  const [{ dapp }] = useStateValue()
  return (
    <Layout>
      <Head />
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <section className="content">
              <SortNav />
              {dapp?.apis ? <ApiGrid main apis={dapp.apis} /> : null}
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
      <BGCircles />
    </Layout>
  )
}

export default Home
