import Head from 'next/head'
import PropTypes from 'prop-types'
import Script from 'next/script'

function Header({ keywords, description, summary, url, subject, title }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          name="viewport"
        />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta name="subject" content={subject} />
        <meta name="summary" content={summary} />
        <meta name="url" content={url} />
        <meta name="identifier-URL" content={url} />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/152.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/16.png" />
        <link rel="manifest" href="/images/manifest.json" />
        <link rel="alternate" href="https://giki.app?lang=en" hrefLang="x-default" />
        <link rel="alternate" href="https://giki.app?lang=zh" hrefLang="zh-CN" />
        <link rel="alternate" href="https://giki.app?lang=zh" hrefLang="zh-TW" />
        <link rel="alternate" href="https://giki.app?lang=zh" hrefLang="zh-HK" />
        <link rel="alternate" href="https://giki.app?lang=zh" hrefLang="zh-SG" />
        <link rel="alternate" href="https://giki.app?lang=en" hrefLang="en-US" />
        <link rel="alternate" href="https://giki.app?lang=zh" hrefLang="en-CA" />
        <link
          rel="preload"
          as="font"
          href="https://cdn.jsdelivr.net/gh/gikiapp/cdn@1.0.0/fonts/SourceHanSansCN-Normal.otf"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/144.png" />
        <meta name="theme-color" content="#ffffff" />
        <title>{title}</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-162198661-1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-162198661-1');
   `,
          }}
        />
      </Head>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/languages/go.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/languages/javascript.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/languages/java.min.js"
        strategy="lazyOnload"
      />
    </>
  )
}

Header.propTypes = {
  keywords: PropTypes.string,
  description: PropTypes.string,
  summary: PropTypes.string,
  url: PropTypes.string,
  subject: PropTypes.string,
  title: PropTypes.string,
}

export default Header
