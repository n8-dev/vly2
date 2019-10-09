import { Form, Input, Icon, Button } from 'antd'
import React from 'react'

let id = 0

export class DynamicFieldSet extends React.Component {
  remove = k => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  };

  add = () => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
  };

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 0 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 }
      }
    }
    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '' : ''}
        required={false}
        key={k}
      >
        <Input placeholder={this.props.inputValue} style={{ width: '94%', marginRight: 8 }} />
        {keys.length > 1 ? (
          <Icon
            className='dynamic-delete-button'
            type='minus-circle-o'
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ))
    return (
      <div>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button className='ant-btn-primary ant-btn-round ant-btn-lg' onClick={this.add} style={{ width: '94%' }}>
            <Icon type='plus' /> {this.props.buttonValue}

          </Button>
        </Form.Item>
      </div>
    )
  }
}
