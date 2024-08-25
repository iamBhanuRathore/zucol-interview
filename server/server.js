const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 3000;

const pfdArray = [
  {
    id: 1,
    name: "Docker Tutorial",
    url: "https://www.tutorialspoint.com/docker/docker_tutorial.pdf",
  },
  {
    id: 2,
    name: "AWS Documentation",
    url: "https://www.tutorialspoint.com/amazon_web_services/amazon_web_services_tutorial.pdf",
  },
  {
    id: 3,
    name: "Cloudflare tutorial",
    url: "https://www.cloudflare.com/static/6f129010d43216d460e308819acce421/Cloudflare_Product_Cheat_Sheet.pptx.pdf",
  },
  {
    id: 4,
    name: "Node JS",
    url: "https://riptutorial.com/Download/node-js.pdf",
  },
  {
    id: 5,
    name: "Kubernetes",
    url: "https://www.tutorialspoint.com/kubernetes/kubernetes_tutorial.pdf",
  },
  {
    id: 6,
    name: "WebRTC",
    url: "https://www.tutorialspoint.com/webrtc/webrtc_tutorial.pdf",
  },
  {
    id: 7,
    name: "Web Sockets",
    url: "https://pages.ably.com/hubfs/the-websocket-handbook.pdf",
  },
  {
    id: 8,
    name: "Javascript",
    url: "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf",
  },
  {
    id: 9,
    name: "Typescript",
    url: "https://www.tutorialspoint.com/typescript/typescript_tutorial.pdf",
  },
  {
    id: 10,
    name: "Tailwind",
    url: "https://on.notist.cloud/pdf/deck-cf558bb3d5cd2031.pdf",
  },
  {
    id: 11,
    name: "11",
    url: "https://www.cityofmidlandmi.gov/DocumentCenter/View/15493/Google-Drive",
  },
];
app.use(cors({ origin: "*" }));
// Endpoint to get all PDFs metadata
app.get("/pdfs", (req, res) => {
  res.json(pfdArray);
});

// Endpoint to get a single PDF by ID and return the PDF content
app.get("/pdfs/:id", async (req, res) => {
  const pdfId = parseInt(req.params.id);
  const pdf = pfdArray.find((p) => p.id === pdfId);

  if (pdf) {
    try {
      const response = await axios.get(pdf.url, { responseType: "stream" });

      // Set the headers to inform the client about the file type and name
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${pdf.name}.pdf"`
      );

      // Pipe the response stream directly to the client
      response.data.pipe(res);
    } catch (error) {
      res.status(500).send("Error fetching the PDF");
    }
  } else {
    res.status(404).send("PDF not found");
  }
});

app.listen(port, () => {
  console.log(`PDF server running at http://localhost:${port}`);
});
