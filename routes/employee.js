const router = require("express").Router();

const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const config = require("../config");
const jwt = require("jsonwebtoken");

// Create employee
router.post("/", async (req, res, next) => {
  let employee = new Employee();

  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.password = bcrypt.hashSync(req.body.password);
  employee.area = req.body.area;
  employee.phone = req.body.phone;
  employee.image = employee.gravatar();

  try {
    employee = await employee.save();
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "The employee can be not created",
      });
    }
    res.json({
      success: true,
      message: "The employee created successfully",
      employee: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The employee can be not created",
      error: error,
    });
  }
});

// List Employee
router.get("/", async (req, res, next) => {
  const employeeList = await Employee.find().select("-password");

  if (!employeeList) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }
  res.json({
    success: true,
    employees: employeeList,
  });
});

router.get("/:id", async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).select("-password");

  if (!employee) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }
  res.json({
    success: true,
    employee: employee,
  });
});

router.put("/:id", async (req, res, next) => {
  const employeeExits = await Employee.findById(req.params.id);

  if (!employeeExits) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }

  let newPassword = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : employeeExits.password;

  let employee = {
    name: req.body.name,
    email: req.body.email,
    password: newPassword,
    zone: req.body.zone,
    role: req.body.role,
    phone: req.body.phone,
    status: req.body.status,
  };

  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, employee, {
      new: true,
    });
    if (!emp) {
      return res.status(500).json({
        success: false,
        message: "The employee can be not update",
      });
    }
    res.json({
      success: true,
      message: "The employee update successfully",
      employee: emp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The employee can be not Update",
      error: error,
    });
  }
});

router.delete("/:id", (req, res, next) => {
  Employee.findByIdAndRemove(req.params.id)
    .then((employee) => {
      if (employee) {
        return res.status(200).json({
          success: true,
          message: "The Employee is Deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Employee Not found",
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

router.get("/get/count", async (req, res, next) => {
  const employeeCount = await Employee.count({});

  if (!employeeCount) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }
  res.json({
    success: true,
    employeeCount: employeeCount,
  });
});

// Login

router.post("/login", async (req, res, next) => {
  try {
    let employee = await Employee.findOne({ email: req.body.email });
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "Email không hợp lệ",
      });
    }
    if (employee && bcrypt.compareSync(req.body.password, employee.password)) {
      const token = jwt.sign(
        {
          employeeId: employee._id,
        },
        config.SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công!",

        employee: employee.employeeId,
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Sai mật khẩu!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
});

router.get("/get/profile", async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user.employeeId).select(
      "-password"
    );
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "The employee not found",
      });
    }

    res.json({
      success: true,
      employee: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The employee can not be retrieved",
      error: error,
    });
  }
});

module.exports = router;
