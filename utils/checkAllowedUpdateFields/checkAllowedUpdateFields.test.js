const filterObj = require('./checkAllowedUpdateFields');

test('Should filter an object with only allowed fields', () => {
  const testObj = {
    name: 'me',
    age: 25,
    gender: 'male',
    location: 'Paris',
    private: true,
    "preferences": {
      "theme": "light",
      "random": "wooo",
      "graphTime": "test"
    },
    "settings": {
      "devise": "something",
      "aaaa": "bbb"
    }
  }

  // expect(filterObj(testObj, 'name')).toEqual({
  //   name: 'me'
  // })
  // expect(filterObj(testObj, 'name', 'private')).toEqual({
  //   name: 'me',
  //   private: true
  // })
  // expect(filterObj(testObj, 'name', 'location', 'age')).toEqual({
  //   name: 'me',
  //   age: 25,
  //   location: 'Paris',
  // })
  expect(filterObj(testObj, 'settings')).toEqual({
    "settings": {
      "devise": "something",
    }
  })
  // expect(filterObj(testObj, 'preferences')).toEqual({
  //   "preferences": {
  //     "theme": "light",
  //     "graphTime": "test"
  //   }
  // })
})