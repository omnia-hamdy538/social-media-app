import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Component/ui/Navbar";
import { Instagram, Youtube, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function FeedPage() {
const stories = [
  {
    id: 1,
    name: "Asmaa M.",
    role: "UI Designer @Rollio",
    img: "/src/assets/sections/card1.jpg",
    text:
      "My experience with the UI/UX training on Forsaty platform was really helpful and straightforward. I learned the basics of design, user flows, wireframes, UI principles, and how to use Figma effectively. Big thanks to Forsaty for making it easy to find the right training quickly, and thanks to the company and the training team for their support.",
  },
  {
    id: 2,
    name: "Mohammed A.",
    role: "Machine Learning @Youth",
    img: "/src/assets/sections/card2.jpg",
    text:
      "My experience with the UI/UX training on Forsaty platform was really helpful and straightforward. I learned the basics of design, user flows, wireframes, UI principles, and how to use Figma effectively. Big thanks to Forsaty for making it easy to find the right training quickly, and thanks to the company and the training team for their support.",
  },
  {
    id: 3,
    name: "Noor A.",
    role: "Flutter Developer @Boo",
    img: "/src/assets/sections/card3.jpg",
    text:
      "My experience with the UI/UX training on Forsaty platform was really helpful and straightforward. I learned the basics of design, user flows, wireframes, UI principles, and how to use Figma effectively. Big thanks to Forsaty for making it easy to find the right training quickly, and thanks to the company and the training team for their support.",
  },
  {
    id: 4,
    name: "Ahmed S.",
    role: "Backend Developer @TechX",
    img: "/src/assets/sections/card1.jpg",
    text:
           "My experience with the UI/UX training on Forsaty platform was really helpful and straightforward. I learned the basics of design, user flows, wireframes, UI principles, and how to use Figma effectively. Big thanks to Forsaty for making it easy to find the right training quickly, and thanks to the company and the training team for their support.",
  },
  {
    id: 5,
    name: "Sara K.",
    role: "Frontend Developer @Designo",
    img: "/src/assets/sections/card1.jpg",
    text:
           "My experience with the UI/UX training on Forsaty platform was really helpful and straightforward. I learned the basics of design, user flows, wireframes, UI principles, and how to use Figma effectively. Big thanks to Forsaty for making it easy to find the right training quickly, and thanks to the company and the training team for their support.",
  },
  {
    id: 6,
    name: "Sara K.",
    role: "Frontend Developer @Designo",
    img: "/src/assets/sections/card1.jpg",
    text:
          "My experience with the UI/UX training on Forsaty platform was really helpful and straightforward. I learned the basics of design, user flows, wireframes, UI principles, and how to use Figma effectively. Big thanks to Forsaty for making it easy to find the right training quickly, and thanks to the company and the training team for their support.",
  },

];

  return (
    <div className="w-full min-h-screen bg-white">

      {/* Navbar */}
    <Navbar variant="landing" />


      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            <span className="dark-blue">Start</span> Your <br />
            Learning Journey <br />
            with <span className="dark-blue">Forsaty.</span>
          </h1>

          <p className="text-gray-600 mt-4 text-base md:text-lg">
            A platform offering training programs to help you build your professional and academic skills
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <button className="px-6 py-3 border-2 border-all rounded-md hover:bg-blue-50 transition">
              Browse Trains
            </button>

            <button className="px-6 py-3 border-2 border-all rounded-md hover:bg-blue-50 transition">
              Post Trains
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="/src/assets/sections/hero.jpg"
            alt="Learning Illustration"
            className="w-[300px] sm:w-[400px] md:w-[500px]"
          />
        </div>
      </section>






{/* Real Stories Section */}

<section className="w-full px-6 md:px-16 py-16 bg-white text-center">

  <h2 className="text-3xl font-bold">Real Stories from Our Achievement</h2>
  <p className="text-gray-500 mt-2">Grow Today</p>

  <div className="mt-12">
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={3}
      slidesPerGroup={1}
      pagination={{ clickable: true }}
      navigation={false}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-20 custom-swiper"
    >
      {stories.map((story) => (
        <SwiperSlide key={story.id}>
          <div className="border rounded-2xl p-6 shadow-sm h-full max-w-[350px] mx-auto">
            
            <div className="flex justify-center mb-4">
              <img
                src={story.img}
                alt={story.name}
                className="w-16 h-16 rounded-full"
              />
            </div>

            <h3 className="font-bold">{story.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{story.role}</p>

            <p className="text-gray-600 text-sm">
              “{story.text}”
            </p>

            <div className="flex justify-center mt-4 text-yellow-400 text-lg">
              ★★★★★
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>






{/* Project Categories Section */}
<section className="w-full px-6 md:px-16 py-20 bg-gray-50">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold">Trending Opportunities</h2>
    <p className="text-gray-500 mt-2">
      Specialized tracks connecting students, companies, and university supervision
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Card 1 */}
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">AI & Data Science</h3>
      <p className="text-gray-600 text-sm mb-4">
        Machine learning, data analysis, and intelligent systems projects supervised by the university.
      </p>
      <span className="text-sm text-blue-600 font-medium">120+ Internships</span>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">Frontend Development</h3>
      <p className="text-gray-600 text-sm mb-4">
        UI/UX design, React, responsive web interfaces, and modern frontend tools.
      </p>
      <span className="text-sm text-blue-600 font-medium">200+ Internships</span>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">Backend Development</h3>
      <p className="text-gray-600 text-sm mb-4">
        APIs, databases, authentication, and scalable backend systems.
      </p>
      <span className="text-sm text-blue-600 font-medium">180+ Internships</span>
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">Full Stack</h3>
      <p className="text-gray-600 text-sm mb-4">
        End-to-end applications linking students with real company needs.
      </p>
      <span className="text-sm text-blue-600 font-medium">150+ Internships</span>
    </div>

    {/* Card 5 */}
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">Cyber Security</h3>
      <p className="text-gray-600 text-sm mb-4">
        Security fundamentals, system protection, and risk awareness projects.
      </p>
      <span className="text-sm text-blue-600 font-medium">90+ Internships</span>
    </div>

    {/* Card 6 */}
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">Cloud & Databases</h3>
      <p className="text-gray-600 text-sm mb-4">
        Cloud deployment, database design, and performance optimization.
      </p>
      <span className="text-sm text-blue-600 font-medium">110+ Internships</span>
    </div>

  </div>
</section>


{/* Why Us Section */}
<section className="w-full px-6 md:px-16 py-20 bg-white flex flex-col md:flex-row items-center justify-between gap-12">

  {/* Left Image */}
  <div className="relative flex justify-center w-full md:w-1/2">
    <div className="absolute bg-green-300 rounded-[40px] w-[300px] h-[360px] md:w-[350px] md:h-[420px] -z-10"></div>

    <img
      src="/src/assets/sections/landing.png"
      alt="Why Us"
      className=" w-[260px] md:w-[300px] relative"
    />
  </div>

  {/* Right Content */}
  <div className="w-full md:w-1/2">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Us?</h2>

    <div className="space-y-4">

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>Verified opportunities you can trust.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>Simple, fast, and user-friendly platform.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>Personalized guidance through every step.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>Skill-building resources to boost your future.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>Strong partnerships that open real doors.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>We connect you with real, trusted opportunities.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>Our platform is built to be fast, simple, and intuitive.</p>
      </div>

      <div className="flex items-start gap-3">
        <img src="/src/assets/general/checkmark.png" alt="Check" className="w-5 h-5 mt-1" />
        <p>We support you from discovery to success.</p>
      </div>

    </div>
  </div>

</section>






      {/* How It Works Section */}
      <section className="w-full px-6 md:px-16 py-16 bg-white">
        
            
       


        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Left Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/src/assets/sections/How_It-Works_img1.png"
              alt="How it works illustration"
              className="w-[280px] sm:w-[350px] md:w-[420px]"
            />
          </div>

          {/* Right Steps */}
          <div className="w-full md:w-1/2 flex flex-col">
             <h2 className="text-2xl md:text-3xl ms-5 font-bold mb-6"> How It Works</h2>
            {/* Step 1 */}
            <div className="flex items-start ">
              <img src="/src/assets/icons/star.png" alt="star" className="w-24 " />
              <div>
                <h3 className="font-bold text-lg">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up as a candidate or a Trainer—it's quick and free.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start ">
              <img src="/src/assets/icons/star.png" alt="star" className="w-24" />
              <div>
                <h3 className="font-bold text-lg">Explore & Enroll</h3>
                <p className="text-gray-600">
                  Browse courses, workshops, and training programs by category or skill.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start ">
              <img src="/src/assets/icons/star.png" alt="star" className="w-24" />
              <div>
                <h3 className="font-bold text-lg">Learn & Track Progress</h3>
                <p className="text-gray-600">
                  Access content online, complete assignments, and monitor your learning journey.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start ">
              <img src="/src/assets/icons/star.png" alt="star" className="w-24" />
              <div>
                <h3 className="font-bold text-lg">Certify & Apply Skills</h3>
                <p className="text-gray-600">
                  Earn certificates and showcase skills to potential employers or personal projects.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>






{/* Footer Section */}
<footer className="w-full bg-gradient-to-r bg-dark-dark-blue text-white px-6 md:px-16 py-10">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

    {/* Logo and Copyright */}
    <div className="flex flex-col items-start md:items-start gap-4">
      
      <p className="text-sm text-gray-200">Copyright © 2025 J <br /> All rights reserved</p>
      <img src="/src/assets/logos/logo.png" alt="Orsaty Logo" className="w-32" />
    </div>

    {/* Links Section */}
    <div className="flex flex-col md:flex-row gap-16">
      
      {/* Company Links */}
      <div>
        <h3 className="font-semibold mb-3">Company</h3>
        <ul className="space-y-2 text-sm text-gray-200">
          <li>About us</li>
          <li>Services</li>
          <li>Pricing</li>
          <li>Contact us</li>
        </ul>
      </div>

      {/* Support Links */}
      <div>
        <h3 className="font-semibold mb-3">Support</h3>
        <ul className="space-y-2 text-sm text-gray-200">
          <li>Help center</li>
          <li>Terms of service</li>
          <li>Legal</li>
          <li>Privacy policy</li>
          <li>Status</li>
        </ul>
      </div>

      {/* Legal Links */}
      <div>
        <h3 className="font-semibold mb-3">Legal</h3>
        <ul className="space-y-2 text-sm text-gray-200">
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
        </ul>
      </div>

    </div>



{/* Social Icons */}
<div className="flex items-start gap-4 mt-4 md:mt-0 text-white text-xl ">
  <div className="rounded-full bg-dark-blue   p-1"><Instagram className="w-6 h-6 cursor-pointer" /></div>
  
  <div className="rounded-full bg-dark-blue   p-1"><Youtube className="w-6 h-6 cursor-pointer" /></div>
  
  <div className="rounded-full bg-dark-blue   p-1">  <X className="w-6 h-6 cursor-pointer" /></div>
  
  

</div>




  </div>
</footer>






    </div>
  );
}
