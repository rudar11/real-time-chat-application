const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGE_PRIVATE_KEY,
});



async function uploadfile(buffer) {
    const response = await client.files.upload({
        file: buffer.toString("base64"),
        fileName: 'image.jpg',
    });
    return response;
}



module.exports = uploadfile





// const ImageKit = require('imagekit'); // Sahi package name

// // Teeno keys deni zaroori hain (Apni .env file mein ye teeno daal lena)
// const client = new ImageKit({
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
// });

// async function uploadfile(buffer) {
//     try {
//         const response = await client.upload({
//             file: buffer.toString("base64"), // Buffer ko base64 mein convert kiya
//             fileName: `chat_image_${Date.now()}.jpg`, // Unique file name
//             folder: "/chat_images" // Folder ka naam
//         });
//         return response;
//     } catch (error) {
//         console.error("ImageKit Upload Error:", error);
//         throw error;
//     }
// }

// module.exports = uploadfile;