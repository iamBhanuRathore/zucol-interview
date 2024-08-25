export interface PdfSchema {
  id: number;
  name: string;
  url: string;
}

export type PdfArraySchema = PdfSchema[];

export const pfdArray: PdfArraySchema = [
  {
    id: 1,
    name: "First",
    url: "https://api.slingacademy.com/v1/sample-data/files/just-text.pdf",
  },
  {
    id: 2,
    name: "Second",
    url: "https://api.slingacademy.com/v1/sample-data/files/text-and-images.pdf",
  },
  {
    id: 3,
    name: "Third",
    url: "https://api.slingacademy.com/v1/sample-data/files/text-and-table.pdf",
  },
  {
    id: 4,
    name: "Fourth",
    url: "https://mdu.ac.in/UpFiles/UpPdfFiles/2016/Jan/MCA.pdf",
  },
  {
    id: 5,
    name: "Fifth",
    url: "https://www.mdu.ac.in/UpFiles/UpPdfFiles/2011/Jan/MCA_old_2010.pdf",
  },
  {
    id: 6,
    name: "Sixth",
    url: "https://indico.cern.ch/event/1131319/attachments/2394212/4245453/Running%20Docker%20tutorials%20on%20Windows%2010.pdf",
  },
  {
    id: 7,
    name: "Seventh",
    url: "https://kodekloud.com/wp-content/uploads/2020/06/Docker-for-Beginners-Mumshad-Mannambeth.pdf",
  },
  {
    id: 8,
    name: "Eighth",
    url: "https://www.algotutor.io/assets/img/notes/react/React%20Important%20Questions.pdf",
  },
  {
    id: 9,
    name: "Ninth",
    url: "https://www.meity.gov.in/writereaddata/files/JD_React%20JS%20Developer_2_0.pdf",
  },
  {
    id: 10,
    name: "Tenth",
    url: "https://www.pdf995.com/samples/pdf.pdf",
  },
];
