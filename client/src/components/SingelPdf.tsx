// import { useParams } from "react-router-dom";
// import { pfdArray } from "../lib/schema";
// import { useEffect, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // Set workerSrc for pdfjs (necessary for PDF rendering)
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// const SingelPdf = () => {
//   const { id } = useParams();
//   const [file, setFile] = useState<string | null>(null);
//   const [numPages, setNumPages] = useState(null);

//   useEffect(() => {
//     const singlePdf = pfdArray.find((item) => item.id === Number(id));
//     if (!singlePdf) return;

//     const fetchPDF = async () => {
//       try {
//         const response = await fetch(singlePdf.url);
//         const blob = await response.blob();
//         const fileURL = URL.createObjectURL(blob);
//         // console.log({ fileURL });
//         setFile(fileURL);
//       } catch (error) {
//         console.error("Error fetching PDF:", error);
//         // Implement error handling here if needed
//       }
//     };

//     fetchPDF();
//   }, [id]); // Add id as a dependency

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       {file ? (
//         <Document
//           file={file}
//           onLoadSuccess={onDocumentLoadSuccess}
//           onLoadError={(error) => {
//             console.error("Error loading PDF:", error);
//             // Implement error handling UI here if needed
//           }}
//           className="max-h-full">
//           {/* Loop through pages and render them */}
//           {Array.from({ length: numPages }, (_, index) => (
//             <Page
//               key={`page_${index + 1}`}
//               pageNumber={index + 1}
//               // Uncomment and adjust as needed
//               // width={width ? width : 1}
//               // scale={scale}
//               // rotate={rotation}
//             />
//           ))}
//         </Document>
//       ) : (
//         <div className="flex justify-center">
//           {/* Add a loading spinner or message */}
//           <p>Loading PDF...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingelPdf;

import { useParams } from "react-router-dom";
// import { pfdArray } from "../lib/schema";
import { useEffect, useState } from "react";
import PdfRenderer from "./PdfRenderer.tsx"; // Import the PdfRenderer component
import Loader from "./loader.tsx";

const SingelPdf = () => {
  const { id } = useParams();
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    // const singlePdf = pfdArray.find((item) => item.id === Number(id));
    // if (!singlePdf) return;

    const fetchPDF = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pdfs/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }

        const blob = await response.blob();
        const fileURL = URL.createObjectURL(blob);
        setFile(fileURL);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [id]);
  console.log("this");
  return (
    <div>
      {file ? (
        <PdfRenderer url={file} />
      ) : (
        <Loader size={50} className="h-screen" />
      )}
    </div>
  );
};

export default SingelPdf;
