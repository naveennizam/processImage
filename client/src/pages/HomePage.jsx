// src/components/Home.js

const HomePage = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Image Tools</h1>

      <div className="row mb-5">
        <div className="col-md-6 mx-auto ">
          <div className="card  border-0 show-shadow">
            <div className="card-body text-center">
              <h2 className="card-title">Reduce Image Size</h2>
              <p className="card-text">
                To reduce the KB of a picture, one of the most manageable steps is to use a tool like Shrink.media.
                Simply upload the picture, let the tool compress it, and then download the reduced file size—
                effectively reducing the KB size while maintaining image quality.
              </p>
              <a href="/compress">
                <img
                  src="../../images/compress_logo.png"
                  alt="Compress"
                  className="img-fluid rounded hover-shadow mt-3"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6 mx-auto">
          <div className="card  border-0 show-shadow">
            <div className="card-body text-center">
              <h2 className="card-title">Remove Image Background</h2>
              <p className="card-text">
                Background removal isolates the subject from its original background, allowing transparent or new
                backgrounds. Widely used in e-commerce, design, and photography to create clean, professional visuals.
              </p>
              <a href="/remove_bg">
                <img
                  src="../../images/remove_bg_logo.jpg"
                  alt="Remove Background"
                  className="img-fluid rounded hover-shadow mt-3"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
