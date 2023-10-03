const getTagsFromLine = (line) => {
  const chars = line.split('')
  let currentTag = ''
  const tags = []
  let tagStarted = false
  for (const c of chars) {
    if (c === '#') {
      if (!tagStarted) {
        tagStarted = true
      } else {
        if (currentTag) {
          tags.push(currentTag)
        }
        tagStarted = false
        currentTag = ''
      }
    } else if (c === ' ') {
      tagStarted = false
      currentTag = ''
    } else if (tagStarted) {
      currentTag += c
    }
  }
  return tags.filter((t) => !t.startsWith(' '))
}

const parse = (text = '') => {
  const lines = text.split('\n')
  const tags = []
  for (const line of lines) {
    for (const t of getTagsFromLine(line)) {
      tags.push(t)
    }
  }

  const actions = ['@weibo', '@dropbox', '@i']
    .filter((c) => text.includes(c))
    .map((c) => c.replace(/^@/, ''))

  let cleanedText = text
  for (const action of actions) {
    if (action !== 'i') {
      cleanedText = cleanedText.replace(`@${action}`, '')
    }
  }

  for (const t of tags) {
    cleanedText = cleanedText.replace(`#${t}#`, '')
  }

  return {
    rawText: text,
    cleanedText,
    tags,
    actions,
  }
}

export default parse
