/* eslint-disable */


import { useState, useEffect, useRef } from "react";
import { initCanvasWithFile, clearCanvas, initCanvasWithBlob } from './canvasUtils/canvasHandler';


function RemoveBg() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [blobsUrl, setBlobsUrl] = useState(null);

  const handleFileChange = (e) => {
    document.querySelector("#download").style.display = 'none'
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    const file = e.target.files[0]; // Take the first file (can add loop for multi)
    // console.log(e.target.files[0].type,allowedTypes.includes(e.target.files[0].type),e.target.files[0])
    if (!allowedTypes.includes(e.target.files[0].type)) {
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
    document.querySelector("#download").style.display = 'none'

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
    const response = await fetch(
      `https://server-11ms.onrender.com/remove-bg`, request)


    if (!response.ok) { alert("'Network response was not ok.'") }
    else {
      let res = await response.blob();
      let blobUrl = URL.createObjectURL(res)
      setLoading(false)

      initCanvasWithBlob(blobUrl)
      setBlobsUrl(blobUrl)
      document.querySelector("#clearCanvas").disabled = false;
      document.querySelector("#download").disabled = false;
      document.querySelector("#download").style.display = 'block'
    }
  };

  const Download = () => {

    const a = document.createElement('a');
    a.href = blobsUrl;

    a.download = image?.name ?? 'compressed-image.jpg'; // Or original file name if you have it
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(blobsUrl);

  }
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 text-center">

          <h2 className="mb-3 fw-bold">Remove Image Background</h2>
          <p className="text-muted mb-4">
            Automatically detect and remove the background from images to isolate the main subject.
            Useful for product photos, profile pictures, and design assets.
          </p>

          <div className="mb-4">
            <input
              className="form-control"
              id="formFile"
              type="file"
              accept="image/png, image/avif, image/jpeg, image/jpg, image/webp"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <div className="position-relative d-inline-block mx-auto shadow rounded overflow-hidden" style={{ maxWidth: '100%' }}>
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className="img-fluid border rounded"
              id="serverImage"
              style={{ maxWidth: '100%', height: 'auto' }}
            />

            {loading && (
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap justify-content-center align-items-center bg-white bg-opacity-75">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'primary', 'dark'].map((color, i) => (
                  <div key={i} className={`spinner-grow text-${color} m-1`} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 d-flex justify-content-center flex-wrap gap-3">
            <button
              onClick={handleClear}
              id="clearCanvas"
              style={{ display: 'none' }}
              type="button"
              className="btn btn-outline-primary"
            >
              Clear Canvas
            </button>

            <button
              onClick={removeBackground}
              id="removeBg"
              style={{ display: 'none' }}
              type="button"
              className="btn btn-success"
            >
              Remove Background
            </button>

            <button
              onClick={Download}
              id="download"
              style={{ display: 'none' }}
              type="button"
              className="btn btn-dark"
            >
              Download
            </button>
          </div>

        </div>
      </div>
    </div>

  );

}
export default RemoveBg;
/* eslint-disable */

