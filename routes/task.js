const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Task = require("../models/task");
const config = require("../config");

router.post("/", async (req, res, next) => {
  let task = new Task();

  task.nameTask = req.body.nameTask;
  task.description = req.body.description;
  task.priority = req.body.priority;
  task.status = req.body.status;
  task.dateStart = req.body.dateStart;
  task.project = req.body.project;
  task.assignedTo = req.body.assignedTo;
  // task.userCreateTask = userId;

  try {
    task = await task.save();
    if (!task) {
      return res.status(500).json({
        success: false,
        message: "The task can be not created",
      });
    }
    res.json({
      success: true,
      message: "The task created successfully",
      task: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The task can be not created",
      error: error,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const taskExits = await Task.findById(req.params.id);
  if (!taskExits) {
    return res.status(404).json({
      success: false,
      message: "The task not found",
    });
  }
  let task = {
    nameTask: req.body.nameTask,
    dateStart: req.body.dateStart,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    project: req.body.project,
    // userCreateTask: userId,
    assignedTo: req.body.assignedTo,
  };

  try {
    task = await Task.findByIdAndUpdate(req.params.id, task, {
      new: true,
    });
    res.json({
      success: true,
      message: "The task updated successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The task can be not updated",
      error: error,
    });
  }
});
router.get("/", async (req, res, next) => {
  const tasks = await Task.find();

  if (!tasks) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }
  res.json({
    success: true,
    data: tasks,
  });
});

router.get("/:id", async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(500).json({
      success: false,
      message: "The task with the given Id was not found",
    });
  }
  res.json({
    success: true,
    data: task,
  });
});

router.delete("/:id", (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
    .then((task) => {
      if (task) {
        return res.status(200).json({
          success: true,
          message: "The task is Deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "task Not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        error: error,
      });
    });
});

module.exports = router;
