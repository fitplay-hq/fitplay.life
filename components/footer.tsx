import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 text-sm">
              Transforming corporate wellness with intelligent credit systems
              and premium health solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-primary font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/store"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Wellness Store
                </Link>
              </li>
              <li>
                <Link
                  href="/benefits"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  My Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-primary font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/partner"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  About FitPlay
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-primary font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  support@fitplay.life
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Gurugram, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 FitPlay. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
