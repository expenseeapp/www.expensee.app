import { useRouter } from 'next/router'
import Cards from '../../components/Cards'
import Header from '../../components/Head'
import MarkdownCard from '../../components/MarkdownCard'
import Nav from '../../components/Nav'
import pageStyles from '../../styles/Page.module.css'

const content = `

* 2.2.3
  - 修复了编辑和保存状态异常的问题
  - 更好的草稿状态支持
  - 增加了长按删除功能

* 2.1.0
  - 优化了文章书写页面
  - 修复加载更多的功能
  - 修复了i18n的问题

* 2.0.0
  - 优化设置页面，2021年啦，叽喳也成长了半岁多了.

* 1.9.1
  - 优化一些代码.

* 1.8.1
  - 应用的色调微调.

* 1.8.0
  - 减少不必要的依赖，改善app的体积大小.

* 1.7.1
  - 增加了提交日历的功能

* 1.7.0
  - 优化了设置页面

  - 修复了几个小bugs.

* 1.6.2
  - 优化加载过程.

* 1.6.0
  - 基础设施做了一些改善，当然我就要是消费这些改善咯

* 1.5.1
  - 更新好看的图标

* 1.5.0
  - 在文章页面支持了删除功能

* 1.4.91
  - 引入新的文章更新流程.

* 1.4.9
  - 使用更稳定的API

* 1.4.8
  - 修复几个小icon的显示问题.

* 1.4.7
  - 修复一些易用性方面的问题

* 1.4.6
  - 提供更好的用户指导，让第一次使用的用户也快速上手

  - 修复了一些bugs

* 1.4.5
  - 改善所有的展现

* 1.4.4
  - 修复记录卡片的样式问题

  - 修复设置页面的i18n问题

* 1.2.9
* 1. 修复了一些bugs，而且提升性能.

2. 增加用户使用协议

3. 增加了举报功能.

4. 增加了拉黑功能.

* 1.1.7
优化了文章页面.

* 1.1.6
修复了:

  - 通知的小红点不会自动消失的问题.

* 1.1.4
修复了:

  - 个人信息的更新问题.

* 1.1.2
支持了:

  - 黑暗模式的切换

修复了:

  - 登陆过程中点击设置页面的崩溃问题.


* 1.0.7
添加了:

  - 文章详情页面，详情页可以进行文章的like,和全文查阅.

修复了:

  - 文章不能全文展示的问题。

  - 修复了设置页面选项的编辑.

* 1.0.4
支持用户删除自己账号的功能

* 1.0.3
修复了

* 1. 导航栏颜色的问题

2. 修复了用户页面叽喳不能like的问题

3. 修复了叽喳块样式不一致的问题

引入了下面的bug：进入了用户页面之后的叽喳仍然显示部分问题.

* 1.0.2
改善用户的使用体验，修复了一系列的bug.
`

function Agreement() {
  const router = useRouter()

  const redirectHome = () => {
    router.push('/')
  }

  return (
    <>
      <Header
        keywords="blog, diary, tweets, tag"
        description="giki.app, a universal platform for your blog, diary, and tweets"
        summary="giki.app, a universal platform for your blog, diary, and tweets"
        url="https://giki.app"
        subject="blog, diary and tweets in one place"
        title="叽喳・Giki"
      />
      <div className={pageStyles.Container}>
        <Nav right={[]} onLogoClick={redirectHome} />
        <Cards
          data={[content]}
          refreshing={false}
          renderPlaceholder={false}
          numberOfColumn={1}
          onRefresh={() => {}}
          onEndReached={() => {}}
          renderItem={(txt) => <MarkdownCard text={txt} />}
        />
      </div>
    </>
  )
}

export default Agreement
