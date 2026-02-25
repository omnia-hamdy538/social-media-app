import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import downloadIcon from "/src/assets/sections/download.png"; 
import logoSrc from "/src/assets/sections/forsaty.jpg"; 
import companyLogoSrc from "/src/assets/sections/comp.png"; 
import universityLogoSrc from "/src/assets/sections/bsu.jpg"; 


const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 10,
    backgroundColor: "#f9fafb",
  },
  container: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  logos: { width: 60, height: 60, borderRadius: 30, border: "1px solid #e5e7eb" },
  companyLogo: { marginLeft: -20 },
  headerText: { marginLeft: 8 },
  title: { textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 3 },
  subtitle: { textAlign: "center", fontSize: 10, color: "#6b7280", marginBottom: 10 },
  section: { border: "1px solid #e5e7eb", borderRadius: 5, padding: 10, marginBottom: 10 },
  sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 5 },
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 2 },
  cell: { width: "50%", marginBottom: 2 },
  cellLabel: { fontSize: 8, color: "#6b7280" },
  cellValue: { fontSize: 10, fontWeight: 500 },
  tasksList: { marginBottom: 5 },
  taskItem: { flexDirection: "row", marginBottom: 2 },
  taskBullet: { width: 4, height: 4, borderRadius: 2, backgroundColor: "black", marginTop: 4, opacity: 0.6 },
  footer: { marginTop: 10, fontSize: 8 },
});


const CollegeReportPDFDocument = ({ relatedData, reportData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logoSrc} style={styles.logos} />
            <Image src={companyLogoSrc} style={[styles.logos, styles.companyLogo]} />
            <View style={styles.headerText}>
              <Text style={{ fontSize: 10, fontWeight: 500 }}>{relatedData.companyName}</Text>
              <Text style={{ fontSize: 8, color: "#6b7280" }}>Student Internship Office</Text>
            </View>
          </View>
          <Image src={universityLogoSrc} style={styles.logos} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Internship Completion Report</Text>
        <Text style={styles.subtitle}>Official record of internship completion, skills and evaluation</Text>

        {/* Intern Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intern Information</Text>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Full Name</Text>
              <Text style={styles.cellValue}>{relatedData.candidateName}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>University / College</Text>
              <Text style={styles.cellValue}>{relatedData.candidateUniversityName}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Department / Major</Text>
              <Text style={styles.cellValue}>{relatedData.candidateMajor}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Intern Position</Text>
              <Text style={styles.cellValue}>{relatedData.internshipTitle}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Start Date</Text>
              <Text style={styles.cellValue}>{reportData.startDate.split("T")[0]}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>End Date</Text>
              <Text style={styles.cellValue}>{reportData.endDate.split("T")[0]}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Total Hours</Text>
              <Text style={styles.cellValue}>{reportData.totalHours}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Company Name</Text>
              <Text style={styles.cellValue}>{relatedData.companyName}</Text>
            </View>
          </View>
        </View>

        {/* Internship Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Internship Details</Text>

          <View style={styles.tasksList}>
            <Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 2 }}>Tasks and Responsibilities</Text>
            {relatedData.internshipResponsibilities?.split("<br>").map((task, index) => {
              const cleanTask = task.replace("-", "").trim();
              if (!cleanTask) return null;
              return (
                <View style={styles.taskItem} key={index}>
                  <View style={styles.taskBullet} />
                  <Text style={{ fontSize: 10, marginLeft: 4 }}>{cleanTask}</Text>
                </View>
              );
            })}
          </View>

          <Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 2 }}>Skills Gained</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>{reportData.acquiredSkills}</Text>

          <Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 2 }}>Performance Evaluation</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>{reportData.evaluation}</Text>

          <Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 2 }}>Additional Notes / Comments</Text>
          <Text style={{ fontSize: 10 }}>{reportData.comments}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Supervisor: {relatedData.internshipSupervisor}</Text>
          <Text>Date of Report: {reportData.createdAt.split("T")[0]}</Text>
          <Text>Report Key: {reportData.uniqueKey}</Text>
        </View>
      </View>
    </Page>
  </Document>
);


const CollegeReportPDF = ({ relatedData, reportData }) => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="flex justify-end mb-6">
        <PDFDownloadLink
          document={<CollegeReportPDFDocument relatedData={relatedData} reportData={reportData} />}
          fileName="college-internship-report.pdf"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
        >
          {({ loading }) =>
            loading ? "Preparing PDF..." : (
              <img src={downloadIcon} alt="Download PDF" className="h-6 w-6" />
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CollegeReportPDF;