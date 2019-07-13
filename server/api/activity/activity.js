const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActivitySchema = new Schema({
  title: String, // "Growing in the garden",
  subtitle: String, // "Growing digitally in the garden",
  imgUrl: { type: 'String', required: true, default: '../../../static/img/activity/activity.png' },
  description: String, // "Project to grow something in the garden",
  duration: String, // "15 Minutes",
  org: { type: Schema.Types.ObjectId, ref: 'Organisation' },
  owner: { type: Schema.Types.ObjectId, ref: 'Person' },
  resource: {
    type: String,
    default: ''
  },
  time: {
    type: [Date]
  },
  tags: [
    {
      type: Schema.Types.ObjectId, ref: 'Tag'
    }
  ],
  status: {
    type: 'String',
    required: true,
    default: 'draft',
    enum: ['draft', 'active', 'retired']
  },
  dateAdded: { type: 'Date', default: Date.now, required: true }
})

module.exports = mongoose.model('Activity', ActivitySchema)
