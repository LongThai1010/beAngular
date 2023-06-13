const router = require("express").Router();

const Project = require("../models/project");
const config = require("../config");

router.post("/", async (req, res, next) => {
  let project = new Project();

  project.name = req.body.name;
  project.size = req.body.size;
  project.budget = req.body.budget;
  project.expense = req.body.expense;
  project.start = req.body.start;
  project.end = req.body.end;
  project.status = req.body.status;

  try {
    project = await project.save();
    if (!project) {
      return res.status(500).json({
        success: false,
        message: "The project can be not created",
      });
    }
    res.json({
      success: true,
      message: "The project created successfully",
      project: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The project can be not created",
      error: error,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const projectExits = await Project.findById(req.params.id);
  if (!projectExits) {
    return res.status(404).json({
      success: false,
      message: "The project not found",
    });
  }
  let project = {
    name: req.body.name,
    size: req.body.size,
    budget: req.body.budget,
    expense: req.body.expense,
    start: req.body.start,
    end: req.body.end,
    status: req.body.status,
  };

  try {
    project = await Project.findByIdAndUpdate(req.params.id, project, {
      new: true,
    });
    res.json({
      success: true,
      message: "The project updated successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The project can be not updated",
      error: error,
    });
  }
});
router.get("/", async (req, res, next) => {
  const projects = await Project.find();

  if (!projects) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }
  res.json({
    success: true,
    data: projects,
  });
});

router.get("/:id", async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(500).json({
      success: false,
      message: "The project with the given Id was not found",
    });
  }
  res.json({
    success: true,
    data: project,
  });
});

router.delete("/:id", (req, res, next) => {
  Project.findByIdAndRemove(req.params.id)
    .then((project) => {
      if (project) {
        return res.status(200).json({
          success: true,
          message: "The project is Deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "project Not found",
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
