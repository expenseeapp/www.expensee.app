const { getUserName, isLandingPage } = require('./url')

describe('url', () => {
  it('isLandingPage', () => {
    const hosts = ['giki.app', 'gikiapplocalhost', 'fleself.com']
    let count = 0
    for (const h of hosts) {
      count++
      expect(isLandingPage(h)).toBe(true)
    }
    expect(count).toBe(3)
  })
  it('isNotLandingPage', () => {
    const hosts = ['a.com', 'b.com', 'c.com']
    let count = 0
    for (const h of hosts) {
      count++
      expect(isLandingPage(h)).toBe(false)
    }
    expect(count).toBe(3)
  })

  it('getUserName from hostname', async () => {
    let hostname = 'a.giki.app'
    const output = getUserName(hostname)
    expect(output).toBe('a')

    hostname = 'giki.app'
    expect(getUserName(hostname)).toBe('')

    hostname = 'a.b.giki.app'
    expect(getUserName(hostname)).toBe('a.b')

    hostname = 'a_b.giki.app'
    expect(getUserName(hostname)).toBe('a_b')

    hostname = 'a.gikiapplocalhost'
    expect(getUserName(hostname)).toBe('a')

    hostname = 'a.fleself.com'
    expect(getUserName(hostname)).toBe('a')

    hostname = 'fleself.com'
    expect(getUserName(hostname)).toBe('')
  })
})
