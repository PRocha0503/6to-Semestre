import { ExpandableSearch, Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName, SkipToContent, Theme } from "@carbon/react"
import { Switcher, Upload } from "@carbon/react/icons"
import Link from "next/link"
import router from "next/router"
import styles from "../styles/NavBar.module.scss"
import { useUser } from "./user"

const NavBar = () => {
  const action = (name: string) => {
    console.log(action)
  }

  const user = useUser();
  
  return (
    <div className={styles.navbar}>
      <Theme theme="g100">
        <Header aria-label="Alcaldia Alvaro Obregon">
          <SkipToContent />
          <HeaderName href="/" prefix='Alcaldia'>
            [AO]
          </HeaderName>
          <HeaderGlobalBar>
            <ExpandableSearch
              size="lg"
              labelText="Search"
              closeButtonLabelText="Clear search input"
              id="search-expandable-1"
              onChange={() => { }}
              onKeyDown={() => { }}
            />
            <Link href={'/'}>
              <h5 className={styles.userText}>{user?.username || "Incognito"}</h5>
            </Link>
            <HeaderGlobalAction
              aria-label="Upload"
              onClick={() => router.push('/upload')}
              tooltipAlignment="end">
              <Upload size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={() => action('app-switcher click')}
              tooltipAlignment="end">
              <Switcher size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      </Theme>
    </div>
  )
}


export default NavBar;