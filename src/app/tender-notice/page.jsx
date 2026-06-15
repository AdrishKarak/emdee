"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { FileText, Calendar, Download } from "lucide-react";
import { motion } from "motion/react";

export function meta() {
  return [
    { title: "Tender Notices | Emdee Techno Services" },
    { name: "description", content: "Active tender notices and business opportunities with Emdee Techno Services." }
  ];
}

export default function TenderNoticePage() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const sheetId = "11A1knFF9DwHUHamS89XwqiJRAgSdJRCg3fic0GOQ4vY";
      const apiKey = "AIzaSyBIspuLnJwjCgq2yLLVritJriEO0eY5wTs";

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:Z?key=${apiKey}`,
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            `Unable to access the tender data. Please ensure the Google Sheet is publicly accessible (Anyone with the link can view).`,
          );
        }
        throw new Error(
          `Failed to fetch tenders: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data.values || data.values.length === 0) {
        setTenders([]);
        setLoading(false);
        return;
      }

      // First row is headers
      const [headers, ...rows] = data.values;

      // Convert to array of objects
      const allTenders = rows.map((row, index) => {
        const tender = { rowIndex: index };
        headers.forEach((header, colIndex) => {
          const key = header.toLowerCase().trim();
          tender[key] = row[colIndex] || "";
        });
        return tender;
      });

      // Filter for Active tenders only
      const activeTenders = allTenders.filter((tender) => {
        const status = (
          tender["status (active/inactive)"] ||
          tender.status ||
          ""
        )
          .toString()
          .toLowerCase()
          .trim();
        return status === "active";
      });

      setTenders(activeTenders);
      setError(null);
    } catch (err) {
      console.error("Error fetching tenders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-qanelas-soft relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0B3D91]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF6B35]/5 blur-[120px] pointer-events-none z-0" />

      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar variant="glass" />
      </div>

      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-b from-white to-[#D2691E] bg-clip-text text-transparent leading-tight"
            >
              Tender Notice
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-xl lg:text-2xl text-[#E5E5E5] max-w-xl mx-auto leading-relaxed"
            >
              Browse active tenders and submit your proposals
            </motion.p>
          </div>
        </div>

        {/* Tenders Table Section */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-24">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[#E5E5E5] text-lg">Loading tenders...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center"
            >
              <p className="text-red-400 text-lg">
                Error loading tenders: {error}
              </p>
              <button
                onClick={fetchTenders}
                className="mt-4 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200"
              >
                Retry
              </button>
            </motion.div>
          ) : tenders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-12 text-center"
            >
              <FileText className="w-16 h-16 text-[#FF6B35] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No Active Tenders
              </h3>
              <p className="text-[#E5E5E5] text-lg">
                There are no active tenders at the moment. Please check back
                later!
              </p>
              <p className="text-[#E5E5E5]/60 text-sm mt-8">
                Get in touch: admin@emdee.in
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="overflow-x-auto"
            >
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-2xl border border-[#2A2A2A] shadow-2xl bg-[#0F0F0F]/80 backdrop-blur-md">
                  <table className="min-w-full divide-y divide-[#2A2A2A]">
                    <thead className="bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
                      <tr>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          #
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <FileText size={18} className="text-[#FF6B35]" />
                            Tender No.
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <FileText size={18} className="text-[#0B3D91]" />
                            Tender Description
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-[#FF6B35]" />
                            Submission Deadline
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <Download size={18} className="text-[#0B3D91]" />
                            Tender File
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Download size={18} className="text-[#FF6B35]" />
                            BOQ File
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#0F0F0F] divide-y divide-[#2A2A2A]">
                      {tenders.map((tender, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
                          className="hover:bg-white/5 transition-all duration-200 group"
                        >
                          <td className="px-6 py-5 whitespace-nowrap text-base font-semibold text-[#FF6B35] border-r border-[#2A2A2A]">
                            {index + 1}
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A]">
                            <div className="text-base font-semibold text-white">
                              {tender["tender no."] ||
                                tender["tender no"] ||
                                "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A] max-w-md">
                            <div className="text-base text-[#E5E5E5] leading-relaxed">
                              {tender["tender description"] ||
                                tender.description ||
                                "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A]">
                            <div className="text-base text-[#E5E5E5]">
                              {tender["submission deadline"] ||
                                tender.deadline ||
                                "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A]">
                            {tender["tender file (drive link)"] ||
                            tender["tender file"] ? (
                              <a
                                href={
                                  tender["tender file (drive link)"] ||
                                  tender["tender file"]
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/20 hover:bg-[#FF6B35]/30 text-[#FF6B35] border border-[#FF6B35]/30 rounded-lg transition-all duration-200 text-sm font-medium"
                              >
                                <Download size={16} />
                                Click Here
                              </a>
                            ) : (
                              <span className="text-[#E5E5E5]/40 text-sm">
                                N/A
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            {tender["boq file (drive link)"] ||
                            tender["boq file"] ? (
                              <a
                                href={
                                  tender["boq file (drive link)"] ||
                                  tender["boq file"]
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B3D91]/20 hover:bg-[#0B3D91]/30 text-[#0B3D91] border border-[#0B3D91]/30 rounded-lg transition-all duration-200 text-sm font-medium"
                              >
                                <Download size={16} />
                                Click Here
                              </a>
                            ) : (
                              <span className="text-[#E5E5E5]/40 text-sm">
                                N/A
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

