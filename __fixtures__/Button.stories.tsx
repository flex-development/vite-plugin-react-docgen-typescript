/**
 * @file Fixtures - Button Stories
 * @module fixtures/Button.stories
 */

import type { Meta, Story } from '@storybook/react'
import Button, { CounterButton, type CounterButtonProps } from './Button'

export default {
  args: Button.defaultProps,
  component: Button,
  parameters: {},
  title: 'Button'
} as Meta<CounterButtonProps>

export const Counter: Story<CounterButtonProps> = (
  args: CounterButtonProps
) => {
  return <CounterButton {...args} />
}
