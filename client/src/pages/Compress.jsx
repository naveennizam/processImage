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
    console.log("result.filed.length", result.filed.length);

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

    const res = await fetch(
      `${process.env.RENDER_PROD}/profile`,
      request
    );

  // console.log("FDFFFDDDDDDDDD",res.status,res.status == 200)
   // const uploadedImage = await res.json();
  
    if (res.status == 200) {
      alert("Hurray! Downloaded");
    //  if(uploadedImage.response ==  "Hurray! Downloaded") location.reload()
      document.getElementById("formFileLg").value = "";
      setResult([]);
      location.reload()
    } else {
      alert("Something Wrong");
    }
  };


  useEffect(()=>{},[result])
  // useEffect(() => {
  //   let data = async () => {
  //     (function (t, e, n, r) {
  //       function a() {
  //         return e && e.now ? e.now() : null;
  //       }
  //       if (!n.version) {
  //         n._events = [];
  //         n._errors = [];
  //         n._metadata = {};
  //         n._urlGroup = null;
  //         window.RM = n;
  //         n.install = function (e) {
  //           n._options = e;
  //           var a = t.createElement("script");
  //           a.async = true;
  //           a.crossOrigin = "anonymous";
  //           a.src = r;
  //           var o = t.getElementsByTagName("script")[0];
  //           o.parentNode.insertBefore(a, o);
  //         };
  //         n.identify = function (t, e) {
  //           n._userId = t;
  //           n._identifyOptions = e;
  //         };
  //         n.sendEvent = function (t, e) {
  //           n._events.push({ eventName: t, metadata: e, time: a() });
  //         };
  //         n.setUrlGroup = function (t) {
  //           n._urlGroup = t;
  //         };
  //         n.track = function (t, e) {
  //           n._errors.push({ error: t, metadata: e, time: a() });
  //         };
  //         n.addMetadata = function (t) {
  //           n._metadata = Object.assign(n._metadata, t);
  //         };
  //       }
  //     })(
  //       document,
  //       window.performance,
  //       window.RM || {},
  //       "https://cdn.requestmetrics.com/agent/current/rm.js"
  //     );
  //     RM.install({
  //       token: "t9ac5ua:y2hw6hb",
  //     });
  //   };

  //   data();
  // }, [result]);





  return (
    <>
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6 my-5">
          <form
            action="/profile"
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmission}
          >
            <label htmlFor="formFileLg" className="form-label">
            {/* Compress the images through TINIFY */}
              <h2>Compress the images size</h2>
              <p>Smart WebP, PNG and JPEG Compression for Faster Websites</p>
            </label>
            <input
              className="form-control form-control mt-5"
              style={{ width: 500 }}
              id="formFileLg"
              // multiple
              ref={fileInputRef}
              type="file"
              accept="image/png, image/avif, image/jpeg, image/jpg image/webpg"
              onChange={changeHandler}
            />
{loading &&
            <button
              type="submit"
              className="btn btn-outline-primary  mx-5 col-6 my-5 "
              disabled={result.length == []}
            >
              Download
            </button>
}
          </form>
        </div>
      </div>
    </>
  );
}

export default Compress;
/* eslint-disable */
