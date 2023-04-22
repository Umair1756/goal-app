const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc get goal
// @route GET /api/goals
// @accessible Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
// @desc set goal
// @route POST /api/goals
// @accessible Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const goal = await Goal.create({
    title: req.body.title,
  });

  res.status(200).json(goal);
});
// @desc update goal
// @route PUT /api/goals/:id
// @accessible Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
// @desc delete goal
// @route DELETE /api/goals/:id
// @accessible Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await Goal.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
