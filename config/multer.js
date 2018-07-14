var multer = require('multer');

module.exports = {
    fileFilter : function (req, file, cb) {
      if (file.mimetype !== 'image/jpeg'
              && (file.mimetype !== 'image/png')) {
                cb(null, false);
                cb(new Error('Format gambar tidak sesuai'))
      }else{        
           cb(null, true);
      }
    },

    storage : multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.png')
      },
    })
    

  }