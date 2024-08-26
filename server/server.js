const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 3000;

let pfdArray = [
  {
    id: 1,
    name: "Docker Tutorial",
    url: "https://h3abionet.org/images/Technical_guides/L3_01_docker_howto_basic_guide.pdf",
    description:
      "This tutorial provides a comprehensive introduction to Docker, covering the basics of containerization, Docker commands, and best practices for deploying applications using Docker. Ideal for beginners and intermediate learners, it guides you through setting up Docker on various platforms and using Docker Compose for multi-container applications. The tutorial also touches on Docker Swarm and Kubernetes integration for container orchestration, making it a valuable resource for developers and system administrators alike.",
    pages: 18,
    viewed: 100,
  },
  {
    id: 2,
    name: "AWS Documentation",
    url: "https://www.tutorialspoint.com/amazon_web_services/amazon_web_services_tutorial.pdf",
    description:
      "This guide is an extensive resource for understanding Amazon Web Services (AWS), offering detailed insights into its various services, including EC2, S3, and RDS. The document covers AWS architecture, deployment models, and the practical applications of cloud computing. It’s perfect for developers and IT professionals looking to leverage AWS for scalable cloud solutions, with examples and best practices for setting up secure and efficient cloud environments.",
    pages: 11,
    viewed: 120,
  },
  {
    id: 3,
    name: "Cloudflare tutorial",
    url: "https://www.cloudflare.com/static/6f129010d43216d460e308819acce421/Cloudflare_Product_Cheat_Sheet.pptx.pdf",
    description:
      "This tutorial provides an overview of Cloudflare's suite of products and services, including content delivery, DDoS protection, and DNS management. It explains how to optimize and secure your websites and applications using Cloudflare’s global network. The guide also covers Cloudflare Workers, security protocols, and caching strategies, making it essential for anyone looking to enhance web performance and security.",
    pages: 5,
    viewed: 140,
  },
  {
    id: 4,
    name: "Node JS",
    url: "https://riptutorial.com/Download/node-js.pdf",
    description:
      "A practical guide to Node.js, this document covers the fundamentals of server-side JavaScript, including asynchronous programming, event-driven architecture, and building RESTful APIs. The tutorial is ideal for developers new to Node.js or those looking to refine their skills, with step-by-step instructions on setting up a Node.js environment, working with NPM packages, and deploying applications. It also explores advanced topics like streams, clustering, and integrating with databases.",
    pages: 414,
    viewed: 150,
  },
  {
    id: 5,
    name: "Kubernetes",
    url: "https://www.tutorialspoint.com/kubernetes/kubernetes_tutorial.pdf",
    description:
      "This Kubernetes tutorial introduces the core concepts of container orchestration, including pods, services, and deployments. It is designed for IT professionals and developers who want to learn how to manage and scale containerized applications across clusters. The document covers setting up Kubernetes clusters, managing configurations, and automating application deployment. It's a must-read for anyone looking to leverage Kubernetes for automating their DevOps workflows.",
    pages: 15,
    viewed: 170,
  },
  {
    id: 6,
    name: "WebRTC",
    url: "https://www.tutorialspoint.com/webrtc/webrtc_tutorial.pdf",
    description:
      "This guide explains the fundamentals of WebRTC, a technology enabling real-time communication over peer-to-peer connections. It covers how to establish audio, video, and data channels between browsers, making it an essential resource for developers building video conferencing, file sharing, or collaborative applications. The tutorial also includes examples and best practices for optimizing WebRTC performance and ensuring security.",
    pages: 34,
    viewed: 180,
  },
  {
    id: 7,
    name: "Web Sockets",
    url: "https://pages.ably.com/hubfs/the-websocket-handbook.pdf",
    description:
      "The WebSocket Handbook is a detailed guide to implementing WebSocket communication for real-time applications. It covers the WebSocket protocol, establishing connections, and handling data transmission between clients and servers. This document is valuable for developers building chat applications, live updates, or any system requiring low-latency communication. It also explores advanced topics like scaling WebSocket servers and ensuring connection stability.",
    pages: 80,
    viewed: 250,
  },
  {
    id: 8,
    name: "Javascript",
    url: "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf",
    description:
      "This JavaScript tutorial provides a thorough introduction to the language, covering everything from basic syntax to advanced concepts like closures, prototypes, and asynchronous programming. Designed for both beginners and experienced developers, it offers practical examples and exercises to build interactive web applications. The document also covers JavaScript's integration with HTML and CSS, making it a foundational resource for front-end developers.",
    pages: 50,
    viewed: 210,
  },
  {
    id: 9,
    name: "Typescript",
    url: "https://www.tutorialspoint.com/typescript/typescript_tutorial.pdf",
    description:
      "This TypeScript tutorial explains the benefits of using TypeScript over JavaScript, particularly for large-scale applications. It covers type annotations, interfaces, classes, and modules, providing a solid foundation for developers transitioning to TypeScript. The guide also includes examples of integrating TypeScript with popular frameworks like React and Node.js, making it a valuable resource for improving code quality and maintainability in JavaScript projects.",
    pages: 25,
    viewed: 220,
  },
  {
    id: 10,
    name: "Tailwind",
    url: "https://on.notist.cloud/pdf/deck-cf558bb3d5cd2031.pdf",
    description:
      "This presentation on Tailwind CSS covers the key features and benefits of using a utility-first approach to styling web applications. It explains how to build responsive, component-based designs with minimal custom CSS. The tutorial also includes examples of common design patterns, tips for optimizing performance, and strategies for integrating Tailwind with modern JavaScript frameworks like React. Perfect for developers looking to streamline their CSS workflow.",
    pages: 37,
    viewed: 230,
  },
  {
    id: 11,
    name: "Google Drive",
    url: "https://www.cityofmidlandmi.gov/DocumentCenter/View/15493/Google-Drive",
    description:
      "This document provides an overview of Google Drive, explaining how to use the platform for storing, sharing, and collaborating on files in the cloud. It covers basic functionalities like uploading and organizing files, setting permissions, and integrating with other Google Workspace tools. The guide is useful for individuals and teams looking to improve their productivity through cloud-based file management and collaboration.",
    pages: 9,
    viewed: 240,
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
  const pdfIndex = pfdArray.findIndex((p) => p.id === pdfId);

  if (pdf) {
    try {
      const response = await axios.get(pdf.url, { responseType: "stream" });

      // Set the headers to inform the client about the file type and name
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${pdf.name}.pdf"`
      );
      pfdArray[pdfIndex].viewed = ++pfdArray[pdfIndex].viewed;
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
