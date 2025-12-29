// import React, { useState } from "react";
// import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
// import { Button } from "../ui/button";
// import api from "@/api";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { setCredentials } from "@/store/auth/authSlice";
// import { setCompanyDetails } from "@/store/auth/companySlice";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, LogIn } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/effect-fade";
// import { Autoplay, EffectFade } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// export default function AuthUI() {
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   const testimonials = [
//     {
//       quote:
//         "AIA provided me with comprehensive study material that helped me secure international certifications. The faculty guidance was invaluable!",
//       author: "Mas Parjono",
//       role: "Certified Auditor",
//     },
//     {
//       quote:
//         "With AIA's practical approach, I not only obtained certifications but learned real-world applications. Highly professional!",
//       author: "Sarah Chen",
//       role: "Internal Audit Manager",
//     },
//     {
//       quote:
//         "15 years of excellence in education. AIA truly helps you grow professionally!",
//       author: "Alex Rodriguez",
//       role: "Senior Compliance Officer",
//     },
//   ];

//   const current = testimonials[testimonialIndex];

//   const handleNextTestimonial = () => {
//     setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const handlePrevTestimonial = () => {
//     setTestimonialIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loadingMessage, setLoadingMessage] = useState("");
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const emailInputRef = useRef(null);
//   const loadingMessages = [
//     "Setting things up for you...",
//     "Checking your credentials...",
//     "Preparing your dashboard...",
//     "Almost there...",
//   ];

//   useEffect(() => {
//     if (emailInputRef.current) {
//       emailInputRef.current.focus();
//     }
//   }, []);

//   useEffect(() => {
//     let messageIndex = 0;
//     let intervalId;

//     if (isLoading) {
//       setLoadingMessage(loadingMessages[0]);
//       intervalId = setInterval(() => {
//         messageIndex = (messageIndex + 1) % loadingMessages.length;
//         setLoadingMessage(loadingMessages[messageIndex]);
//       }, 800);
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [isLoading]);

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && !isLoading) {
//       handleSubmit(event);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.error("Please enter both username and password.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("username", email);
//     formData.append("password", password);
//     setIsLoading(true);
//     try {
//       const res = await api.auth.login(formData);

//       if (res?.data?.code === 200) {
//         const { UserInfo, version, year } = res?.data;

//         if (!UserInfo || !UserInfo.token) {
//           toast.error("Login Failed: No token received.");
//           return;
//         }

//         dispatch(
//           setCredentials({
//             token: UserInfo.token,
//             user: UserInfo.user,
//             version: version?.version_panel,
//             currentYear: year?.current_year,
//             tokenExpireAt: UserInfo.token_expires_at,
//           })
//         );
//         dispatch(setCompanyDetails(res.company_details));

//         navigate("/home", { replace: true });
//       } else {
//         toast.error(res.message || "Login Failed: Unexpected response.");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//       setIsLoading(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #ddd6fe 100%)",
//       }}
//     >
//       {/* Subtle grid overlay */}
//       <div
//         className="absolute inset-0 opacity-5 pointer-events-none"
//         style={{
//           backgroundImage:
//             "linear-gradient(0deg, transparent 24%, rgba(59,130,246,.05) 25%, rgba(59,130,246,.05) 26%, transparent 27%, transparent 74%, rgba(59,130,246,.05) 75%, rgba(59,130,246,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59,130,246,.05) 25%, rgba(59,130,246,.05) 26%, transparent 27%, transparent 74%, rgba(59,130,246,.05) 75%, rgba(59,130,246,.05) 26%, transparent 77%, transparent)",
//           backgroundSize: "50px 50px",
//         }}
//       ></div>

//       {/* Main Auth Card */}
//       <div className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl flex flex-col md:flex-row max-w-5xl w-full relative z-10 overflow-hidden">
//         {/* Left Panel - Login Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//           {/* Logo */}
//           <div className="flex items-center gap-1 mb-8">
//             <img src="https://aia.in.net/crm/public/assets/images/logo/new_retina_logos.webp"></img>
//           </div>

//           {/* Heading */}
//           <h1
//             className="text-4xl font-bold mb-2"
//             style={{ color: "hsl(213, 94%, 20%)" }}
//           >
//             Welcome back
//           </h1>
//           <p className="mb-8" style={{ color: "hsl(215, 20%, 60%)" }}>
//             Continue your certification journey with AIA
//           </p>

//           <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
//             <div className="space-y-4 ">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="email"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Username
//                 </Label>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <Input
//                     ref={emailInputRef}
//                     id="email"
//                     type="text"
//                     placeholder="Enter your username"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     minLength={1}
//                     maxLength={50}
//                     required
//                     className="h-10 md:h-11 border-gray-300 focus:border-[var(--color-border)] focus:ring-[var(--color-border)] transition-colors"
//                     autoComplete="username"
//                   />
//                 </motion.div>
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="password"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </Label>
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       minLength={1}
//                       maxLength={16}
//                       className="h-10 md:h-11 pr-10 border-gray-300 focus:border-[var(--color-border)] focus:ring-[var(--color-border)] transition-colors"
//                       autoComplete="current-password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                       tabIndex={-1}
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </motion.div>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Button
//                   type="submit"
//                   className="w-full h-10 md:h-11 bg-gradient-to-r from-[var(--team-color)] to-[var(--color-dark)] hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <motion.span
//                       key={loadingMessage}
//                       initial={{ opacity: 0, y: 5 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -5 }}
//                       className="text-sm"
//                     >
//                       {loadingMessage}
//                     </motion.span>
//                   ) : (
//                     <span className="flex items-center justify-center gap-2">
//                       <LogIn size={16} className="md:size-[18px]" />
//                       Sign In
//                     </span>
//                   )}
//                 </Button>
//               </motion.div>
//             </div>
//           </form>
//         </div>

//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
//           <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
//             <svg viewBox="0 0 100 100" className="w-full h-full">
//               {[...Array(12)].map((_, i) => (
//                 <line
//                   key={i}
//                   x1="50"
//                   y1="50"
//                   x2="50"
//                   y2="5"
//                   stroke="#ffffff"
//                   strokeWidth="1.5"
//                   transform={`rotate(${i * 30} 50 50)`}
//                 />
//               ))}
//             </svg>
//           </div>

//           {/* Testimonial Content */}
//           <div className="relative z-10">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
//               What Our Professionals Say
//             </h2>

//             <div className="mb-8">
//               <p className="text-4xl text-white/30 mb-4">"</p>
//               <p className="text-white/95 leading-relaxed text-lg font-medium">
//                 {current.quote}
//               </p>
//             </div>

//             <div className="mb-8">
//               <p className="text-white font-semibold text-lg">
//                 {current.author}
//               </p>
//               <p className="text-blue-100 text-sm">{current.role}</p>
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex gap-3 relative z-10">
//             <button
//               onClick={handlePrevTestimonial}
//               className="w-12 h-12 rounded-lg text-white flex items-center justify-center transition transform hover:scale-110 active:scale-95 bg-white/20 hover:bg-white/30"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <button
//               onClick={handleNextTestimonial}
//               className="w-12 h-12 rounded-lg text-white flex items-center justify-center transition transform hover:scale-110 active:scale-95"
//               style={{
//                 background: "linear-gradient(135deg, #93c5fd 0%, #c7d2fe 100%)",
//               }}
//             >
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Floating Card */}
//         <div className="fixed bottom-8 right-8 w-72 bg-white rounded-2xl p-6 shadow-2xl z-50">
//           <h3
//             className="font-bold text-lg mb-2"
//             style={{ color: "hsl(213, 94%, 20%)" }}
//           >
//             Master International Certifications
//           </h3>
//           <p className="text-sm mb-4" style={{ color: "hsl(215, 20%, 60%)" }}>
//             Join thousands of professionals. Get certified, grow professionally
//             with AIA's proven study material!
//           </p>
//           <div className="flex gap-2">
//             {[...Array(4)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-8 h-8 rounded-full border-2 border-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #93c5fd 0%, #c7d2fe 100%)",
//                   marginLeft: i > 0 ? "-12px" : "0",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import ImageCell from "@/components/common/ImageCell";
import LoadingBar from "@/components/loader/loading-bar";
import { GALLERYAPI } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { getImageBaseUrl, getNoImageUrl } from "@/utils/imageUtils";
import { Copy } from "lucide-react";
import GalleryEdit from "./gallery-edit";
import { toast } from "sonner";

