import { Button, Divider, Form, Icon, Input, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import RichTextEditor from '../Form/Input/RichTextEditor'
import ImageUpload from '../UploadComponent/ImageUploadComponent'
import { H3Bold, P } from '../VTheme/VTheme'
import TagInput from '../Form/Input/TagInput'
import OrgSelector from '../Org/OrgSelector'
import { DynamicFieldSet } from '../DynamicFieldSet/DynamicFieldSet'

import {
  DescriptionContainer,
  FormGrid,
  InputContainer,
  MediumInputContainer,
  ShortInputContainer,
  TitleContainer
} from '../VTheme/FormStyles'

const { TextArea } = Input

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

const isTest = (process.env.NODE_ENV === 'test')

class ActDetailForm extends Component {
  constructor (props) {
    super(props)
    this.setImgUrl = this.setImgUrl.bind(this)
  }

  componentDidMount () {
    // Call validateFields here to disable the submit button when on a blank form.
    // empty callback supresses a default which prints to the console.
    this.props.form.validateFields(() => { })
  }

  setImgUrl = (value) => {
    this.props.form.setFieldsValue({ imgUrl: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const act = this.props.act
        act.time = values.time
        act.name = values.name
        act.subtitle = values.subtitle
        act.duration = values.duration
        act.resource = values.resource
        act.equipment = values.equipment
        act.description = values.description
        act.offerOrg = values.offerOrg && values.offerOrg.key
        act.imgUrl = values.imgUrl
        act.tags = values.tags
        act.status = e.target.name === 'publish' ? 'active' : 'draft'
        // act.owner = (this.props.act.owner && this.props.op.owner._id) || this.props.me._id
        act.owner = this.props.me._id
        // TODO: [VP-305] should the owner of the activity be preserved or set to the last person who edits it?
        if (!isTest) { window.scrollTo(0, 0) }
        this.props.onSubmit(this.props.act)
      }
    })
  }

  render () {
    // get translated labels
    const actTitle = (
      <span>
        <FormattedMessage
          id='actTitle'
          defaultMessage='Title'
          description='opportunity Title label in ActDetail Form'
        />
        &nbsp;
        <Tooltip title="Choose something interesting like 'we want to build robots' ">
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actSubtitle = (
      <span>
        {' '}
        <FormattedMessage
          id='actSubtitle'
          defaultMessage='Subtitle'
          description='activity Subtitle label in ActDetail Form'
        />{' '}
        <Tooltip title="Choose something interesting like 'we want to build robots' ">
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actCommitment = (
      <span>
        <FormattedMessage
          id='actCommitment'
          defaultMessage='Commitment'
          description='activity Commitment label in ActDetail Form'
        />
        &nbsp;
        <Tooltip title='How much time overall is likely to be required for the activity?'>
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actResource = (
      <span>
        {' '}
        <FormattedMessage
          id='actResource'
          defaultMessage='Resource'
          description='activity resource label in ActDetail Form'
        />
        &nbsp;
        <Tooltip title='Give a long description of what is needed and what people will be doing. You can paste HTML or Markdown here.'>
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actEquipment = (
      <span>
        {' '}
        <FormattedMessage
          id='actEquipment'
          defaultMessage='Equipment'
          description='activity equipment label in ActDetail Form'
        />
        &nbsp;
        <Tooltip title='Make a list of any equipment or materials needed for this activity.'>
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actDescription = (
      <span>
        {' '}
        <FormattedMessage
          id='actDescription'
          defaultMessage='Description'
          description='activity description label in ActDetail Form'
        />
        &nbsp;
        <Tooltip title='Give a long description of what is needed and what people will be doing. You can paste HTML or Markdown here.'>
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actImgUrl = (
      <span>
        <FormattedMessage
          id='actImgUrl'
          defaultMessage='Image Link'
          description='activity Image URL label in ActDetailForm'
        />
        &nbsp;
        <Tooltip title='Choose a picture that illustrates the activity, you can upload a picture or link to something on the Internet, Animated Gifs too.'>
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actOrganisation = (
      <span>
        {' '}
        <FormattedMessage
          id='actOrganisation'
          defaultMessage='Activity Organisation'
          description='label for Organisation offering the activity'
        />
        &nbsp;
        <Tooltip title='Which organisation is this activity for?'>
          <Icon type='question-circle-o' />
        </Tooltip>
      </span>
    )
    const actTags = (
      <FormattedMessage
        id='actTags'
        defaultMessage='Tags'
        description='Descriptions of general areas the activity relates to'
      />
    )
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = this.props.form

    // Only show error after a field is touched.
    const titleError = isFieldTouched('name') && getFieldError('name')
    const orgMembership =
    this.props.me.orgMembership &&
    this.props.me.orgMembership.map(member => member.organisation)
    return (
      <div className='ActDetailForm'>
        <Form hideRequiredMark colon={false}>
          <FormGrid>
            <DescriptionContainer>
              <TitleContainer>
                <H3Bold>
                  <FormattedMessage
                    defaultMessage='Tell everyone about this Activity?'
                    id='actDetailForm.AboutSection.subtitle'
                    description='first section subtitle on actdetailform that asks for title and about details'
                  />
                </H3Bold>
              </TitleContainer>
              <P>
                <FormattedMessage
                  defaultMessage='Attract people to this activity with a snappy name, use the subtitle to layout the basic idea.'
                  id='actDetailForm.AboutSection.instructions'
                  description='first section instructions on actdetailform that asks for title and about details'
                />
              </P>
            </DescriptionContainer>
            <InputContainer>
              <ShortInputContainer>
                <Form.Item
                  label={actTitle}
                  validateStatus={titleError ? 'error' : ''}
                  help={titleError || ''}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Title is required' }]
                  })(<Input placeholder='Title' />)}
                </Form.Item>

                <Form.Item label={actSubtitle}>
                  {getFieldDecorator('subtitle', {
                    rules: []
                  })(
                    <Input placeholder='short summary that appears on the listing.' />
                  )}
                </Form.Item>
              </ShortInputContainer>
              <Form.Item label={actDescription}>
                {getFieldDecorator('description', {
                  rules: []
                })(
                  isTest
                    ? <TextArea rows={20} placeholder='All the details about the activity, you can use HTML or Markdown here' />
                    : <RichTextEditor onChange={this.setAbout} />
                )}
              </Form.Item>
              {orgMembership && (
                <Form.Item label={actOrganisation}>
                  {getFieldDecorator('offerOrg')(
                    <OrgSelector orgs={orgMembership} />
                  )}
                </Form.Item>
              )}
            </InputContainer>
          </FormGrid>

          <Divider />
          <FormGrid>
            <DescriptionContainer>
              <TitleContainer>
                <H3Bold>
                  <FormattedMessage
                    defaultMessage='What topics and learning outcomes does this activity cover?'
                    id='actDetailForm.TagsSection.subtitle'
                    description='Tag section subtitle on actdetailform that asks for topics and outcomes'
                  />
                </H3Bold>
              </TitleContainer>
              <P>
                <FormattedMessage
                  defaultMessage='Make this activity searchable by classifying it with subject, age group, and technology keywords.'
                  id='actDetailForm.TagsSection.instructions'
                  description='Tag section instructions on actdetailform that asks for title and about details'
                />
              </P>
            </DescriptionContainer>
            <InputContainer>
              <Form.Item label={actTags}>
                {getFieldDecorator('tags', {
                  initialValue: [],
                  rules: []
                })(
                  <TagInput
                    existingTags={this.props.existingTags}
                  />
                )}
              </Form.Item>
            </InputContainer>
          </FormGrid>
          <Divider />

          <FormGrid>
            <DescriptionContainer>
              <TitleContainer>
                <H3Bold>
                  <FormattedMessage
                    defaultMessage='What resources are required to run this activity?'
                    id='actDetailForm.ResourceSection.subtitle'
                    description='section subtitle on actdetail form for resources'
                  />
                </H3Bold>

              </TitleContainer>
              <P>
                <FormattedMessage
                  defaultMessage='What is the time commitment?
                    How many people do you need to help?
                    What skills might they require?
                    Do you need a special space or location to work in?
                    Does this activity require special equipment?'
                  id='actDetailForm.ResourceSection.instructions'
                  description='section instructions on actdetail form for resources'
                />
              </P>
            </DescriptionContainer>
            <InputContainer>
              <ShortInputContainer>
                <Form.Item label={actCommitment}>
                  {getFieldDecorator('duration', {
                    rules: [
                      {
                        required: true,
                        message: 'Commitment level is required'
                      }
                    ]
                  })(<Input placeholder='4 hours' required />)}
                </Form.Item>
                <Form.Item label={actResource}>
                  {getFieldDecorator('resource')(<Input placeholder='5 people, classroom, projector' />)}
                </Form.Item>
              </ShortInputContainer>
              <ul>
                <li>TODO: [VP-301] list the number of volunteers required e.g. 1 adult for 5 children, or 20 people</li>
                <li>TODO: [VP-303] list any space requirements for an activity</li>
              </ul>
            </InputContainer>
          </FormGrid>
          <Divider />
          <FormGrid>
            <DescriptionContainer>
              <TitleContainer>
                <H3Bold>
                  <FormattedMessage
                    id='actDetailForm.addEquipment.title'
                    defaultMessage='Do you need any equipment or materials for this opportunity? (Optional)'
                    description='subtitle for add equipment section in act detail form'
                  />
                </H3Bold>
              </TitleContainer>
              <P>
                <FormattedMessage
                  id='actDetailForm.addEquipment.instructions'
                  defaultMessage='Let volunteers and businesses know what you need to make the opportunity happen.'
                  description='instructions to add equipment in act detail form'
                />
              </P>
            </DescriptionContainer>
            <InputContainer>
              <MediumInputContainer>
                <Form.Item label={actEquipment}>
                  <DynamicFieldSet form={this.props.form}
                    inputValue={'Equipment required'}
                    buttonValue='Add item'
                  />
                </Form.Item>
              </MediumInputContainer>
            </InputContainer>
          </FormGrid>
          <Divider />
          <FormGrid>
            <DescriptionContainer>
              <TitleContainer>
                <H3Bold>
                  <FormattedMessage
                    id='actDetailForm.addImageSection.title'
                    defaultMessage='Add an image'
                    description='subtitle for add image section in act detail form'
                  />
                </H3Bold>
              </TitleContainer>
              <P>
                <FormattedMessage
                  id='actDetailForm.addImageSection.instructions'
                  defaultMessage="Activities with illustrations get more responses. If you don't have a photo click suggest and we can provide one based on the tags."
                  description='instructions for add image section in actdetail form'
                />
              </P>
              <img style={{ width: '50%', float: 'right' }} src={this.props.act.imgUrl} alt='' />
            </DescriptionContainer>
            <InputContainer>
              <MediumInputContainer>
                <Form.Item label={actImgUrl}>
                  {getFieldDecorator('imgUrl', {
                    rules: []
                  })(<Input />)}
                  <ImageUpload setImgUrl={this.setImgUrl} />
                </Form.Item>
                // TODO: [VP-304] add suggest photo button to ActDetailForm
              </MediumInputContainer>
            </InputContainer>
          </FormGrid>
          <Divider />

          <FormGrid>
            <DescriptionContainer>
              <TitleContainer>
                <H3Bold>
                  <FormattedMessage
                    id='actDetailForm.SaveActivityButton'
                    defaultMessage='Save Activity'
                    description='Subtitle for save activity section on ActDetailForm'
                  />
                </H3Bold>
              </TitleContainer>
              <P>
                <FormattedMessage
                  id='act.SaveInstructions'
                  defaultMessage='Save as Draft will allow you to preview the activity while Publish will make it available to everyone to view.'
                  description='Instructions for save and publish on activity details form'
                />
              </P>
            </DescriptionContainer>
            <InputContainer>
              <Button
                id='cancelActBtn'
                type='secondary'
                htmlType='button'
                onClick={this.props.onCancel}
              >
                <FormattedMessage
                  id='act.cancel'
                  defaultMessage='Cancel'
                  description='Label for cancel button on activity details form'
                />
              </Button>
              <Button
                id='saveActBtn'
                name='save'
                // htmlType='submit'
                onClick={this.handleSubmit}
                disabled={hasErrors(getFieldsError())}
                style={{ marginLeft: 8 }}
              >
                <FormattedMessage
                  id='act.editSaveDraft'
                  defaultMessage='Save as draft'
                  description='Label for save as draft button on activity details form'
                />
              </Button>
              <Button
                id='publishActBtn'
                name='publish'
                type='primary'
                // htmlType='submit'
                onClick={this.handleSubmit}
                disabled={hasErrors(getFieldsError())}
                style={{ marginLeft: 8 }}
              >
                <FormattedMessage
                  id='act.editPublish'
                  defaultMessage='Publish'
                  description='Label for submit button on activity details form'
                />
              </Button>
            </InputContainer>
          </FormGrid>

        </Form>
      </div>
    )
  }
}

ActDetailForm.propTypes = {
  act: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.string,
    resource: PropTypes.string,
    time: PropTypes.Array,
    duration: PropTypes.string,
    equipment: PropTypes.string,
    status: PropTypes.string,
    owner: PropTypes.string,
    offerOrg: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        _id: PropTypes.string
      })
    ])
  }),
  me: PropTypes.shape({
    _id: PropTypes.string,
    orgMembership: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
      })
    )
  }),
  form: PropTypes.object,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  existingTags: PropTypes.arrayOf(PropTypes.shape({
    tag: PropTypes.string.isRequired,
    _id: PropTypes.string
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
  // dispatch: PropTypes.func.isRequired,
}

export default Form.create({
  name: 'activity_detail_form',
  mapPropsToFields (props) {
    return {
      name: Form.createFormField({ ...props.act.name, value: props.act.name }),
      subtitle: Form.createFormField({ ...props.act.subtitle, value: props.act.subtitle }),
      description: Form.createFormField({ ...props.act.description, value: props.act.description }),
      offerOrg: Form.createFormField({
        ...props.act.offerOrg,
        value: { key: props.act.offerOrg ? props.act.offerOrg._id : '' }
      }),
      duration: Form.createFormField({ ...props.act.duration, value: props.act.duration }),
      equipment: Form.createFormField({ ...props.act.equipment, value: props.act.equipment }),
      location: Form.createFormField({ ...props.act.location, value: props.act.location }),
      imgUrl: Form.createFormField({ ...props.act.imgUrl, value: props.act.imgUrl }),
      time: Form.createFormField({ ...props.act.time, value: props.act.time }),
      resource: Form.createFormField({ ...props.act.resource, value: props.act.resource }),
      status: Form.createFormField({ ...props.act.status, value: props.act.status }),
      tags: Form.createFormField({ ...props.act.tags, value: props.act.tags })
    }
  }

})(ActDetailForm)
