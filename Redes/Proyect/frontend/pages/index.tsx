import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { SkeletonPlaceholder } from '@carbon/react'

import NavBar from '../components/NavBar'
import FolderExplorer from '../components/FolderExplorer'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.contentLayout}>
        <FolderExplorer />
        <div>
          <SkeletonPlaceholder
            className={styles.max}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
