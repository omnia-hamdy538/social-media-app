import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PersonalReportPDF from "./PersonalReportPDF"; 
import downloadIcon from "/src/assets/sections/download.png"; 
import logoSrc from "/src/assets/logos/logo.png"; 
import companyLogoSrc from "/src/assets/sections/comp.png"; 

const PersonalReportPage = ({ relatedData, reportData }) => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      {/* PDF Download Button */}
      <div className="flex justify-end mb-6">
        <PDFDownloadLink
          document={
            <PersonalReportPDF
              relatedData={relatedData}
              reportData={reportData}
              logoSrc={logoSrc}
              companyLogoSrc={companyLogoSrc}
            />
          }
          fileName="internship-report.pdf"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
        >
          {({ loading }) =>
            loading ? "Preparing PDF..." : (
              <img src={downloadIcon} alt="Download PDF" className="h-6 w-6" />
            )
          }
        </PDFDownloadLink>
      </div>


      <div className="border border-gray-200 rounded-xl shadow p-8">

        <h2 className="text-xl font-semibold mb-4">{relatedData.candidateName}'s Report Preview</h2>
        <p className="text-gray-600 text-sm">هنا ممكن تحطي preview أو أي مكونات إضافية قبل التحميل</p>
      </div>

    </div>
  );
};

export default PersonalReportPage;