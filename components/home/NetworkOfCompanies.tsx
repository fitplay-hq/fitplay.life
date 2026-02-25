import React from "react";
import Marquee from "react-fast-marquee";

const partnerCompanies = [
  { name: "Zomato", logo: "https://logo.clearbit.com/zomato.com" },
  { name: "Swiggy", logo: "https://logo.clearbit.com/swiggy.com" },
  { name: "Paytm", logo: "https://logo.clearbit.com/paytm.com" },
  { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com" },
  {
    name: "Ola",
    logo: "https://images.seeklogo.com/logo-png/30/1/ola-logo-png_seeklogo-306525.png",
  },
  { name: "Byju's", logo: "https://logo.clearbit.com/byjus.com" },
  { name: "Razorpay", logo: "https://logo.clearbit.com/razorpay.com" },
  { name: "Freshworks", logo: "https://logo.clearbit.com/freshworks.com" },
];

export default function NetworkOfCompanies() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-gray-600">
            Join the network of companies transforming employee wellness
          </p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <Marquee speed={50} pauseOnHover={true} gradient={false}>
            {partnerCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 mx-4"
              >
                <div className="w-32 h-24 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-32 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-4xl shadow-md">
                            ${company.name.charAt(0).toUpperCase()}
                          </div>`;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
