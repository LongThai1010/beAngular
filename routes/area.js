const router = require("express").Router();

const Area = require("../models/area");
const config = require("../config");

router.post("/", async (req, res, next) => {
    try {
        const nameArea = req.body.nameArea;
       
        const area = await Area.findOne({nameArea: nameArea});
        if(area) {
            return res.status(400).json({ message: 'Khu vực đã tồn tại!' })

        } else {
            const addArea = await Area.create({
                nameArea: nameArea
            })

            return res.status(200).json({
                message: "Tạo khu vực thành công",
                area: addArea
            })
        }

    } catch (e) {
        res.status(400).json(e)
    }

});

router.put("/:id", async (req, res, next) => {
    try {
        const areaId = req.params.id;
        const areaOfId = await Area.findOne({_id: areaId});

        const nameArea = req.body.nameArea;
        const area = await Area.findOne({nameArea: nameArea});

        if(!areaId) {
            return res.status(400).json({ message: 'Lỗi tham số' })

        } else if (!areaOfId) {
            return res.status(400).json({ message: 'Không tìm thấy khu vực!' })

        } else if(area) {
            return res.status(400).json({ message: 'Khu vực đã tồn tại!' })
            
        } else {

            await Area.updateOne({_id: areaId}, {
                nameArea: req.body.nameArea
            })
        
            return res.status(200).json({
                message: "Cập nhật khu vực thành công!"
            })
        }

    } catch (e) {
        res.status(500).json(e)
    }

});

router.get("/", async (req, res, next) => {
    try {
        const areas = await Area.find();

        res.status(200).json({
            message: 'Lấy tất cả khu vực thành công',
            areas: areas
        })

    } catch (e) {
        res.status(500).json(e);
    }

});


router.delete("/:id", async (req, res, next) => {
    try {
        const areaId = req.params.id;

        const AreaOfId = await Area.findOne({_id: areaId});

        if(!areaId) {
            return res.status(400).json({ message: 'Lỗi tham số' })

        } else if (!AreaOfId) {
            return res.status(400).json({ message: 'Không tìm thấy khu vực' })

        } else {

            await Area.deleteOne({_id: areaId})
        
            return res.status(200).json({
                message: "Xóa khu vực thành công"
            })
        }

    } catch (e) {
        res.status(500).json(e);
    }
});
module.exports = router;
