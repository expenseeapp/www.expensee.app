const { format } = require('./date')

it('Date format', async () => {
  const dateStr = 'Sat Dec 28 00:04:05 2019'
  const layout = 'YYYY-MM-DD HH:mm:ss'
  const output = format(dateStr, layout)
  expect(output).toBe('2019-12-28 00:04:05')
})
