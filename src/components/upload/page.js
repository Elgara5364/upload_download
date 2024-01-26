"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

const Upload = () => {
  const [isPayment, setIsPayment] = useState(false);
  const [file, setFile] = useState();
  const [prevFile, setPrevFile] = useState(null);
  const [url, setUrl] = useState();
  // console.log(publidid);
  console.log(url);

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    setPrevFile(URL.createObjectURL(e.target.files[0]));
    console.log(prevFile);
  };

  const handleSubmit = async () => {
    const api = "https://api.cloudinary.com/v1_1/dx66h7rgb/image/upload";
    const key = "ml_default";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    const res = await fetch(api, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setUrl(data.url.slice(49));
    setIsPayment(true);
  };

  const handleDownload = async () => {
    console.log(url);
  };

  // console.log(file);
  return (
    <div className="text-center p-10">
      <input type="file" onChange={handleImage} />
      <img className=" m-auto w-4/12 h-4/12  p-10" src={prevFile} />
      <button
        className="bg-green-200 w-1/4 text-black rounded-md p-5"
        onClick={handleSubmit}>
        Konfirmasi
      </button>
      <div>
        {isPayment ? (
          <div>
            <h1 className=" text-2xl p-5">berhasil</h1>
            <img src={prevFile} alt="" className="m-auto w-4/12 h-4/12" />
            <a
              href={`https://res.cloudinary.com/dx66h7rgb/image/upload/fl_attachment/${url}`}>
              Download img
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Upload;
