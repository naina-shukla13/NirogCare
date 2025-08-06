// utils/groupBy.ts

/**
 * Group an array of objects by a specific key.
 * 
 * @param array - The input array to group
 * @param key - The key to group by (must exist as a string in each object)
 * @returns An object where keys are group values and values are arrays of grouped items
 */

export default function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

  