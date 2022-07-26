/**
 * @file Test Environment Interfaces - AssertionResult
 * @module tests/interfaces/AssertionResult
 */

import type { OrNull } from '@flex-development/tutils'

/**
 * Test assertion summary object produced by the `vitest` [`JsonReporter`][1].
 *
 * [1]: https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/node/reporters/json.ts
 */
interface AssertionResult {
  ancestorTitles: string[]
  duration?: OrNull<number>
  failureMessages: string[]
  fullName: string
  status: 'disabled' | 'failed' | 'passed' | 'pending' | 'skipped' | 'todo'
  title: string
}

export default AssertionResult
