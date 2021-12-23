const multer = require('multer');
const Model = require('../../models/recipes');

module.exports = async (id) => {
  try {
    const storage = multer.diskStorage({
      destination: (callback) => {
      callback(null, 'uploads');
    },
    filename: (callback) => {
      callback(null, `${id}.jpeg`);
    } });
    
    const upload = multer({ storage });
    
    upload.single('file');
    const newRecipe = { image: `localhost:3000/src/uploads/${id}.jpeg` };
    const recipe = await Model.update(id, newRecipe);
    return recipe;
  } catch (error) {
    return error;
  }
};
