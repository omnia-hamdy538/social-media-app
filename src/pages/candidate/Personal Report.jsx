// import React, { useRef, useEffect, useState } from "react";

// const PersonalReportPage = () => {
//   const iframeRef = useRef(null);
//   const [iframeHeight, setIframeHeight] = useState("0px");

//   useEffect(() => {
//     const iframe = iframeRef.current;

//     const resizeIframe = () => {
//       if (iframe && iframe.contentWindow) {
//         const height = iframe.contentWindow.document.body.scrollHeight;
//         setIframeHeight(height + "px");
//       }
//     };

//     iframe.addEventListener("load", resizeIframe);

//     // Cleanup
//     return () => iframe.removeEventListener("load", resizeIframe);
//   }, []);

//   return (
//     <div>
//       <iframe
//         ref={iframeRef}
//         src="/src/public/personal-report.html"
//         title="Personal Report"
//         style={{ width: "100%", height: iframeHeight, border: "none" }}
//       />
//     </div>
//   );
// };

// export default PersonalReportPage;