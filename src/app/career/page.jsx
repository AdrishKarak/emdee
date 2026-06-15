"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  Briefcase,
  MapPin,
  FileText,
  Clock,
  GraduationCap,
} from "lucide-react";
import { motion } from "motion/react";

export function meta() {
  return [
    { title: "Careers - Join Our Team | Emdee Techno Services" },
    { name: "description", content: "Explore career opportunities at Emdee Techno Services. Join our innovative team and grow your career in IT solutions and services." },
    { property: "og:title", content: "Careers - Join Our Team | Emdee Techno Services" },
    { property: "og:description", content: "Explore career opportunities at Emdee Techno Services. Join our innovative team and grow your career in IT solutions." },
    { property: "og:url", content: "https://emdee.in/career" }
  ];
}

export default function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const sheetId = "18cd8GBrnENApfxqY1iPDzJ4Gp3BBVs3CClnHpcmt1Sg";
      const apiKey = "AIzaSyBIspuLnJwjCgq2yLLVritJriEO0eY5wTs";

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:Z?key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data.values || data.values.length === 0) {
        setJobs([]);
        setLoading(false);
        return;
      }

      // First row is headers
      const [headers, ...rows] = data.values;

      // Convert to array of objects
      const allJobs = rows.map((row, index) => {
        const job = { rowIndex: index };
        headers.forEach((header, colIndex) => {
          const key = header.toLowerCase().trim();
          job[key] = row[colIndex] || "";
        });
        return job;
      });

      // Filter for Active jobs only
      const activeJobs = allJobs.filter((job) => {
        const status = (job["status (active/inactive)"] || job.status || "")
          .toString()
          .toLowerCase()
          .trim();
        return status === "active";
      });

      setJobs(activeJobs);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
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
              Join Our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-xl lg:text-2xl text-[#E5E5E5] max-w-xl mx-auto leading-relaxed"
            >
              Explore career opportunities and become part of our mission to
              power a Digital India
            </motion.p>
          </div>
        </div>

        {/* Jobs Table Section */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-24">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[#E5E5E5] text-lg">
                  Loading opportunities...
                </p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center"
            >
              <p className="text-red-400 text-lg">
                Error loading jobs: {error}
              </p>
              <button
                onClick={fetchJobs}
                className="mt-4 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200"
              >
                Retry
              </button>
            </motion.div>
          ) : jobs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-12 text-center"
            >
              <Briefcase className="w-16 h-16 text-[#FF6B35] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No Open Positions
              </h3>
              <p className="text-[#E5E5E5] text-lg">
                There are no active job openings at the moment. Please check
                back later!
              </p>
              <p className="text-[#E5E5E5]/60 text-sm mt-8">
                Get in touch: hr.support@emdee.in
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
                            <Briefcase size={18} className="text-[#FF6B35]" />
                            Job Title
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-[#0B3D91]" />
                            Location(s)
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <FileText size={18} className="text-[#FF6B35]" />
                            Job Description
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider border-r border-[#2A2A2A]">
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-[#0B3D91]" />
                            Job Type
                          </div>
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <GraduationCap
                              size={18}
                              className="text-[#FF6B35]"
                            />
                            Minimum Qualifications
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#0F0F0F] divide-y divide-[#2A2A2A]">
                      {jobs.map((job, index) => (
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
                            <div className="text-base font-semibold text-white group-hover:text-[#FF6B35] transition-colors duration-200">
                              {job.ttile ||
                                job["job title"] ||
                                job.title ||
                                "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A]">
                            <div className="text-base text-[#E5E5E5]">
                              {job["location(s)"] || job.location || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A] max-w-md">
                            <div className="text-base text-[#E5E5E5] leading-relaxed">
                              {job.description ||
                                job["job description"] ||
                                "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r border-[#2A2A2A]">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0B3D91]/20 text-[#0B3D91] border border-[#0B3D91]/30">
                              {job["job type"] || job.type || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-5 max-w-md">
                            <div className="text-base text-[#E5E5E5] leading-relaxed">
                              {job["minimum qualifications"] ||
                                job.qualifications ||
                                "N/A"}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom CTA */}
          {!loading && !error && jobs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-12 text-center"
            >
              <p className="text-lg text-[#E5E5E5] mb-2">
                Send your resume and application below
              </p>
              <p className="text-sm text-[#E5E5E5]/60 mb-6">
                Don't see the right fit? Get in touch to explore more about
                careers@EMDEE.
              </p>
              <a
                href="mailto:hr.support@emdee.in"
                className="inline-block px-8 py-3.5 text-base font-semibold bg-gradient-to-b from-[#FF6B35] to-[#E55A28] text-white rounded-lg hover:from-[#FF7A45] hover:to-[#F56838] transition-all duration-200 active:scale-95"
              >
                Apply
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

