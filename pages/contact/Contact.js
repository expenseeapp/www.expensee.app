import React from 'react'
import { useRouter } from 'next/router'
import Cards from '../../components/Cards'
import MarkdownCard from '../../components/MarkdownCard'
import Nav from '../../components/Nav'
import pageStyles from '../../styles/Page.module.css'

const content = `

我是ExpenSee的作者 [明和](https://i.giki.app), 如果你对 ExpenSee 有任何的意见和建议，或者想和交个朋友，你可以在下面的社交平台中找到我.

* GitHub: [@metrue](https://github.com/metrue)
* Twitter: [@metrue](https://twitter.com/_metrue)
* 微博: [@明和](https://weibo.com/2165714507/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1)
* 即刻: [@明和](https://web.okjike.com/u/53C37D51-21DA-4C45-ABE6-C8A851390408)
* Email: h.minghe # gmail.com

`

function Contact() {
  const router = useRouter()

  const redirectHome = () => {
    router.push('/')
  }

  const navItems = []
  return (
    <div className={pageStyles.Container}>
      <Nav right={navItems} onLogoClick={redirectHome} />
      <Cards
        // TODO compose about
        data={[content]}
        refreshing={false}
        renderPlaceholder={false}
        numberOfColumn={1}
        onRefresh={() => {}}
        onEndReached={() => {}}
        renderItem={(txt) => <MarkdownCard text={txt} />}
      />
    </div>
  )
}

export default Contact
