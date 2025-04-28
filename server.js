import express from 'express';
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const fn = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, fn);
    }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    const basepath = `${req.protocol}://${req.get('host')}/public/images/`
    res.json(basepath);
});


app.post('/upload',upload.single('image') ,(req, res) => {
    console.log(req.files || req.file);
    res.send('upload')
});


app.listen(3030, () => {
    console.log(`Server is running ${3030}`);
});