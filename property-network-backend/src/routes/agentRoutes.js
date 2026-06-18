const express = require('express')
const router = express.Router()
const { getAgentProfile, updateAgentProfile, getAgentReviews, getAgentListings } = require('../controllers/agentController')
const { protect } = require('../middleware/authMiddleware')
const { allowRoles } = require('../middleware/roleMiddleware')

router.use(protect)
router.use(allowRoles('agent'))

router.get('/profile', getAgentProfile)
router.put('/profile', updateAgentProfile)
router.get('/reviews', getAgentReviews)
router.get('/listings', getAgentListings)

module.exports = router
