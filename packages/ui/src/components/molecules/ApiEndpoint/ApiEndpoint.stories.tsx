import { Meta, Story } from '@storybook/react'
import React from 'react'
import { ApiEndpoint, ApiEndpointProps } from './ApiEndpoint'

const meta: Meta = {
  title: 'Molecules/ApiEndpoint',
  component: ApiEndpoint,
  argTypes: {
    url: {
      defaultValue:
        'https://content.kiqr.cloud/v1/collections/pages/front-page',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<ApiEndpointProps> = (args) => <ApiEndpoint {...args} />

export const Default = Template.bind({})
Default.args = {}
