import parse from './parser'

it('parse', async () => {
  const text =
    "使用'#'和'@'等符号来代替显示的按钮，感觉更加简洁，但是似乎需要一个文档来补充. @weibo #giki.app开发#"
  const { rawText, cleanedText, tags, actions } = parse(text)
  expect(tags).toEqual(['giki.app开发'])
  expect(actions).toEqual(['weibo'])
  expect(rawText).toEqual(
    "使用'#'和'@'等符号来代替显示的按钮，感觉更加简洁，但是似乎需要一个文档来补充. @weibo #giki.app开发#",
  )
  expect(cleanedText).toEqual(
    "使用'#'和'@'等符号来代替显示的按钮，感觉更加简洁，但是似乎需要一个文档来补充.  ",
  )
})
