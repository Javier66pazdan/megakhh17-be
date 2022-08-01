export const fileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(csv|xlsx|xls)$/)) {
    return cb(new Error('Tylko arkusze stylów są dozwolone (csv | xlsx | xls).'), false);
  }
  cb(null, true);
};
