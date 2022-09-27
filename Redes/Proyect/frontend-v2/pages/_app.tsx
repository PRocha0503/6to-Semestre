import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/table/lib/css/table.css";

import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'


// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return( // Provide the client to your App
   <QueryClientProvider client={queryClient}>
     <Component {...pageProps} />
   </QueryClientProvider>
  )
}

export default MyApp
