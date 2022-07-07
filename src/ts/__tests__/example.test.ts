import twoSums from '../example'

test('Test if two sums function works', () => {
  const nums = [2, 7, 11, 15]
  const target = 9

  const result = twoSums(nums, target)

  expect(result).toEqual([0, 1])
})
