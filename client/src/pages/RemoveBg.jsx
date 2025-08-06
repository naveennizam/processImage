/* eslint-disable */


import { useState, useEffect } from "react";
//import { FileUploader } from "react-drag-drop-files";
// import { ColorRing } from "react-loader-spinner";
// import { getSession } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import { creditsById } from '../../database/bg_credits';
// import { getConsumedById } from '../../database/bg_requests';

// import Popup from "../my-design/pop";
// import Icon from '@mui/material/Icon';


// const ColorPicker = dynamic(() => import('../components/ColorPicker-Card'), {
//     ssr: false
// });





// function RemoveBg() {

//     const [fileContentss, setFileContents] = useState();
//     let [fileName, setFileName] = useState();
//     const fileTypes = ["JPG", "PNG", "JPEG"];
//     const [loading, setLoading] = useState(false);
//     // const { data: session, status } = useSession();
//     const [defaultColor, setDefaultColor] = useState('#ffffff');
//     const [colorPickerVisible, setColorPickerVisible] = useState(false);
//     const [layerID, setLayerID] = useState("canvas");
//     const [canvasWidth, setCanvasWidth] = useState();
//     const [canvasHeight, setCanvasHeight] = useState();
//     const [data, setData] = useState([]);
//     const [scriptLoaded, setScriptLoaded] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);

//     // const Popup = (props) => {
//     //     return (
//     //         <div className="popup-box">
//     //             <div className="box">
//     //                 <span className="close-icon" onClick={props.handleClose}>x</span>
//     //                 {props.content}
//     //             </div>
//     //         </div>
//     //     );
//     // };
//     const closeTogglePopup = (e) => { setIsOpen(false); }

//     const togglePopup = (e) => { setIsOpen(true); }

//     let DownloadFile = async (fileContents) => {

//         fileName = `${fileName}-flg-preview.png`;

//         if (typeof Blob != "undefined") {
//             // using Blob
//             var textFileAsBlob = new Blob([fileContents], {
//                 type: "text/plain",
//             });
//             var downloadLink = document.createElement("a");
//             downloadLink.download = fileName;
//             if (window.webkitURL != null) {
//                 downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//             } else {
//                 downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
//                 // downloadLink.onclick = document.body.removeChild(event.target);
//                 downloadLink.style.display = "none";
//                 document.body.appendChild(downloadLink);
//             }
//             downloadLink.click();
//             URL.revokeObjectURL(downloadLink.href);
//             //     console.log(downloadLink)
//             //  location.reload()
//         } else {
//             var pp = document.createElement("a");
//             pp.setAttribute(
//                 "href",
//                 "data:text/plain;charset=utf-8," + encodeURIComponent(fileContents)
//             );
//             pp.setAttribute("download", fileName);
//             // pp.onclick = document.body.removeChild(event.target);
//             pp.click();
//             URL.revokeObjectURL(pp.href);
//             //  location.reload()
//         }
//     }

//     function dataURLtoBlob(dataurl) {
//         var arr = dataurl.split(","),
//             mime = arr[0].match(/:(.*?);/)[1],
//             bstr = atob(arr[1]),
//             n = bstr.length;
//         var u8arr = new Uint8Array(n);
//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new Blob([u8arr], { type: mime });
//     }

//     const handleChange = async (e) => {
//         if (document.getElementById("main").style.display != "none")
//             document.getElementById("main").style.display = "none";

//         if (!["image/jpeg", "image/png", "image/jpeg"].includes(e.type)) {
//             alert("Only images are allowed.");
//         } else {
//             setLoading(true);
//             const formData = new FormData();
//             formData.append("image", e);
//             let data = await fetch("/api/bgRemover/bg_remover", {
//                 method: "POST",
//                 body: formData,
//             });
//             let res = await data.json();


//             if (res.blob_url) {
//                 let url = res.blob_url;
//                 setCanvasHeight(res.dimension.height)
//                 setCanvasWidth(res.dimension.width)

//                 let Contents = await dataURLtoBlob(url);
//                 console.log("CONTENT", Contents)
//                 //    setFileContents(Contents);
//                 let regex = new RegExp(/\.[^/.]+$/);
//                 setFileName(e.name.replace(regex, ""));


//                 window.sessionStorage.setItem("data", JSON.stringify({ "contents": res.blob_url, "fileName": e.name.replace(regex, ""), buffer: res.buffer, dimension: res.dimension }));
//                 document.getElementById("main").style.display = "block";
//                 setLoading(false);

