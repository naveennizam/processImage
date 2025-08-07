/* eslint-disable */

import { useState, useEffect,useRef } from "react";

function Compress() {
  let [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);  

  const changeHandler = (e) => {
    let images = [];
    let filed = [];
    let checkImageType = ["image/png", "image/avif", "image/jpeg", "image/jpg" ,"image/webpg"]

    if(checkImageType.includes(e.target.files[0].type)) 
  {
    setLoading(true)
    for (let i = 0; i < e.target.files.length; i++) {
      filed.push(e.target.files[i]);
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setResult({
      filed,
      images,
    });

  }
  else{
    alert(`choose image like ${checkImageType}`)
    setLoading(false)
    fileInputRef.current.value = '';
  }
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    console.log("result.filed.length", result);

    var formData = new FormData();

    for (var i = 0; i < result.filed.length; i++) {
      formData.append("file", result.filed[i]);
    }

    var request = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",
      },
      body: formData,
    };

    await fetch(
      `https://server-11ms.onrender.com/profile`,request
    ) .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      a.download = result.filed[0]?.name ??  'compressed-image.jpg'; // Or original file name if you have it
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      document.getElementById("formFileLg").value = "";
      setResult([]);
    })
    .catch(error => {
      console.error('Download failed:', error);
    });
  };


  useEffect(()=>{},[result])
 


  return (
    <>
     <div className="container">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-6 my-5">
      <form
        action="/profile"
        encType="multipart/form-data"
        method="post"
        onSubmit={handleSubmission}
        className="text-center"
      >
        <div className="mb-4">
          <label htmlFor="formFileLg" className="form-label">
            <h2 className="fw-bold">Compress the image size</h2>
            <p className="text-muted">Smart WebP, PNG and JPEG compression for faster websites</p>
          </label>
          <input
            className="form-control mt-3 mx-auto"
            style={{ maxWidth: "100%", width: "500px" }}
            id="formFileLg"
            ref={fileInputRef}
            type="file"
            accept="image/png, image/avif, image/jpeg, image/jpg, image/webp"
            onChange={changeHandler}
          />
        </div>

        {loading && (
          <button
            type="submit"
            className="btn btn-outline-primary col-8 col-md-6 my-3"
            disabled={result.length === 0}
          >
            Download
          </button>
        )}
      </form>
    </div>
  </div>
</div>

    </>
  );
}

export default Compress;
/* eslint-disable */
