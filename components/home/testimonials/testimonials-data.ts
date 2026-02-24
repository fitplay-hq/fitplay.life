export const testimonials = [
  {
    id: "sarthak",
    name: "Sarthak",
    role: "Fitness Enthusiast",
    videoSrc: "/testimonials/sarthak-sorax.mp4",
  },
  {
    id: "bala",
    name: "Bala Sarda",
    role: "Founder, Vahdam Teas",
    videoSrc: "/testimonials/bala-sarda-2.mp4",
  },
  {
    id: "anupriya",
    name: "Dr. Anupriya Goel",
    role: "Dermatologist",
    videoSrc: "/testimonials/anupriya-goel-3.mp4",
  },
  {
    id: "shweta",
    name: "Shweta Mathur",
    role: "Digital Creator",
    videoSrc: "/testimonials/shweta-mathur-4.mp4",
  },
];

export type Testimonial = (typeof testimonials)[0];
