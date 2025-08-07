var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const os = require('os');
const fs = require('fs');
const { removeBackground } = require('@imgly/background-removal-node');
//let {imglyRemoveBackground} = require("@imgly/background-removal")
dotenv.config();
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const tinify = require("tinify");
tinify.key = process.env.TINIFY_KEY;

const downloaded = path.join(os.homedir(), 'Downloads');
const upload = multer({ dest: "uploads/" });

app.post(
  "/profile",
  upload.fields([{ name: "file", maxCount: 1 }]),
  async function (req, res, next) {
    try {
      const file = req.files.file?.[0];
      if (!file) return res.status(400).send("No file uploaded.");

      const originalname = file.originalname;
      const inputPath = file.path;
      const outputPath = path.join(__dirname, "compressed", originalname);

      // Make sure "compressed" folder exists
      fs.mkdirSync(path.join(__dirname, "compressed"), { recursive: true });

      // ✅ Compress image
      await tinify.fromFile(inputPath).toFile(outputPath);

      // Delete original upload
      fs.unlinkSync(inputPath);

      // ✅ Send compressed image to user's browser
      res.download(outputPath, originalname, (err) => {
        if (err) {
          console.error("Download error:", err);
          return res.status(500).send("Download failed.");
        }

        // Optional: Clean up after download
        fs.unlink(outputPath, () => {});
      });

    } catch (e) {
      console.error("Compression error:", e);
      res.status(500).send("Server error.");
    }
  }
);


app.post('/remove-bg', upload.single('image'), async (req, res) => {
  console.log("image", req.file)
  try {
    const inputBuffer = fs.readFileSync(req.file.path);
    console.log("inputBuffer", inputBuffer)
    // const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    // const file = req.files.image?.[0]; // Take the first file (can add loop for multi)
    // console.log("file",file)
    // if (!file || !allowedTypes.includes(file.mimetype)) {
    //   return res.status(400).send({ response: "Only PNG, JPG, JPEG, WEBP allowed" });
    // }
    // const originalname = file.originalname;
    //       const inputPath = file.path;
    //       const outputPath = path.join(downloaded, originalname);
    //   //console.log("GDFsdfsdffs",originalname,inputPath,outputPath,downloaded)

    const blobs = new Blob([new Uint8Array(inputBuffer)], { type: 'image/png' });

 //   const blobs = new Blob([new Uint8Array(inputBuffer)], { type: 'image/jpeg' });
     console.log('Blob', blobs)

    // const resultBlob = await  removeBackground(inputBuffer).then((blob) => {
    //   // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
    //   const url = URL.createObjectURL(blob);
    //   console.log("URL",url)
    // })

   const resultBlob = await removeBackground(blobs);
   console.log("resultBlob", resultBlob.type)
 const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
  console.log("resultBuffer", resultBuffer)

     fs.unlinkSync(req.file.path); // cleanup

    res.setHeader('Content-Type',  resultBlob.type);
    res.status(200).send(resultBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to process image');
  }
});



app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
