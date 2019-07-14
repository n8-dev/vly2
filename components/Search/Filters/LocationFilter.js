import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { FilterItem } from '../BigSearch'
import { Popover, Button, Select, Form as AntdForm } from 'antd'

const Option = Select.Option

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`

const Form = styled(AntdForm)`
  > *:last-child {
    margin-right: 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`
class LocationFilter extends Component {
  state = {
    popoverValue: undefined,
    isVisible: false,
    value: undefined
  };

  constructor (props) {
    super(props)
    this.state.value = props.value
    this.state.popoverValue = this.state.value
  }

  handleChange = popoverValue => {
    this.setState({ popoverValue })
  };

  handleVisibleChange = isVisible => {
    this.setState({ isVisible })
  };

  handleCancel = () => {
    this.setState({ popoverValue: this.state.value, isVisible: false })
  };

  handleSubmit = () => {
    const { popoverValue } = this.state

    this.setState(
      {
        isVisible: false,
        value: popoverValue
      },
      () => {
        this.props.onChange(popoverValue)
      }
    )
  };

  renderLabel = () => {
    const { value } = this.state

    if (value) {
      return value
    }

    return (
      <FormattedMessage
        id='search.filter.location.label'
        defaultMessage='Location'
      />
    )
  };

  render () {
    const { isVisible, popoverValue, value } = this.state

    const { options } = this.props

    const content = (
      <Content>
        <Form layout='inline' onSubmit={this.handleSubmit}>
          <Form.Item>
            <Select
              placeholder={
                <FormattedMessage
                  id='search.filter.location.select.placeholder'
                  defaultMessage='Select the most applicable location'
                />
              }
              onChange={this.handleChange}
              value={popoverValue}
              style={{ width: 310, maxWidth: '100%' }}
            >
              {options.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Footer>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item>
              <Button onClick={this.handleCancel}>
                <FormattedMessage
                  id='search.filter.popover.cancel.label'
                  defaultMessage='Cancel'
                />
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={this.handleSubmit} type='primary'>
                <FormattedMessage
                  id='search.filter.popover.submit.label'
                  defaultMessage='Apply filter'
                />
              </Button>
            </Form.Item>
          </Form>
        </Footer>
      </Content>
    )

    return (
      <Popover
        placement='bottomLeft'
        title={
          <FormattedMessage
            id='search.filter.location.popover.title'
            defaultMessage='Find opportunities in ...'
          />
        }
        content={content}
        trigger='click'
        onVisibleChange={this.handleVisibleChange}
        visible={isVisible}
      >
        <FilterItem>
          {value || (
            <FormattedMessage
              id='search.filter.location.label'
              defaultMessage='Location'
            />
          )}
        </FilterItem>
      </Popover>
    )
  }
}

LocationFilter.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string)
}

export default LocationFilter
