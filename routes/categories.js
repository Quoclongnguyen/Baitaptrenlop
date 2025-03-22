// category.js
var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');

// GET tất cả danh mục
router.get('/', async function (req, res, next) {
    try {
        let categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});

// GET danh mục theo ID
router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let category = await categoryModel.findById(id);
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: "Không có id phù hợp"
        });
    }
});

// POST tạo mới danh mục
router.post('/', async function (req, res, next) {
    try {
        let newCategory = new categoryModel({
            name: req.body.name,
        });
        await newCategory.save();
        res.status(200).send({
            success: true,
            data: newCategory
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
