import "./AddProduct.css";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAddProductMutation } from "../../reducers/api";

export default function AddProduct() {
   const [file, setFile] = useState(null);
   const [rejected, setRejected] = useState(false);
   const [addProduct] = useAddProductMutation();

   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
         let acceptedFile = acceptedFiles[0];
         Object.assign(acceptedFile, {
            preview: URL.createObjectURL(acceptedFile),
         });
         setFile(acceptedFile);
      }
      if (rejectedFiles?.length) {
         setRejected(!rejected);
      }
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         "image/png": [".png"],
         "image/jpeg": [".jpeg", ".jpg"],
      },
      maxFiles: 1,
   });

   async function uploadFile() {
      const imageExt = {
         "image/png": "png",
         "image/jpeg": "jpeg",
      };

      // removing the file extension
      let originalFileName = file.name.split(".");
      originalFileName.pop();
      originalFileName = originalFileName.join(".");

      //   creating new filename
      const finalFileName = `${file.lastModified}-${originalFileName}.${
         imageExt[file.type]
      }`;
      const formData = new FormData();
      formData.append("productImage", file, finalFileName);
      const response = await fetch("/uploadfile", {
         method: "POST",
         body: formData,
      });
      if (response.status === 200) {
         return finalFileName;
      } else {
         throw new Error("Error uploading file");
      }
   }

   async function onSubmit(event) {
      event.preventDefault();
      try {
         var filename = await uploadFile();
         addProduct({
            name: event.target.product_name.value,
            price: Number(event.target.product_price.value),
            country_of_origin: event.target.product_country.value,
            description: event.target.product_description.value,
            image_url: `/images/${filename}`,
         });
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <form onSubmit={onSubmit} className="add-product-form">
         <input
            type="text"
            id="product_name"
            name="product_name"
            placeholder="Product name"
         />
         <input
            type="number"
            step="0.01"
            id="product_price"
            name="product_price"
            placeholder="Product Price"
         />
         <input
            type="text"
            id="product_country"
            name="product_country"
            placeholder="Country of origin"
         />
         <input
            type="text"
            id="product_description"
            placeholder="Product description"
         />
         <div className="dropzone-container">
            {file && (
               <img
                  src={file.preview}
                  alt={file.name}
                  key={file.name}
                  className="dropzone-preview"
               />
            )}
            <div style={{ visibility: rejected ? "visible" : "hidden" }}>
               Wrong file type. Accepted types are .png, .jpeg, and .jpg
            </div>
            <div className="dropzone" {...getRootProps()}>
               <input {...getInputProps()} />
               {isDragActive ? (
                  <p>Drop files here</p>
               ) : (
                  <p>Drag and drop image here, or click to select image</p>
               )}
            </div>
         </div>
         <input type="submit" value="Create new product" />
      </form>
   );
}
