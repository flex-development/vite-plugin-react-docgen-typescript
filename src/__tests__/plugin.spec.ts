/**
 * @file Unit Tests - plugin
 * @module vite-plugin-react-docgen-typescript/tests/unit/plugin
 */

import ctx from 'fixtures/transform-plugin-context'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { Testcase } from 'tests/interfaces'
import { PLUGIN_NAME } from '../constants'
import type Options from '../options'
import testSubject from '../plugin'

describe('unit:plugin', () => {
  describe('@returns', () => {
    it('should return PluginReactDocgenTypeScript', () => {
      // Act
      const subject = testSubject()

      // Expect
      expect(subject.enforce).to.be.a('string').that.equals('pre')
      expect(subject.name).to.be.a('string').that.equals(PLUGIN_NAME)
      expect(subject.transform).to.be.a('function')
    })
  })

  describe('options', () => {
    describe('options?.apply', () => {
      type Case = Options['apply']

      enum Apply {
        BUILD = 'build',
        SERVE = 'serve'
      }

      const cases: Case[] = [undefined, Apply.BUILD, Apply.SERVE, vi.fn()]

      cases.forEach(apply => {
        const option = 'PluginReactDocgenTypeScript.apply'
        const args = pf([{ apply }])

        it(`should set ${option} to ${pf(apply)} given ${args}`, () => {
          expect(testSubject({ apply }).apply).to.equal(apply)
        })
      })
    })

    describe('options?.enforce', () => {
      interface Case extends Testcase<NonNullable<Options['enforce']>> {
        enforce?: Options['enforce']
      }

      enum Enforce {
        POST = 'post',
        PRE = 'pre'
      }

      const cases: Case[] = [
        { enforce: undefined, expected: Enforce.PRE },
        { enforce: Enforce.PRE, expected: Enforce.PRE },
        { enforce: Enforce.POST, expected: Enforce.POST }
      ]

      cases.forEach(({ enforce, expected }) => {
        const option = 'PluginReactDocgenTypeScript.enforce'
        const args = pf([{ enforce }])

        it(`should set ${option} to ${pf(expected)} given ${args}`, () => {
          expect(testSubject({ enforce }).enforce).to.equal(expected)
        })
      })
    })

    describe('options?.shouldIncludeExpression', () => {
      it('should not throw if ComponentDoc.expression is defined', async () => {
        // Arrange
        const options: Options = { shouldIncludeExpression: true }
        const id: string = path.resolve('__fixtures__/List.tsx')
        const subject = testSubject(options)

        // Act + Expect
        expect(await subject.transform.call(ctx, '', id)).to.not.throw
      })
    })

    describe('options?.sourcemap', () => {
      const id: string = path.resolve('__fixtures__/Counter.tsx')
      const opts: Options = { sourcemap: undefined }
      const opts_c: Options = { sourcemap: { includeContent: true } }
      const opts_n: Options = { sourcemap: false }
      const sd: string = 'Partial<SourceDescription>'

      let code: string

      beforeEach(async () => {
        code = await fs.readFile(id, 'utf8')
      })

      it(`should return ${sd} given ${pf([opts])}`, async () => {
        // Arrange
        const subject = testSubject(opts)

        // Act
        const result = await subject.transform.call(ctx, code, id)

        // Expect
        expect(result).to.have.property('code')
        expect(result).to.have.property('map')
      })

      it(`should return ${sd} given ${pf([opts_c])}`, async () => {
        // Arrange
        const subject = testSubject(opts_c)

        // Act
        const result = await subject.transform.call(ctx, code, id)

        // Expect
        expect(result).to.have.property('code')
        expect(result)
          .to.have.property('map')
          .to.have.property('sourcesContent')
          .that.deep.equals([code])
      })

      it(`should return string given ${pf([opts_n])}`, async () => {
        // Arrange
        const subject = testSubject(opts_n)

        // Act
        const result = await subject.transform.call(ctx, code, id)

        // Expect
        expect(result).to.be.a('string')
        expect(result).to.not.have.property('code')
        expect(result).to.not.have.property('map')
      })
    })
  })
})
