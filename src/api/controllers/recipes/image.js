const { StatusCodes } = require('http-status-codes');
const multer = require('multer');
const Model = require('../../models/recipes');

module.exports = async (req, res) => {
try {
  const { id } = req.params;
  
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
    return res.status(StatusCodes.OK).json(recipe);
  } catch (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
