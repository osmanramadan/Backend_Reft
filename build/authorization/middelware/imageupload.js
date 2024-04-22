"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importStar(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const pdf_lib_1 = require("pdf-lib");
const fs_1 = __importDefault(require("fs"));
class uploadImageController {
    constructor() {
        this.uploadMultimages = this.uploadMultiImage();
        this.resizeimage = async (req, res, next) => {
            try {
                if (!req.files && !req.file) {
                    res.json({ status: 'upload error' });
                    return;
                }
                const pathimg = path_1.default.resolve(__dirname, `../../uploads/halls`);
                const pathPdf = path_1.default.resolve(__dirname, `../../uploads/pdfs`);
                const pathVideo = path_1.default.resolve(__dirname, `../../uploads/videos`);
                // @ts-ignore
                if (req.files && req.files.video && req.files.video[0]) {
                    req.body.video = ' videoFilename';
                    // @ts-ignore
                    const extVideo = req.files.video[0].mimetype.split('/')[1];
                    const videoFilename = `video-${(0, uuid_1.v4)()}-${Date.now()}.${extVideo}`;
                    console.log(videoFilename);
                    // @ts-ignore
                    await fs_1.default.promises.writeFile(path_1.default.resolve(pathVideo, videoFilename), 
                    // @ts-ignore
                    req.files.video[0].buffer);
                    req.body.video = videoFilename;
                }
                // @ts-ignore
                if (req.files.pdf) {
                    // @ts-ignore
                    const extPdf = req.files.pdf[0].mimetype.split('/')[1];
                    const pdfFilename = `pdf-${(0, uuid_1.v4)()}-${Date.now()}.${extPdf}`;
                    // @ts-ignore
                    const pdfBytes = req.files.pdf[0].buffer;
                    const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
                    const modifiedPdfBytes = await pdfDoc.save();
                    await fs_1.default.promises.writeFile(path_1.default.resolve(pathPdf, pdfFilename), modifiedPdfBytes);
                    req.body.pdf = pdfFilename;
                }
                // @ts-ignore
                if (req.files.imageCover) {
                    // @ts-ignore
                    const ext = req.files.imageCover[0].mimetype.split('/')[1];
                    const imageCoverFilename = `halls-${(0, uuid_1.v4)()}-${Date.now()}-cover.${ext}`;
                    // @ts-ignore
                    await (0, sharp_1.default)(req.files.imageCover[0].buffer).toFile(path_1.default.resolve(pathimg, `${imageCoverFilename}`));
                    req.body.imageCover = imageCoverFilename;
                }
                req.body.images = [];
                // @ts-ignore
                if (req.files.images) {
                    await Promise.all(
                    // @ts-ignore
                    req.files.images.map(async (img, index) => {
                        const ext = img.mimetype.split('/')[1];
                        const filename = `halls-${(0, uuid_1.v4)()}-${Date.now()}-${index + 1}.${ext}`;
                        await (0, sharp_1.default)(img.buffer).toFile(path_1.default.resolve(pathimg, `${filename}`));
                        req.body.images.push(filename);
                    }));
                }
                next();
            }
            catch (err) {
                res.status(400);
                console.log(err);
                res.json({ status: 'fail' });
                return;
            }
        };
    }
    uploadMultiImage() {
        const multerStorage = (0, multer_1.memoryStorage)();
        const multerFilter = (_req, file, cb) => {
            if (file.mimetype.startsWith('image')) {
                cb(null, true);
            }
            else if (file.mimetype.startsWith('application/pdf')) {
                cb(null, true);
            }
            else if (file.mimetype.startsWith('video/mp4')) {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        };
        const upload = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter });
        return upload.fields([
            { name: 'images', maxCount: 3 },
            { name: 'imageCover', maxCount: 1 },
            { name: 'pdf', maxCount: 1 },
            { name: 'video', maxCount: 1 }
        ]);
    }
}
exports.default = uploadImageController;
