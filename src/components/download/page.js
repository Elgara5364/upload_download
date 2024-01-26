"use client";

import React, { useState } from "react";
import { jsPDF } from "jsPDF";

const Download = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState();
  console.log(name);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setName(file.name.slice(0, -4));
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageData(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF("p", "cm", "a4"); //orientasi canvas, unit, size canvas
    const imgProps = pdf.getImageProperties(imageData); // method utk dapat w * h sebuah data
    const pdfWidth = pdf.internal.pageSize.width; //lebar canvas
    console.log(pdfWidth);
    const pdfHeight = pdf.internal.pageSize.height; //tinggi canvas
    const widthRatio = pdfWidth / imgProps.width;
    const heightRatio = pdfHeight / imgProps.height;
    const ratio = Math.min(widthRatio, heightRatio);

    const w = imgProps.width * ratio;
    const h = imgProps.height * ratio;
    pdf.addImage(imageData, 0, 0, w, h);
    pdf.save(`${name}.pdf`); //nama file download sesuai nama
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div>
  );
};

export default Download;
