if (process.env.NODE_ENV === 'development') {
  import('preact/debug')
}

import 'tailwindcss/tailwind.css'
import '../styles/base.css'
import '../styles/globals.css'
import '../styles/variables.css'
import '../styles/old_global.css'
import '../styles/calendar.css'

import * as G from '../services/graphql/client'
import * as GikiRole from '../services/giki/roles'

import { GoogleAnalytics } from 'nextjs-google-analytics'
import Layout from '../components/Layout'
import React from 'react'
import { ThemeContext } from '../lib/contexts/theme'
import { ThemeProvider } from 'next-themes'
import eni18n from '../i18n/i18n.en.json'
import i18n from 'i18n-js'
import useCookie from 'react-use-cookie'
import { useTheme } from '../lib/hooks'
import zhi18n from '../i18n/i18n.zh.json'
import mixpanel from 'mixpanel-browser'

i18n.translations = {
  en: eni18n,
  zh: zhi18n,
  'zh-Hant': zhi18n,
}
i18n.locale = 'zh'
i18n.fallbacks = true

function GikiApp(appProps) {
  const { Component, props } = appProps
  const pageProps = appProps.pageProps || {}
  const [tok] = useCookie('__i_token', '')

  mixpanel.init('3f62e4f5add7158422c76e5c481cc551', {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
  })

  const { setTheme } = useTheme(pageProps.theme)
  // TODO merge the theme stuff
  return (
    <ThemeProvider defaultTheme="light">
      <ThemeContext.Provider value={{ theme: 'light', setTheme }}>
        <Layout>
          <GoogleAnalytics trackPageViews gaMeasurementId="G-ENSWGXCPJ8" />
          <Component {...{ ...pageProps, author: props.author, viewer: props.viewer }} />
        </Layout>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
  // We merge the author into page props
}

// NOTE the object of ctx is different between the first app load and the router change with route.push, so it's not working when we trying to do the authorization one time for all the page
export const getInitialProps = async ({ ctx }) => {
  const author = await GikiRole.getAuthor(ctx)
  const viewer = await GikiRole.getViewer(ctx)
  return {
    props: {
      author,
      viewer,
    },
  }
}

GikiApp.getInitialProps = getInitialProps

export default GikiApp
