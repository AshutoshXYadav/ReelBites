const ImageKit = require("imagekit");
require('dotenv').config();

const imagekit = new ImageKit({
    publicKey: process.env.Imagekit_Public_Key,
    privateKey: process.env.Imagekit_Private_Key,
    urlEndpoint: process.env.Imagekit_URL
});

async function uploadFile({ file, fileName }) {
    const result = await imagekit.upload(
        {
            file: file,
            fileName: fileName,
        }
    )
    return result;
}
module.exports = { uploadFile };