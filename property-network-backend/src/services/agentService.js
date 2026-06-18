const { Agent, Listing, Review, Buyer } = require('../models')

const getAgentProfile = async (agentId) => {
  const agent = await Agent.findByPk(agentId, {
    attributes: { exclude: ['password'] },
  })
  if (!agent) throw new Error('Agent not found')
  return agent
}

const updateAgentProfile = async (agentId, data) => {
  const agent = await Agent.findByPk(agentId)
  if (!agent) throw new Error('Agent not found')
  
  // Prevent updating sensitive fields here if needed
  delete data.password
  delete data.email
  delete data.agent_id

  await agent.update(data)
  return agent
}

const getAgentReviews = async (agentId) => {
  const reviews = await Review.findAll({
    where: { agent_id: agentId },
    include: [{ model: Buyer, attributes: ['full_name'] }],
    order: [['createdAt', 'DESC']],
  })
  return reviews
}

const getAgentListings = async (agentId) => {
  const listings = await Listing.findAll({
    where: { agent_id: agentId },
    include: [{ model: Agent, attributes: ['full_name', 'agency_name'] }],
  })
  return listings
}

module.exports = {
  getAgentProfile,
  updateAgentProfile,
  getAgentReviews,
  getAgentListings,
}