//                 let canvas = document.getElementById("serverImage")
//                 canvas.width = res.dimension.width;
//                 canvas.height = res.dimension.height
//                 const ctx = canvas.getContext("2d");
//                 ctx.quality = 'best';
//                 ctx.patternQuality = 'best';
//                 ctx.imageSmoothingQuality = 'high';
//                 ctx.textBaseline = "top";


//                 const img = new Image();
//                 img.addEventListener("load", () => {
//                     ctx.drawImage(img, 0, 0);
//                 });
//                 img.src = url;

//                 ctx.globalCompositeOperation = "source-over";
//                 ctx.fillStyle = "blue";
//                 ctx.fillRect(0, 0, res.dimension.width, res.dimension.height);
//             } else {
//                 setLoading(false);
//                 alert("Internal Error");
//             }
//         }
//     };


//     // const Download = async (url) => {
//     //     if (props.getcredits == null || props.getcredits.length == 0) {
//     //         if (session) return window.open(url, "_self");

//     //         const { Modal } = require("bootstrap");
//     //         const myModal = new Modal("#exampleModal");
//     //         myModal.show();
//     //     }
//     //     else {

//     //         let data = {
//     //             user_id: props.getcredits.user_id,
//     //             bg_credit_id: props.getcredits.id
//     //         }

//     //         let res = await fetch('/api/bgRemover/insert-bg_request', {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify(data),
//     //         })
//     //         let result = await res.json();
//     //         if (res.status == 200 && result.message == 'DONE') DownloadFile()
//     //         else if (res.status == 200 && result.message == 'GOT MORE') location.href = '/bg/checkout'
//     //         else alert(`Error : ${result.message}`)

//     //     }
//     // };

//     // useEffect(() => {

//     //     if (window.sessionStorage.getItem("data")) {
//     //         let image_data = JSON.parse(window.sessionStorage.getItem("data"))
//     //         document.getElementById("main").style.display = "block";
//     //         setLoading(false);

//     //         const ctx = document.getElementById("serverImage").getContext("2d");
//     //         ctx.width = 500;
//     //         ctx.height = 500;
//     //         ctx.quality = 'best';
//     //         ctx.patternQuality = 'best';
//     //         ctx.imageSmoothingQuality = 'high';
//     //         ctx.textBaseline = "top";


//     //         const img = new Image();
//     //         img.addEventListener("load", () => {
//     //             ctx.drawImage(img, 0, 0);
//     //         });
//     //         setFileName(image_data.fileName);
//     //         img.src = image_data.contents;
//     //     }

//     // }, []); // to show image if data is stored otherwise it would be hidden.

//     // const picker = async (id, hex) => {
//     //     // let canvas = document.getElementById("serverImage")

//     //     // const ctx = canvas.getContext("2d");
//     //     console.log('sssssssss', id, hex)


//     //     // ctx.globalCompositeOperation = "source-over";
//     //     // ctx.fillStyle = hex;
//     //     // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
//     // }
//     // const picker = async (id, hex) => {
//     //     window.colorPicker(id, hex)
//     // }

//     // const handleGradientClick = (id, hex) => {
//     //     console.log('handleGradientClick', id, hex);
//     //     setDefaultColor(hex)
//     //     setColorPickerVisible(false);
//     //     setLayerID(id);

//     //     setTimeout(async function () {
//     //         setColorPickerVisible(true);
//     //     }, 100);
//     // }
//     // const handleClick = (id, hex) => {
//     //     setDefaultColor(hex)
//     //     setColorPickerVisible(false);
//     //     setLayerID(id);

//     //     //     window.updateLayerID(id);
//     //     //    window.picker(id, hex)

//     //     setTimeout(async function () {
//     //         setColorPickerVisible(true);
//     //     }, 100);

//     // }

//     // const handleHide = () => setColorPickerVisible(false);


//     useEffect(() => {
//     }, [defaultColor]);

//     let Background = async () => { setColorPickerVisible(!colorPickerVisible) }

//     let CanvasDownload = async () => {

//         var canvas = document.querySelector('#serverImage');

//         var image = canvas.toDataURL("image/png")  // here is the most important part because if you dont replace you will get a DOM 18 exception.

//         let Cont = await dataURLtoBlob(image);
//         console.log("CONTENT", Cont)
//         //setFileContents(Cont);
//         DownloadFile(Cont);

//     }
//     let [result, setResult] = useState([]);


//     const changeHandler = (e) => {
//         let images = [];
//         let filed = [];
//         console.log("e.target.files.length", e.target.files);
//         for (let i = 0; i < e.target.files.length; i++) {
//             filed.push(e.target.files[i]);
//             images.push(URL.createObjectURL(e.target.files[i]));
//         }
//         setResult({
//             filed,
//             images,
//         });
//     };

