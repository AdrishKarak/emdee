"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Calendar, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useUpload } from "@/utils/useUpload";
import { motion } from "motion/react";

export function meta() {
  return [
    { title: "Vendor Registration & KYC | Emdee Techno Services" },
    { name: "description", content: "Vendor KYC registration portal for Emdee Techno Services." }
  ];
}

const schema = yup.object({
  vendorName: yup.string().required("Vendor Name is required"),
  vendorAddress: yup.string().required("Vendor Address is required"),
  contactNo: yup.string().required("Contact No is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  businessDescription: yup
    .string()
    .required("Business Description is required"),
  turnover: yup.string().required("Turnover is required"),
  panNo: yup.string().required("PAN No is required"),
  tanNo: yup.string().required("TAN No is required"),
  gstn: yup.string().required("GSTN is required"),
  msme: yup.string().required("MSME is required"),
  bankName: yup.string().required("Bank Name is required"),
  branchName: yup.string().required("Branch Name is required"),
  accountNumber: yup.string().required("Account Number is required"),
  ifscCode: yup.string().required("IFSC Code is required"),
  tradeLicenseNo: yup.string().required("Trade License Number is required"),
  dateOfIssue: yup.date().required("Date of Issue is required").nullable(),
  dateOfExpiry: yup.date().required("Date of Expiry is required").nullable(),
});

export default function VendorsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showIssueDatePicker, setShowIssueDatePicker] = useState(false);
  const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [upload] = useUpload();

  const [files, setFiles] = useState({
    panCard: null,
    gstCertificate: null,
    msmeCertificate: null,
    cancelledCheque: null,
    tradeLicense: null,
  });

  const dateOfIssue = watch("dateOfIssue");
  const dateOfExpiry = watch("dateOfExpiry");

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
      console.log("Starting form submission...");

      // Upload all files
      console.log("Uploading files...");
      const uploadedFiles = {};
      for (const [key, file] of Object.entries(files)) {
        if (file) {
          const result = await upload({ file });
          if (result.error) {
            throw new Error(`Failed to upload ${key}: ${result.error}`);
          }
          uploadedFiles[key] = result.url;
        }
      }

      // Check if all required files are uploaded
      const requiredFiles = [
        "panCard",
        "gstCertificate",
        "msmeCertificate",
        "cancelledCheque",
        "tradeLicense",
      ];
      const missingFiles = requiredFiles.filter((key) => !uploadedFiles[key]);

      if (missingFiles.length > 0) {
        setSubmitStatus({
          type: "error",
          message: "Please upload all required documents",
        });
        setIsSubmitting(false);
        return;
      }

      // Submit form data
      const formData = {
        ...data,
        dateOfIssue: data.dateOfIssue
          ? format(data.dateOfIssue, "dd/MM/yyyy")
          : "",
        dateOfExpiry: data.dateOfExpiry
          ? format(data.dateOfExpiry, "dd/MM/yyyy")
          : "",
        files: uploadedFiles,
      };

      console.log("Submitting form data to backend...");
      const response = await fetch("/api/vendors/kyc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }

      setSubmitStatus({
        type: "success",
        message: "KYC form submitted successfully! We'll contact you soon.",
      });

      // Reset form
      reset();
      setFiles({
        panCard: null,
        gstCertificate: null,
        msmeCertificate: null,
        cancelledCheque: null,
        tradeLicense: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit form. Please try again.",
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
              Vendor KYC
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-[#E5E5E5] text-lg"
            >
              Please fill in all required information to register as a vendor
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

              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">
                  Business Description (list and brief description of key
                  goods/services provided){" "}
                  <span className="text-[#FF6B35]">*</span>
                </label>
                <textarea
                  {...register("businessDescription")}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                  placeholder="Enter business description and key goods/services provided"
                />
                {errors.businessDescription && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.businessDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">
                  Turnover (last FY | from above mentioned key business lines){" "}
                  <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  {...register("turnover")}
                  type="text"
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                  placeholder="Enter turnover amount"
                />
                {errors.turnover && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.turnover.message}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Tax Information */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-[#2A2A2A]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Tax Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    PAN No <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("panNo")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter PAN number"
                  />
                  {errors.panNo && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.panNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    TAN No <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("tanNo")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter TAN number"
                  />
                  {errors.tanNo && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.tanNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    GSTN <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("gstn")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter GST number"
                  />
                  {errors.gstn && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.gstn.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    MSME <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("msme")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter MSME number"
                  />
                  {errors.msme && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.msme.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Bank Account Details */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-[#2A2A2A]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Bank A/C Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Bank Name <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("bankName")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter bank name"
                  />
                  {errors.bankName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.bankName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Branch Name <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("branchName")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter branch name"
                  />
                  {errors.branchName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.branchName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Account Number <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("accountNumber")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter account number"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.accountNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    IFSC Code <span className="text-[#FF6B35]">*</span>
                  </label>
                  <input
                    {...register("ifscCode")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Enter IFSC code"
                  />
                  {errors.ifscCode && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.ifscCode.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Trade License Details */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-[#2A2A2A]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Trade License Details
              </h2>

              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">
                  Trade License Number <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  {...register("tradeLicenseNo")}
                  type="text"
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                  placeholder="Enter trade license number"
                />
                {errors.tradeLicenseNo && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.tradeLicenseNo.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Date of Issue <span className="text-[#FF6B35]">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowIssueDatePicker(!showIssueDatePicker)
                      }
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors flex items-center justify-between"
                    >
                      <span>
                        {dateOfIssue
                          ? format(dateOfIssue, "dd/MM/yyyy")
                          : "Select date"}
                      </span>
                      <Calendar size={20} className="text-[#FF6B35]" />
                    </button>
                    {showIssueDatePicker && (
                      <div className="absolute z-50 mt-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 shadow-2xl">
                        <DayPicker
                          mode="single"
                          selected={dateOfIssue}
                          onSelect={(date) => {
                            setValue("dateOfIssue", date);
                            setShowIssueDatePicker(false);
                          }}
                          className="text-white"
                          styles={{
                            day: { color: "#E5E5E5" },
                            day_selected: {
                              backgroundColor: "#FF6B35",
                              color: "white",
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.dateOfIssue && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.dateOfIssue.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E5E5E5] mb-2 font-medium">
                    Date of Expiry <span className="text-[#FF6B35]">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowExpiryDatePicker(!showExpiryDatePicker)
                      }
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:border-[#FF6B35] transition-colors flex items-center justify-between"
                    >
                      <span>
                        {dateOfExpiry
                          ? format(dateOfExpiry, "dd/MM/yyyy")
                          : "Select date"}
                      </span>
                      <Calendar size={20} className="text-[#FF6B35]" />
                    </button>
                    {showExpiryDatePicker && (
                      <div className="absolute z-50 mt-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 shadow-2xl">
                        <DayPicker
                          mode="single"
                          selected={dateOfExpiry}
                          onSelect={(date) => {
                            setValue("dateOfExpiry", date);
                            setShowExpiryDatePicker(false);
                          }}
                          className="text-white"
                          styles={{
                            day: { color: "#E5E5E5" },
                            day_selected: {
                              backgroundColor: "#FF6B35",
                              color: "white",
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.dateOfExpiry && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.dateOfExpiry.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Document Uploads */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-[#2A2A2A]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Document Uploads
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <FileUploadField
                  label="Upload PAN Card"
                  fileName={files.panCard?.name}
                  onChange={(e) => handleFileChange("panCard", e)}
                />
                <FileUploadField
                  label="Upload GST Certificate"
                  fileName={files.gstCertificate?.name}
                  onChange={(e) => handleFileChange("gstCertificate", e)}
                />
                <FileUploadField
                  label="Upload MSME Certificate"
                  fileName={files.msmeCertificate?.name}
                  onChange={(e) => handleFileChange("msmeCertificate", e)}
                />
                <FileUploadField
                  label="Upload Cancelled Cheque"
                  fileName={files.cancelledCheque?.name}
                  onChange={(e) => handleFileChange("cancelledCheque", e)}
                />
                <FileUploadField
                  label="Upload Trade License"
                  fileName={files.tradeLicense?.name}
                  onChange={(e) => handleFileChange("tradeLicense", e)}
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
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-b from-[#FF6B35] to-[#E55A28] text-white font-semibold text-lg rounded-lg hover:from-[#FF7A45] hover:to-[#F56838] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Now"}
            </motion.button>
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

