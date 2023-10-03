import { useAuthor } from '../../lib/contexts/author'
import Cards from '../../components/Cards'
import Markdown from '../../components/MarkdownCard'

function Bio() {
  const { author } = useAuthor()

  if (!author) {
    return null
  }

  return (
    <Cards
      // TODO compose about
      data={[author.introduction]}
      refreshing={false}
      renderPlaceholder={false}
      numberOfColumn={1}
      // eslint-disable-next-line
      onRefresh={() => {}}
      // eslint-disable-next-line
      onEndReached={() => {}}
      renderItem={(txt, key) => <Markdown key={key} text={txt} />}
    />
  )
}

export default Bio
