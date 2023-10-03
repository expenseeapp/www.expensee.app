import PropTypes from 'prop-types'
import React from 'react'
import { useRouter } from 'next/router'
import Cards from '../Cards'
import Markdown from '../MarkdownCard'
import Nav from '../Nav'
import SignButton from '../Nav/SignButton'
import pageStyles from '../../styles/Page.module.css'

const content = `

**叽喳 这个小应用**

欢迎来到 "叽喳" 这个简单而特别的记录应用，在你思考的路上希望她能伴你左右.


**独立域名**

在你开始登陆使用叽喳的那一刻开始，你的专属个人站点已经准备好了，你随时随地的记录，将同时发布在你的个人站点中，如果你是叽喳的付费订阅用户，你是可以直接给作者发[Email](mailto:h.minghe@gmail.com)进行个人独立域名的绑定.


**碎片记录**

记录的冲动是突发, 思考和想法很多时候是碎片的，用叽喳来收集这些有意义的瞬间吧.


**Markdown 也可以**

叽喳可以记录很轻很短的想法碎片，同时也支持 Markdown 来丰富你的记录，进行段落的，丰富的表达.
  
**所有平台**

不止是 [iPhone](https://apps.apple.com/cn/app/%E5%8F%BD%E5%96%B3/id1519478312), 叽喳 也有[Mac, Linux, Windows](https://github.com/gikiapp/giki.app/releases), [Chrome](https://chrome.google.com/webstore/detail/giki/hcjaennlplpppgfolnagejnpcmbhdjba) 和 [Firefox](https://addons.mozilla.org/en-US/firefox/addon/giki) 的客户端, 随时随手记录那些闪现的想法和思考.
`

function AboutGiki() {
  const router = useRouter()

  const redirectHome = () => {
    router.push('/')
  }

  const navItems = []
  navItems.push(<SignButton />)

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
        renderItem={(txt, key) => <Markdown key={key} text={txt} />}
      />
    </div>
  )
}

AboutGiki.propTypes = {
  itemID: PropTypes.string,
  name: PropTypes.string,
  domain: PropTypes.string,
}
export default AboutGiki