const GalleryList = () => {
  const { data, isLoading, isError, refetch } = useGetApiMutation({
    url: GALLERYAPI.gallery,
    queryKey: ["gallery"],
  });

  const IMAGE_FOR = "Link Gallery";
  const galleryBaseUrl = getImageBaseUrl(data?.image_url, IMAGE_FOR);
  const noImageUrl = getNoImageUrl(data?.image_url);

  const [copiedId, setCopiedId] = useState(null);

  const handleCopyClipboard = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Link copied");

      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const columns = [
    {
      id: "S. No.",
      header: "S. No.",
      cell: ({ row }) => (
        <div className="text-xs font-medium">{row.index + 1}</div>
      ),
      size: 60,
    },

    {
      header: "Image",
      accessorKey: "gallery_image",
      cell: ({ row }) => {
        const fileName = row.original.gallery_image;

        const src = fileName
          ? `${galleryBaseUrl}${fileName}?t=${Date.now()}`
          : `${noImageUrl}?t=${Date.now()}`;

        return (
          <img src={src} fallback={noImageUrl} alt={`${IMAGE_FOR} Image`} />
        );
      },
      size: 120,
    },

    {
      accessorKey: "gallery_url",
      header: "Gallery Url",
      cell: ({ row }) => {
        const baseUrl = row.original.gallery_url;
        const fileName = row.original.gallery_image;
        const fullUrl = `${baseUrl}${fileName}`;
        const id = row.original.id;

        return (
          <div className="text-xs flex items-center gap-3">
            <span className="truncate max-w-[200px]">{fullUrl}</span>
            <Copy
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCopyClipboard(id, fullUrl);
              }}
              className={`w-4 h-4 cursor-pointer transition-all ${
                copiedId === id ? "text-green-600" : "text-red-600"
              }`}
            />
          </div>
        );
      },
      size: 220,
    },

    {
      header: "Status",
      accessorKey: "gallery_status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.gallery_status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.gallery_status}
        </span>
      ),
      size: 120,
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => <GalleryEdit galleryId={row.original.id} />,
      size: 120,
    },
  ];

  if (isError) {
    return <ApiErrorPage onRetry={refetch} />;
  }

  return (
    <>
      {isLoading && <LoadingBar />}

      <DataTable
        data={data?.data || []}
        columns={columns}
        pageSize={10}
        searchPlaceholder="Search gallery..."
      />
    </>
  );
};

export default GalleryList;
