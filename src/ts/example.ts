// Example of a typescript file
// Idea inspired by https://leetcode.com/problems/two-sum/

/**
 * Finds indices of two numbers in an array that add up to a target sum.
 * @param nums List of integers
 * @param target Target value
 * @returns List of indices of the two numbers that add up to the target
 */
function twoSums(nums: number[], target: number): number[] {
  const map: { [key: number]: number } = {}
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i]
    if (complement in map) {
      return [map[complement], i]
    }
    map[nums[i]] = i
  }
  return []
}

export default twoSums
