/* eslint-disable */


import { useState, useEffect ,useRef} from "react";

import { initCanvasWithFile, clearCanvas, initCanvasWithBlob } from './canvasUtils/canvasHandler';


function RemoveBg() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    const file = e.target.files[0]; // Take the first file (can add loop for multi)
// console.log(e.target.files[0].type,allowedTypes.includes(e.target.files[0].type),e.target.files[0])
    if ( !allowedTypes.includes(e.target.files[0].type)) {
      fileInputRef.current.value = '';
      alert("Only PNG, JPG, JPEG, WEBP allowed")

    }

    else {
      document.querySelector("#clearCanvas").style.display = 'block'
      document.querySelector("#removeBg").style.display = 'block'

      setImage(file);
      setResultUrl(null);
      if (file && canvasRef.current) {
        initCanvasWithFile(canvasRef.current, file);
      }
    }
  };

  const handleClear = () => {
    clearCanvas(canvasRef.current);

    fileInputRef.current.value = '';
    document.querySelector("#clearCanvas").style.display = 'none'
    document.querySelector("#removeBg").style.display = 'none'


  };


  const removeBackground = async (event) => {
    setLoading(true)
    document.querySelector("#clearCanvas").disabled = true;
    document.querySelector("#removeBg").style.display = 'none'


    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    var request = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
      },
      body: formData,
    };
    const response = await fetch(`https://server-11ms.onrender.com/remove-bg`, request);

    let res = await response.blob();
    let blobUrl = URL.createObjectURL(res)
    setLoading(false)

    initCanvasWithBlob(blobUrl)
    document.querySelector("#clearCanvas").disabled = false;
  };

  return (
    <div className="row">
      <div className="mx-auto col-10 col-md-8 col-lg-6 my-5">
        <h2>Remove image background</h2>
        <p>Automatically detect and remove the background from images to isolate the main subject. Useful for product photos, profile pictures, and design assets.</p>
        <div class="mb-3 col-lg-8">
          <input class="form-control" id="formFile" type="file" accept="image/png, image/avif, image/jpeg, image/jpg, image/webpg" onChange={handleFileChange} ref={fileInputRef} />
        </div>

        {/* <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}  /> */}
        <br />


        <div style={{ position: "relative", display: "inline-block" }}>
          <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid #ccc' }} id='serverImage' />

          {loading && <>
            <div style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div> </>}

        </div>

        {/* <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid #ccc' }} id='serverImage' /> */}
        <br />
        <div style={{ display: 'flex' }} class="mb-3 col-lg-8 ">
          <button onClick={handleClear} id="clearCanvas" style={{ display: 'none' }} type="button" class="btn btn-primary mx-2">Clear Canvas</button>
          <button onClick={removeBackground} id="removeBg" style={{ display: 'none' }} type="button" class="btn btn-success mx-2">Remove background</button>
        </div>



      </div>
    </div>

  );

}
export default RemoveBg;
/* eslint-disable */
