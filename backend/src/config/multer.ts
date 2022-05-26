import { Request, Response } from 'express'
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

const config = {
    // dest: path.resolve(__dirname, "..", "..", "tmp"),
    storage: storageType.memory,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
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

export type FileType = {
    buffer: Buffer,
    size: number
}

class MyMulter {
    __multer: multer.Multer = multer(config);

    single(req: Request, res: Response): Promise<FileType> {
        const upload = this.__multer.single("file")

        return new Promise((resolve, reject) => {
            upload(req, res, function(err) {
                if(err) return reject(err);
                const file = req.file

                if(file === undefined) return reject("File not found")

                const returnFile: FileType = { buffer: file.buffer, size: file.size }
                
                resolve(returnFile)
            })
        })
    }
}

export const Multer = new MyMulter()
