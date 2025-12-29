import { LOGIN } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { setCredentials } from "@/store/auth/authSlice";
import { setCompanyDetails } from "@/store/auth/companySlice";
import { setUsers } from "@/store/user/userSlice";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import BackgroundSVG from "./background-svg";
import Carousel from "./carousel";
import LoginForm from "./login-form";

const testimonials = [
  {
    image:
      "https://img.freepik.com/free-photo/young-hispanic-woman-pharmacist-smiling-confident-standing-with-arms-crossed-gesture-pharmacy_839833-7087.jpg?w=740",
    title: "Expert Pharmacists",
    description:
      "Our team of certified pharmacists ensures accurate dispensing and professional healthcare guidance.",
  },
  {
    image:
      "https://img.freepik.com/free-photo/warehouse-pharmacy_1161-231.jpg?w=740",
    title: "Wide Range of Medications",
    description:
      "We provide an extensive selection of prescription and over-the-counter medicines for all your health needs.",
  },
  {
    image:
      "https://img.freepik.com/free-vector/tiny-pharmacist-with-pills-vitamins-flat-vector-illustration-doctors-writing-prescriptions-antibiotics-working-together-helping-patients-cure-pharmacy-business-drugstore-concept_74855-23225.jpg?w=740",
    title: "Patient Care & Consultation",
    description:
      "Personalized advice and care for every patient, ensuring safety, proper dosage, and overall well-being.",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/doctor-holding-medicine-capsule-pack-computer-tablet-filling-prescription-pharmacy-drugstore_67340-424.jpg?w=740",
    title: "Digital Prescription Management",
    description:
      "Efficient digital prescription handling ensures accuracy, faster processing, and improved patient safety.",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/clean-organized-pharmacy-interior-with-stocked-shelves_1284935-1894.jpg?w=740",
    title: "Modern & Organized Pharmacy",
    description:
      "A clean, well-organized pharmacy environment ensuring easy access to medicines and a better customer experience.",
  },
];

export default function AuthUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const emailInputRef = useRef(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { trigger: login, loading: isLoading } = useApiMutation();
  const dispatch = useDispatch();
  const loadingMessages = [
    "Setting things up...",
    "Checking credentials...",
    "Preparing dashboard...",
    "Almost there...",
  ];

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate]);

  useEffect(() => {
    if (!isLoading) return;
    let messageIndex = 0;
    setLoadingMessage(loadingMessages[0]);
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 800);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both username and password.");
      return;
    }

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    try {
      const res = await login({
        url: LOGIN.postLogin,
        method: "post",
        data: formData,
      });
      if (res?.code === 200) {
        const { UserInfo, version, year } = res;

        if (!UserInfo || !UserInfo.token) {
          toast.error("Login Failed: No token received.");
          return;
        }

        dispatch(
          setCredentials({
            token: UserInfo.token,
            user: UserInfo.user,
            version: version?.version_panel,
            currentYear: year?.current_year,
            tokenExpireAt: UserInfo.token_expires_at,
          })
        );
        dispatch(setUsers(res.userN));
        dispatch(setCompanyDetails(res?.company_detils));
      } else {
        toast.error(res.msg || "Login Failed: Unexpected response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleCarouselChange = (direction) => {
    setAutoRotate(false);
    if (direction === "left") {
      setTestimonialIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    } else {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }
    setTimeout(() => setAutoRotate(true), 8000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      <BackgroundSVG />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-6xl w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            emailInputRef={emailInputRef}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
          />

          <Carousel
            testimonials={testimonials}
            testimonialIndex={testimonialIndex}
            handleCarouselChange={handleCarouselChange}
          />
        </div>
      </motion.div>
    </div>
  );
}
