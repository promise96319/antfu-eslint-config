import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { join, resolve } from 'node:path'
import { afterAll, beforeAll, it } from 'vitest'
import type { FlatESLintConfigItem, OptionsConfig } from '../src/types'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('js', {
  typescript: false,
  vue: false,
  react: false
})
runWithConfig('all', {
  typescript: true,
  vue: true,
  react: true,
})
runWithConfig('no-style', {
  typescript: true,
  vue: true,
  stylistic: false,
})
runWithConfig('tab-double-quotes', {
  typescript: true,
  vue: true,
  react: true,
  stylistic: {
    indent: 'tab',
    quotes: 'double',
  },
})

// https://github.com/antfu/eslint-config/issues/255
runWithConfig(
  'ts-override',
  {
    typescript: true,
  },
  {
    rules: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
)

function runWithConfig(name: string, configs: OptionsConfig, ...items: FlatESLintConfigItem[]) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

    await fs.copy(from, target, {
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })
    await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
import antfu from '@antfu/eslint-config'

export default antfu(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items) ?? []},
)
  `)

    await execa('npx', ['eslint', '.', '--fix'], {
      cwd: target,
      stdio: 'inherit',
    })

    const files = await fg('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      let content = await fs.readFile(join(target, file), 'utf-8')
      const source = await fs.readFile(join(from, file), 'utf-8')
      if (content === source)
        content = '// unchanged\n'
      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  }, 30_000)
}
