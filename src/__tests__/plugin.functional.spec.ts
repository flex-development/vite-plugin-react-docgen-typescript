/**
 * @file Functional Tests - plugin
 * @module vite-plugin-react-docgen-typescript/tests/functional/plugin
 *
 * **Note**: Because snapshot tests will fail without setting `options.handler`,
 * passing snapshot tests are also indicative of `options.handler`.
 */

import ctx from 'fixtures/transform-plugin-context'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { ComponentDoc, PropItem } from 'react-docgen-typescript'
import type Options from '../options'
import testSubject from '../plugin'

describe('functional:plugin', () => {
  const ACT: string = 'transform module'

  /**
   * Returns plugin options suitable for local **and** CI test environments.
   *
   * If file paths are included in snapshots, snapshot tests will **fail** in CI
   * test environments. This is due to differences in file path resolutions.
   *
   * `opts` will be modified to prevent snapshot test failures related to file
   * path resolutions.
   *
   * @param {Options} [opts={}] - Plugin options
   * @return {Options} Plugin options for local and ci test environments
   */
  const options = (opts: Options = {}): Options => ({
    ...opts,
    /**
     * Applies additional processing to `doc`.
     *
     * To prevent snapshot test failures related to file path resolutions, file
     * paths in {@link ComponentDoc} and {@link PropItem} objects will be set to
     * empty strings and the `declarations` field of `PropItem` objects will be
     * set to an empty array.
     *
     * @param {ComponentDoc} doc - Component docgen info
     * @return {ComponentDoc} Augmented component doc
     */
    handler(doc: ComponentDoc): ComponentDoc {
      for (const key of Object.keys(doc.props)) {
        const { parent }: PropItem = doc.props[key]!

        doc.props[key] = Object.assign({}, doc.props[key]!, {
          declarations: [],
          parent: parent ? { ...parent, fileName: '' } : parent
        })
      }

      doc.filePath = ''

      return doc
    },
    /**
     * In CI test environments, sourcemap generation will result in snapshot
     * test failures due to differences in file path resolutions.
     */
    sourcemap: false
  })

  it(`should ${ACT} if id matches include pattern`, async () => {
    // Arrange
    const opts: Options = { include: ['**/**.tsx'] }
    const id: string = path.resolve('__fixtures__/Button.tsx')
    const code: string = await fs.readFile(id, 'utf8')
    const subject = testSubject(options(opts))

    // Act + Expect
    expect(await subject.transform.call(ctx, code, id)).toMatchSnapshot()
  })

  it(`should not ${ACT} if id does not match include pattern`, async () => {
    // Arrange
    const id: string = faker.system.filePath()
    const code: string = faker.datatype.string(faker.datatype.number())
    const subject = testSubject()

    // Act + Expect
    expect(await subject.transform.call(ctx, code, id)).toMatchSnapshot()
  })

  it(`should not ${ACT} if id matches exclude pattern`, async () => {
    // Arrange
    const opts: Options = { exclude: ['**/**.stories.tsx'] }
    const id: string = path.resolve('__fixtures__/Button.stories.tsx')
    const code: string = await fs.readFile(id, 'utf8')
    const subject = testSubject(opts)

    // Act + Expect
    expect(await subject.transform.call(ctx, code, id)).toMatchSnapshot()
  })

  it(`should not ${ACT} if docgen info is missing`, async () => {
    // Arrange
    const id: string = path.resolve('__fixtures__/empty.tsx')
    const code: string = await fs.readFile(id, 'utf8')
    const subject = testSubject()

    // Act + Expect
    expect(await subject.transform.call(ctx, code, id)).toMatchSnapshot()
  })
})
