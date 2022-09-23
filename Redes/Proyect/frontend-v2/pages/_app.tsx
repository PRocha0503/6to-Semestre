import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";
import "@blueprintjs/table/lib/css/table.css";

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'


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
