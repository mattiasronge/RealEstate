const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');

// Filtrerar filen, godkända format: jpg eller png
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error('Incorrect file');
        error.code = "INCORRECT_FILETYPE";
        cb(error, false);
    }
    else cb(null, true);
}
// sparar filen genom multer package
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/images');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + file.originalname);
        cb(null, Date.now() + uuidv4() + path.extname(file.originalname));
    }
});

const uploader = multer({
    fileFilter,
    limits: {
        fileSize: 5000000
    },
    storage: storage
});

/**
 * laddar upp filen genom multer
 */
const FileUploadService = {

	//Lägger till filen
    addRouter(app, path){
        app.post(path, uploader.single('file'), (req, res) => {
            res.json({ file : req.file });
        });
        app.use((err, req, res, next) => {
            if(err.code === 'INCORRECT_FILETYPE'){
                res.status(422).json({ error : 'Only images are allowed.' });
                return;
            }
            if(err.code === 'LIMIT_FILE_SIZE'){
                res.status(422).json({ error : 'Allow file size is 500KB.' });
                return;
            }
        });
    },
	//Tar bort filen
    deleteRouter(app, path){
        app.delete(path, (req, res) => {
            const filepath = process.env.DIST_PATH +'/images/' + req.params.img;
            fs.unlink(filepath, (err) => {
                if (err) res.status(200).json(err);
                else res.status(200).json({ status : 'success', filename : req.params.img });
            });
        });
    }
};

module.exports = FileUploadService;