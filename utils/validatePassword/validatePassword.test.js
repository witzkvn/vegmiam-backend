const { expectCt } = require('helmet');
const validatePassword = require('./validatePassword');

test('Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:', () => {
  expect(validatePassword('Ac3*')).toBe(false)
  expect(validatePassword('ABcd12*')).toBe(false)
  expect(validatePassword('abcd123*')).toBe(false)
  expect(validatePassword('ABCD123*')).toBe(false)
  expect(validatePassword('ABCDefg*')).toBe(false)
  expect(validatePassword('ABcd1234')).toBe(false)
  expect(validatePassword('ABcd1234*')).toBe(true)
  expect(validatePassword('Example1*')).toBe(true)
})