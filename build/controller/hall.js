"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const hall_1 = require("../model/hall");
const user_1 = __importDefault(require("./user"));
const fs_1 = __importDefault(require("fs"));
const hallobject = new hall_1.Hall();
const userobject = new user_1.default();
class HallController {
    constructor() {
        this.index = async (_req, res) => {
            try {
                const halls = await hallobject.index();
                const data = [];
                if (halls) {
                    for (const value of halls) {
                        const imagePath = path_1.default.join(__dirname, '../uploads/halls', 
                        // @ts-ignore
                        value.cover_image);
                        try {
                            const imageData = await fs_1.default.promises.readFile(imagePath);
                            const imgCover = { imageCoverData: imageData.toString('base64') };
                            const imagesData = [];
                            let rate = [];
                            // @ts-ignore
                            for (const img of value.images) {
                                const imagePath = path_1.default.join(__dirname, '../uploads/halls', img);
                                const imageData = await fs_1.default.promises.readFile(imagePath);
                                imagesData.push(imageData.toString('base64'));
                            }
                            const imgsData = { imagesData: imagesData };
                            const user = await userobject.show(value.user_id);
                            let userData;
                            if (user) {
                                userData = {
                                    userData: {
                                        id: user.id,
                                        name: user.name,
                                        phone: user.phone,
                                        email: user.email,
                                        city: user.city
                                    }
                                };
                            }
                            const stars = await hallobject.getHallRate(value.id);
                            const array_rate = { rate: stars };
                            data.push(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, value), imgsData), imgCover), userData), array_rate));
                        }
                        catch (err) {
                            res.json({ status: 'fail' });
                            return;
                        }
                    }
                    // res.redirect('/success')
                    res.json({ status: 'success', data: data });
                    return;
                }
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.adminindex = async (_req, res) => {
            try {
                const halls = await hallobject.adminindex();
                const data = [];
                if (halls) {
                    for (const value of halls) {
                        const imagePath = path_1.default.join(__dirname, '../uploads/halls', 
                        // @ts-ignore
                        value.cover_image);
                        try {
                            const imageData = await fs_1.default.promises.readFile(imagePath);
                            const imgCover = { imageCoverData: imageData.toString('base64') };
                            const imagesData = [];
                            // @ts-ignore
                            for (const img of value.images) {
                                const imagePath = path_1.default.join(__dirname, '../uploads/halls', img);
                                const imageData = await fs_1.default.promises.readFile(imagePath);
                                imagesData.push(imageData.toString('base64'));
                            }
                            const imgsData = { imagesData: imagesData };
                            const user = await userobject.show(value.user_id);
                            let userData;
                            if (user) {
                                userData = {
                                    userData: {
                                        name: user.name,
                                        phone: user.phone,
                                        email: user.email,
                                        city: user.city
                                    }
                                };
                            }
                            const stars = await hallobject.getHallRate(value.id);
                            const array_rate = { rate: stars };
                            data.push(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, value), imgsData), imgCover), userData), array_rate));
                        }
                        catch (err) {
                            res.json({ status: 'fail' });
                            return;
                        }
                    }
                    res.json({ status: 'success', data: data });
                    return;
                }
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.userindex = async (req, res) => {
            try {
                const halls = await hallobject.userindex(req.params.id);
                const data = [];
                if (halls) {
                    for (const value of halls) {
                        const imagePath = path_1.default.join(__dirname, '../uploads/halls', 
                        // @ts-ignore
                        value.cover_image);
                        try {
                            const imageData = await fs_1.default.promises.readFile(imagePath);
                            const imgCover = { imageCoverData: imageData.toString('base64') };
                            const imagesData = [];
                            // @ts-ignore
                            for (const img of value.images) {
                                const imagePath = path_1.default.join(__dirname, '../uploads/halls', img);
                                const imageData = await fs_1.default.promises.readFile(imagePath);
                                imagesData.push(imageData.toString('base64'));
                            }
                            const imgsData = { imagesData: imagesData };
                            const user = await userobject.show(value.user_id);
                            let userData;
                            if (user) {
                                userData = {
                                    userData: {
                                        name: user.name,
                                        phone: user.phone,
                                        email: user.email,
                                        city: user.city
                                    }
                                };
                            }
                            const stars = await hallobject.getHallRate(value.id);
                            const array_rate = { rate: stars };
                            data.push(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, value), imgsData), imgCover), userData), array_rate));
                        }
                        catch (err) {
                            res.json({ status: 'fail' });
                            return;
                        }
                    }
                    res.json({ status: 'success', data: data });
                    return;
                }
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.getvideo = async (req, res) => {
            const { filename } = req.params;
            const videoPath = path_1.default.join(__dirname, '../uploads/videos', filename);
            if (fs_1.default.existsSync(videoPath)) {
                const stat = fs_1.default.statSync(videoPath);
                const fileSize = stat.size;
                const range = req.headers.range;
                if (range) {
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunksize = end - start + 1;
                    const file = fs_1.default.createReadStream(videoPath, { start, end });
                    const head = {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4' // Adjust content type based on your video format
                    };
                    res.writeHead(206, head);
                    file.pipe(res);
                }
                else {
                    const head = {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4' // Adjust content type based on your video format
                    };
                    res.writeHead(200, head);
                    fs_1.default.createReadStream(videoPath).pipe(res);
                }
            }
            else {
                res.status(404).json({ error: 'Video not found' });
            }
        };
        this.getpdf = (req, res) => {
            const { filename } = req.params;
            const pdfPath = path_1.default.join(__dirname, '../uploads/pdfs', filename);
            if (fs_1.default.existsSync(pdfPath)) {
                console.log('PDF File Exists');
                const stat = fs_1.default.statSync(pdfPath);
                const fileSize = stat.size;
                const range = req.headers.range;
                if (range) {
                    console.log('Range Request:', range);
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunksize = end - start + 1;
                    const file = fs_1.default.createReadStream(pdfPath, { start, end });
                    const head = {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Content-Length': chunksize,
                        'Content-Type': 'application/pdf'
                    };
                    console.log(`Serving Range: ${start}-${end}/${fileSize}`);
                    res.writeHead(206, head);
                    file.pipe(res);
                }
                else {
                    const head = {
                        'Content-Length': fileSize,
                        'Content-Type': 'application/pdf'
                    };
                    res.writeHead(200, head);
                    fs_1.default.createReadStream(pdfPath).pipe(res);
                }
            }
            else {
                console.log('PDF Not Found');
                res.status(404).json({ error: 'PDF not found' });
            }
        };
        this.create = async (req, res) => {
            try {
                const hall = {
                    name: req.body.name,
                    capacity: req.body.capacity,
                    city: req.body.city,
                    price_hour: req.body.price,
                    location: req.body.location,
                    details: req.body.details,
                    images: req.body.images,
                    cover_image: req.body.imageCover,
                    pdf: req.body.pdf,
                    video: req.body.video,
                    user_id: req.body.user_id
                };
                const newhall = await hallobject.create(hall);
                if (newhall) {
                    res.json({ status: 'success', data: newhall });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(403);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.checkHallShowRate = async (req, res) => {
            try {
                const check = await hallobject.CheckForShowRate({ hallid: req.body.hallid ? req.body.hallid : 0, userid: req.body.userid });
                // @ts-ignore
                if (!check) {
                    res.json({ status: 'success' });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(403);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.addHallRate = async (req, res) => {
            try {
                console.log(req);
                const check = await hallobject.CheckForUserExistRate({ hallid: req.body.hallid, userid: req.body.userid });
                // @ts-ignore
                if (!check) {
                    const newrate = await hallobject.addRate({ hallid: req.body.hallid, userid: req.body.userid, rate: req.body.rate });
                    if (newrate) {
                        res.json({ status: 'success', data: newrate });
                        return;
                    }
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(403);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.update = async (req, res) => {
            try {
                // const hall: hall = {
                //   id: req.body.id,
                //   checked: req.body.checked,
                //  };
                // const hall: hall = {
                //   name: req.body.name,
                //   capacity: req.body.capacity,
                //   city: req.body.city,
                //   price_hour: req.body.price,
                //   location: req.body.location,
                //   details: req.body.details,
                //   images: req.body.images,
                //   cover_image: req.body.imageCover,
                //   pdf: req.body.pdf,
                //   video: req.body.video,
                //   user_id: req.body.user_id
                // };
                const updated = await hallobject.update(req.body.checked, req.body.id);
                if (updated) {
                    res.json({ status: 'success' });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.hallcities = async (req, res) => {
            try {
                const cities = await hallobject.hallcities();
                if (cities) {
                    res.json({ status: 'success', cities: cities });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.delete = async (req, res) => {
            try {
                const deleted = await hallobject.delete(req.params.id);
                if (deleted) {
                    res.json({ status: 'success' });
                    return;
                }
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.hallbyid = async (req, res) => {
            try {
                const deleted = await hallobject;
                if (deleted) {
                    res.json({ status: 'success' });
                    return;
                }
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
    }
}
exports.default = HallController;
