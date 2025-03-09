import React, { useEffect, useState } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Diego Furlan",
      location: "Barcelona",
      quote:
        "CityCab is my favorite taxi company ever! Cool drivers, amazing cars, top notch services! You won't believe it, but they actually didn't took any tip 😃",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Samantha Jones",
      location: "Vienna",
      quote:
        "CityCab is my favorite taxi company ever! Cool drivers, amazing cars, top notch services! You won't believe it, but they actually didn't took any tip 😃",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      name: "Michael Chen",
      location: "Singapore",
      quote:
        "The drivers are always on time and very professional. The app makes booking so easy. Definitely recommend CityCab for all your transportation needs!",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 4,
      name: "Emma Wilson",
      location: "London",
      quote:
        "I use CityCab weekly for my commute. The service is reliable and the cars are always clean. The drivers are friendly and make the journey enjoyable.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTestimonials, setActiveTestimonials] = useState(
    testimonials.slice(0, 2)
  );

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
    // Update visible testimonials (showing 2 at a time)
    if (window.innerWidth >= 768) {
      const secondIndex = (newIndex + 1) % testimonials.length;
      setActiveTestimonials([
        testimonials[newIndex],
        testimonials[secondIndex],
      ]);
    } else {
      setActiveTestimonials([testimonials[newIndex]]);
    }
  };

  const prevSlide = () => {
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    // Update visible testimonials (showing 2 at a time)
    if (window.innerWidth >= 768) {
      const secondIndex = (newIndex + 1) % testimonials.length;
      setActiveTestimonials([
        testimonials[newIndex],
        testimonials[secondIndex],
      ]);
    } else {
      setActiveTestimonials([testimonials[newIndex]]);
    }
  };

  useEffect(() => {
    // Initialize with 1 or 2 testimonials based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        const secondIndex = (currentIndex + 1) % testimonials.length;
        setActiveTestimonials([
          testimonials[currentIndex],
          testimonials[secondIndex],
        ]);
      } else {
        setActiveTestimonials([testimonials[currentIndex]]);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, testimonials]);

  return (
    <section className="w-full py-16 bg-blue-200 relative overflow-hidden">
      {/* Background images grid (faded) */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(/src/assets/Testimonial_img1.jpg)`,
            }}
          ></div>
        ))}
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 relative text-blue-950">
          Testimonials
          <div className="w-24 h-1 bg-blue-900 mx-auto mt-4"></div>
        </h2>
        <div className="relative">
          <div className="flex justify-center gap-6 mb-8 flex-wrap md:flex-nowrap">
            {activeTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                quote={testimonial.quote}
                image={testimonial.image}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};