import Cards from '../Cards'
import MarkdownCard from '../MarkdownCard'
import Nav from '../Nav'
import React from 'react'
import pageStyles from '../../styles/Page.module.css'
import { useRouter } from 'next/router'

const docs = `

ExpenSee 是一款非常简单易用的记账应用，在您下载按照了 ExpenSee 之后，我们建议您立即配置 ExpenSee 的快捷指令，这样您就可以通过Siri进行语音记账了，无需打开 Expensee 应用即可记账. 简单几个步骤即可以完成,

* 打开 ExpenSee
* 点击左上角进入设置页面
* 点击顶部的 "添加到 Siri"
* 然后输入或者录制一个指令来触发 ExpenSee, 比如您可以输入或者直接说 "我要记账", 然后点击完成.
* 所有配置完成了，以后你就可以直接说 "嘿，Siri, 我要记账" 来进行记账了。

ExpenSee 的开发状态持续同步在 Twitter 和即刻中，你可以关注对应的 Thread 来了解最新的开发状态，

* [Twitter](https://twitter.com/_metrue/status/1657214288455692288)
* [即刻](https://web.okjike.com/originalPost/645ef9679536223e28833495)

`

const Document = () => {
  const router = useRouter()

  const onLogoClick = () => {
    router.push('/')
  }

  return (
    <div className={pageStyles.Container}>
      <Nav right={[]} onLogoClick={onLogoClick} />
      <Cards
        // TODO compose about
        data={[docs]}
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

export default Document
