import { useEffect, useState } from "react";

function Uplod() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [allImages, setImages] = useState([]);

  useEffect(() => {
    getAllFiles();
  }, [uploadedFile]);

  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      const response = await fetch("http://localhost:3001/file-upload", {
        method: "POST",
        body: formData,
      });
      console.log("File uploaded successfully");
      getAllFiles();
    } catch (error) {}
  };

  const getAllFiles = async () => {
    try {
      const response = await fetch("http://localhost:3001/getFiles", {
        method: "GET",
      });

      const images = await response.json();
      setImages(images);
    } catch (e) {}
  };

  return (
    <div className="container p-3">
      <div className="container-fluid">
        <div className="d-flex flex-column align-items-center">
          <h2 className="mb-5">Uplod Image</h2>
          <form className="w-50">
            <div className="d-flex flex-column align-items-center">
              <div className="w-100 mb-3">
                <div className="mb-2 fw-bold">Select Image</div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  multiple={false}
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </div>
              <button
                type="button"
                onClick={(e) => clickHandler(e)}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {allImages && (
          <div className="card my-4">
            <div className="d-flex flex-wrap">
              {allImages.map((image) => (
                <div key={image} className="col-12 col-md-6 col-lg-4 p-3">
                  <div className="shadow bg-body rounded h-100 w-100 p-2">
                    <img
                      className="h-100 w-100"
                      src={`http://localhost:3001/image/${image}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Uplod;
