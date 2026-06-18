const agentService = require('../services/agentService')

const getAgentProfile = async (req, res, next) => {
  try {
    const agent = await agentService.getAgentProfile(req.user.id)
    res.json({ success: true, data: agent })
  } catch (err) {
    next(err)
  }
}

const updateAgentProfile = async (req, res, next) => {
  try {
    const agent = await agentService.updateAgentProfile(req.user.id, req.body)
    res.json({ success: true, message: 'Profile updated', data: agent })
  } catch (err) {
    next(err)
  }
}

const getAgentReviews = async (req, res, next) => {
  try {
    const reviews = await agentService.getAgentReviews(req.user.id)
    res.json({ success: true, data: reviews })
  } catch (err) {
    next(err)
  }
}

const getAgentListings = async (req, res, next) => {
  try {
    const listings = await agentService.getAgentListings(req.user.id)
    res.json({ success: true, data: listings })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAgentProfile,
  updateAgentProfile,
  getAgentReviews,
  getAgentListings,
}