//     const handleSubmission = async (event) => {
//         event.preventDefault();
//         console.log("result.filed.length", result.filed.length);

//         var formData = new FormData();

//         for (var i = 0; i < result.filed.length; i++) {
//             formData.append("file", result.filed[i]);
//         }

//         var request = {
//             method: "POST",
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "cache-control": "no-cache",
//             },
//             body: formData,
//         };

//         const res = await fetch(
//             `${process.env.RENDER_PROD}/remove_bg`,
//             request
//         );


//         if (res.status == 200) {
//             alert("Hurray! Downloaded");

//             document.getElementById("formFileLg").value = "";
//             setResult([]);
//             location.reload()
//         } else {
//             alert("Something Wrong");
//         }
//     };


//     useEffect(() => { }, [result])
//     return (
//         <>

//             <h1>Image Background Remover</h1>

//             <p>
//                 Remove image backgrounds automatically in 5 seconds with just one click.
//                 Don't spend hours manually picking pixels. Upload your photo now & see
//                 the magic.{" "}
//             </p>
//             <div className="container mt-5">


//                 <form role="form" method="POST" id="upload-form" className="insert-symbol-form" name="upload-form" encType="multipart/form-data" action="/remove_bg" onSubmit={handleSubmission}
//                 >
//                     {/* <input type="file" id='FileUploader' accept=".png, .jpg, .jpeg" /> */}


//                     <input
//                         className="form-control form-control mt-5"
//                         style={{ width: 500 }}
//                         id="formFileLg"
//                         multiple
//                         type="file"
//                         onChange={changeHandler}
//                     />
//                     <button
//                         type="submit"
//                         className="btn btn-outline-primary  mx-5 col-6 my-5 "
//                         disabled={result.length == []}
//                     >
//                         Download
//                     </button>
//                 </form>
//                 <canvas id="canvas"
//                     style={{
//                         borderRadius: "25px ",
//                         border: "1px solid #cfcccc",

//                     }}></canvas>

//                 {/* <form role="form" method="POST" id="upload-form" name="upload-form" encType="multipart/form-data">
//                 <FileUploader
//                     // handleChange={handleChange} 
//                     name="file"
//                     types={fileTypes}
//                     id='FileUploader'
//                 />
//             </form> */}
//                 {/* {loading && (
//                     <ColorRing
//                         visible={true}
//                         height="100"
//                         width="100"
//                         ariaLabel="color-ring-loading"
//                         wrapperStyle={{}}
//                         wrapperClass="color-ring-wrapper"
//                         colors={["#e15b64", "#f47e60"]}
//                     />
//                 )} */}


//                 <div id="main" style={{ display: "none" }} >
//                     <div className=" d-flex justify-content-between">
//                         <div className="m-5" >
//                             {/* <span
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() => Download(`/bg/checkout`)}
//                             >
//                                 <a
//                                     target="_blank"
//                                     rel="noopener"
//                                     className="btn bg-secondary text-white rounded-pill"
//                                     title="Start with Template"
//                                 >
//                                     Download
//                                 </a>
//                             </span> */}
//                             <div className="my-4">
//                                 <button onClick={Background}>Background</button>



//                                 <button className=" m-5" id="popup">Photos </button>

//                                 {/* <button id='photo' onClick={togglePopup}>Photos</button> */}
//                             </div>
//                             {/* {colorPickerVisible && defaultColor && (<ColorPicker id={layerID} color={defaultColor} />
//                             )} */}
//                         </div>{" "}

//                         <div >
//                             {/* <canvas id="serverImage"
//                             style={{
//                                 //  backgroundImage: 'url("bg.png")',
//                                 // backgroundColor: "red",
//                                 borderRadius: "25px ",
//                                 border: "1px solid #cfcccc",

//                             }}></canvas> */}
//                             <button id="CanvasDownload">canvas download</button>


//                             <canvas id="canvas"
//                                 style={{
//                                     borderRadius: "25px ",
//                                     border: "1px solid #cfcccc",

//                                 }}></canvas>

//                             <button id='undo' className="m-4" >Undo</button>
//                             <button id='redo' className="m-4" >Redo</button>
//                         </div>
//                     </div>
//                 </div>

//             </div >
//             <span>
//                 <input id="cssPath" type="hidden" value={process.env.CSS_PATH} />
//             </span>

//             <>
//                 {/* <Script type="module" src={`/js/bg-remover/bg-remover.js`} strategy="lazyOnload" ></Script> */}
//             </>




//         </>
//     );
// };

// components/ImageCanvas.jsx

import React, { useRef } from 'react';
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
    const response = await fetch(
      `${process.env.RENDER_PROD}/remove-bg`, request);

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

