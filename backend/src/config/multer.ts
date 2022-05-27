import multer from "multer";
import path from "path"
import crypto from 'crypto'

const storageType = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) cb(err, "")

                let filekey = `${buf.toString("hex")}-${file.originalname}`

                cb(null, filekey)
            })
        }
    }),
    memory: multer.memoryStorage()
}

const configVideo = {
    storage: storageType.memory,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            "video/mp4",
            "video/mpeg",
            "video/mkv"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
}

const configImage = {
    storage: storageType.memory,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
}

export { configImage, configVideo }