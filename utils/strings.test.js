import { maybeEmailAddress } from './strings'

describe('strings', () => {
  it('maybeEmailAddress', () => {
    let wrongEmail = 'abc'
    expect(maybeEmailAddress(wrongEmail)).toBe(false)
    wrongEmail = ''
    expect(maybeEmailAddress(wrongEmail)).toBe(false)
    let correctEmail = 'h.minghe@gmail.com'
    expect(maybeEmailAddress(correctEmail)).toBe(true)
    correctEmail = 'hMing@qq.com'
    expect(maybeEmailAddress(correctEmail)).toBe(true)
  })
})
