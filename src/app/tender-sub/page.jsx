"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useUpload } from "@/utils/useUpload";
import { motion } from "motion/react";

export function meta() {
  return [
    { title: "Tender Submission | Emdee Techno Services" },
    { name: "description", content: "Submit your tender response and bid documents securely online." }
  ];
}

const schema = yup.object({
  vendorName: yup.string().required("Vendor Name is required"),
  vendorAddress: yup.string().required("Vendor Address is required"),
  contactNo: yup.string().required("Contact No is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  tenderNo: yup.string().required("Please select a tender"),
});

export default function TenderSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [tenders, setTenders] = useState([]);
  const [loadingTenders, setLoadingTenders] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [upload] = useUpload();

  const [files, setFiles] = useState({
    tenderFile: null,
    boqFile: null,
  });

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      setLoadingTenders(true);
      const sheetId = "11A1knFF9DwHUHamS89XwqiJRAgSdJRCg3fic0GOQ4vY";
      const apiKey = "AIzaSyBIspuLnJwjCgq2yLLVritJriEO0eY5wTs";

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:Z?key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tenders");
      }

      const data = await response.json();

      if (!data.values || data.values.length === 0) {
        setTenders([]);
        setLoadingTenders(false);
        return;
      }

      const [headers, ...rows] = data.values;

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
    } catch (err) {
      console.error("Error fetching tenders:", err);
      setTenders([]);
    } finally {
      setLoadingTenders(false);
    }
  };

  const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Starting tender submission...");

      // Upload files
      console.log("Uploading files...");
      const uploadedFiles = {};

      for (const [key, file] of Object.entries(files)) {
        if (file) {
          console.log(`Uploading ${key}...`);
          const result = await upload({ file });
          if (result.error) {
            throw new Error(`Failed to upload ${key}: ${result.error}`);
          }
          uploadedFiles[key] = result.url;
        }
      }

      // Check if all required files are uploaded
      if (!uploadedFiles.tenderFile || !uploadedFiles.boqFile) {
        setSubmitStatus({
          type: "error",
          message: "Please upload both Tender File and BOQ File",
        });
        setIsSubmitting(false);
        return;
      }

      // Submit form data
      const formData = {
        ...data,
        files: uploadedFiles,
      };

      console.log("Submitting tender data to backend...");
      const response = await fetch("/api/tenders/submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit tender");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Tender submitted successfully! We'll review your submission and contact you soon.",
      });

      // Reset form
      reset();
      setFiles({
        tenderFile: null,
        boqFile: null,
      });
    } catch (error) {
      console.error("Error submitting tender:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit tender. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-qanelas-soft relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0B3D91]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF6B35]/5 blur-[120px] pointer-events-none z-0" />

      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar variant="glass" />
      </div>

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-[#D2691E] bg-clip-text text-transparent mb-4"
            >
              Tender Submission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-[#E5E5E5] text-lg"
            >
              Submit your proposal for active tenders
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-2xl p-8 md:p-10 space-y-8 shadow-2xl"
          >
            {/* Vendor Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Vendor Information
              </h2>

              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">
                  Vendor Name <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  {...register("vendorName")}
                  type="text"
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                  placeholder="Enter vendor name"
                />
                {errors.vendorName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.vendorName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">
                  Vendor Address <span className="text-[#FF6B35]">*</span>
                </label>
                <textarea
                  {...register("vendorAddress")}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                  placeholder="Enter complete address"
                />
                {errors.vendorAddress && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.vendorAddress.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Contact No <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("contactNo")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter contact number"
                  />
                  {errors.contactNo && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.contactNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Email ID <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Tender Selection */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-[#2A2A2A]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Tender Selection
              </h2>

              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">
                  Tender No <span className="text-[#FF6B35]">*</span>
                </label>
                {loadingTenders ? (
                  <div className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-[#808080] flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin"></div>
                    Loading tenders...
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      {...register("tenderNo")}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-[#808080]">
                        {tenders.length === 0
                          ? "No tenders are currently open"
                          : "Select a tender"}
                      </option>
                      {tenders.map((tender, index) => (
                        <option
                          key={index}
                          value={
                            tender["tender no."] || tender["tender no"] || ""
                          }
                          className="bg-[#1A1A1A] text-white"
                        >
                          {tender["tender no."] || tender["tender no"]} -{" "}
                          {tender["tender description"] ||
                            tender.description ||
                            ""}
                        </option>
                      ))}
                    </select>
                    <FileText
                      size={20}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF6B35] pointer-events-none"
                    />
                  </div>
                )}
                {errors.tenderNo && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.tenderNo.message}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Document Uploads */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-[#2A2A2A]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Document Uploads
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <FileUploadField
                  label="Upload Tender File"
                  fileName={files.tenderFile?.name}
                  onChange={(e) => handleFileChange("tenderFile", e)}
                />
                <FileUploadField
                  label="Upload BOQ File"
                  fileName={files.boqFile?.name}
                  onChange={(e) => handleFileChange("boqFile", e)}
                />
              </div>
            </motion.div>

            {/* Status Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus.type === "success"
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <AlertCircle className="text-red-500" size={24} />
                )}
                <p
                  className={
                    submitStatus.type === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {submitStatus.message}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting || tenders.length === 0}
              className="w-full py-4 bg-gradient-to-b from-[#FF6B35] to-[#E55A28] text-white font-semibold text-lg rounded-lg hover:from-[#FF7A45] hover:to-[#F56838] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Tender"}
            </motion.button>

            {tenders.length === 0 && !loadingTenders && (
              <p className="text-center text-[#808080] text-sm">
                No active tenders available at the moment. Please check back
                later.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
}

function FileUploadField({ label, fileName, onChange }) {
  return (
    <div>
      <label className="block text-[#E5E5E5] mb-2 font-medium">
        {label} <span className="text-[#FF6B35]">*</span>
      </label>
      <label className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white hover:border-[#FF6B35] transition-colors cursor-pointer flex items-center justify-between">
        <span className={fileName ? "text-white" : "text-[#808080]"}>
          {fileName || "Choose file"}
        </span>
        <Upload size={20} className="text-[#FF6B35]" />
        <input type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}

