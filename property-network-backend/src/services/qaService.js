const { QaQuestion, QaAnswer, Buyer, Agent } = require('../models')

const createQuestion = async (buyerId, data) => {
  const question = await QaQuestion.create({
    ...data,
    buyer_id: buyerId,
  })
  return question
}

const getQuestionsByListing = async (listingId) => {
  const questions = await QaQuestion.findAll({
    where: { listing_id: listingId },
    include: [
      {
        model: Buyer,
        attributes: ['full_name'],
      },
      {
        model: QaAnswer,
        include: [
          { model: Agent, attributes: ['full_name', 'agency_name'] }
        ],
      },
    ],
  })
  return questions
}

const createAnswer = async (agentId, questionId, data) => {
  const answer = await QaAnswer.create({
    ...data,
    agent_id: agentId,
    question_id: questionId,
  })
  return answer
}

const markHelpful = async (answerId) => {
  const answer = await QaAnswer.findByPk(answerId)
  if (!answer) throw new Error('Answer not found')
  await answer.update({ is_helpful: true })
}

module.exports = { createQuestion, getQuestionsByListing, createAnswer, markHelpful }