// role.js
var express = require('express');
var router = express.Router();
let roleController = require('../controllers/roles');
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler');

// GET tất cả quyền
router.get('/', async function (req, res, next) {
    try {
        let roles = await roleController.GetAllRole();
        CreateSuccessRes(res, 200, roles);
    } catch (error) {
        next(error);
    }
});

// GET quyền theo ID
router.get('/:id', async function (req, res, next) {
    try {
        let role = await roleController.GetRoleById(req.params.id);
        CreateSuccessRes(res, 200, role);
    } catch (error) {
        next(error);
    }
});

// POST tạo quyền mới
router.post('/', async function (req, res, next) {
    try {
        let newRole = await roleController.CreateRole(req.body.name);
        CreateSuccessRes(res, 200, newRole);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
