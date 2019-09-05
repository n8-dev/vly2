const Tag = require('./../tag/tag')

const initializeTags = async (req, res, next) => {
  try {
    const { tags } = req.body
    if (tags) {
    // all tags that don't have an id property need to be created
      const newTags = tags.filter(t => !t._id)
      const existingTags = tags.filter(t => t._id).map(t => t._id) // the pre-existing ids
      const createdTags = []
      for (let i = 0; i < newTags.length; i++) {
        const tag = await Tag.findOne(newTags[i])
        if (!tag) {
          const created = await Tag.create(newTags[i])
          createdTags.push(created._id)
        } else {
          existingTags.push(tag._id)
        }
      }

      // opportunity controller expects an array of tag ids
      req.body.tags = [
        ...createdTags, // the new ids
        ...existingTags // the pre-existing ids
      ]
    }
    next()
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

module.exports = initializeTags
