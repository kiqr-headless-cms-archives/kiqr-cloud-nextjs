import { Meta, Story } from '@storybook/react'
import React from 'react'
import { HtmlEditor, HtmlEditorProps } from './HtmlEditor'

const meta: Meta = {
  title: 'Organisms/HtmlEditor',
  component: HtmlEditor,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<HtmlEditorProps> = (args) => <HtmlEditor {...args} />

export const Default = Template.bind({})
Default.args = {
  initialValue: '<h1>Title</h1>',
}
