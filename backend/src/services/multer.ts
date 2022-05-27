import { Request, Response } from'express'
import multer from 'multer'
import { configImage, configVideo } from '../config/multer'

export type FileType = {
    buffer: Buffer,
    size: number
}

class MyMulter {
    private _multerImage: multer.Multer = multer(configImage)
    private _multerVideo: multer.Multer = multer(configVideo)

    singleVideo (req: Request, res: Response): Promise<FileType> {
        const upload = this._multerVideo.single("file")

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

    singleImage (req: Request, res: Response): Promise<FileType> {
        const upload = this._multerImage.single("file")

        return new Promise<FileType>((resolve, reject) => {
            upload(req, res, function(err) {
                if(err) return reject(err)
                const file = req.file

                if(file === undefined) return reject("File not found")

                const returnFile: FileType = { buffer: file.buffer, size: file.size }
                resolve(returnFile)
            })
        })
    }
}

export const Multer = new MyMulter()