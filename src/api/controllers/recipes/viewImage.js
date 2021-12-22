const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    // return res.status(StatusCodes.OK).attachment('../../../uploads/ratinho.jpeg');
    return res.status(StatusCodes.OK).attachment(`../../../uploads/${id}.jpeg`);
  } catch (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};

// const fs = require('fs');
// const axios = require('axios');
// const FormData = require('form-data');

// const URL = 'http://localhost:3000/files/upload';

// async function main() {
//   const readStream = fs.createReadStream('./files/projetos2.jpeg');
  
//   const form = new FormData();
//   form.append('file', readStream);
  
//   await axios.post(URL, form, { headers: { ...form.getHeaders() } });

//   readStream.close();
// }

// main();