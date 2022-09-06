import { ExpandableSearch, Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName, SkipToContent, Theme } from "@carbon/react"
import { Switcher } from "@carbon/react/icons"
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
    const action = (name: string) => {
        console.log(action)
      }

    return (
        <Theme theme="g100">
        <Header aria-label="Alcaldia Alvaro Obregon">
          <SkipToContent />
          <HeaderName prefix='Alcaldia'>
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
            <h5 className={styles.userText}>Chava_God</h5>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={() => action('app-switcher click')}
              tooltipAlignment="end">
              <Switcher size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      </Theme>
    )
}


export default NavBar;