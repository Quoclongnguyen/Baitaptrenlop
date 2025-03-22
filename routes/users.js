// user.js
var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler');

// GET all users (chỉ cho phép mod trở lên)
router.get('/', async function (req, res, next) {
    try {
        let userRole = req.userRole; // Đảm bảo xác thực role từ JWT hoặc middleware
        if (userRole !== 'mod' && userRole !== 'admin') {
            throw new Error("Bạn không có quyền truy cập");
        }
        let users = await userController.GetAllUser();
        CreateSuccessRes(res, 200, users);
    } catch (error) {
        next(error);
    }
});

// GET user by ID (trừ ID của chính user)
router.get('/:id', async function (req, res, next) {
    try {
        if (req.params.id === req.userId) {
            throw new Error("Không thể xem thông tin của chính bạn.");
        }
        let user = await userController.GetUserById(req.params.id);
        CreateSuccessRes(res, 200, user);
    } catch (error) {
        CreateErrorRes(res, 404, error);
    }
});

// Tạo user mới (admin)
router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let newUser = await userController.CreateAnUser(body.username, body.password, body.email, body.role);
        CreateSuccessRes(res, 200, newUser);
    } catch (error) {
        next(error);
    }
});

// Cập nhật user (admin)
router.put('/:id', async function (req, res, next) {
    try {
        let updateUser = await userController.UpdateUser(req.params.id, req.body);
        CreateSuccessRes(res, 200, updateUser);
    } catch (error) {
        next(error);
    }
});

// Xóa user (admin)
router.delete('/:id', async function (req, res, next) {
    try {
        await userController.DeleteUser(req.params.id);
        CreateSuccessRes(res, 200, { message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
