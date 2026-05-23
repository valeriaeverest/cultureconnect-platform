import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { vendors } from "../lib/data";
import { Star, MapPin, DollarSign, Calendar, ArrowLeft, Check } from "lucide-react";

export const Route = createFileRoute("/vendors/$vendorId")({
  component: VendorDetailPage,
});

function VendorDetailPage() {
  const { vendorId } = Route.useParams();
  const vendor = vendors.find((v) => v.id === vendorId);
  const [bookingRequested, setBookingRequested] = useState(false);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="pt-24 px-4 text-center">
          <h1 className="text-3xl font-serif text-ink">Vendor not found</h1>
          <Link to="/vendors" className="text-terracotta font-sans text-sm mt-4 inline-block">
            &larr; Back to vendors
          </Link>
        </main>
      </div>
    );
  }

  // Generate mock availability calendar for next 30 days
  const today = new Date();
  const calendarDays = Array.from({ length: 28 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      date,
      available: Math.random() > 0.3, // 70% availability
    };
  });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        <Link
          to="/vendors"
          className="inline-flex items-center gap-1 text-sm text-warm-gray font-sans hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to vendors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-border mb-6">
              <img
                src={vendor.image_url}
                alt={vendor.name}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            <h1 className="text-4xl font-serif text-ink mb-2">{vendor.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block text-xs font-medium bg-muted text-warm-gray px-3 py-1 rounded-full">
                {vendor.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-warm-gray font-sans">
                <MapPin className="w-4 h-4" /> {vendor.city}
              </span>
              <span className="flex items-center gap-1 text-sm text-warm-gray font-sans">
                <Star className="w-4 h-4 text-terracotta fill-terracotta" /> {vendor.rating}
              </span>
            </div>

            <p className="text-base text-ink/80 font-sans leading-relaxed mb-8">
              {vendor.description}
            </p>

            {/* Pricing */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h3 className="font-sans font-semibold text-ink text-base mb-3">Pricing</h3>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-terracotta" />
                <span className="text-lg font-sans text-ink">
                  ${vendor.price_min.toLocaleString()} — ${vendor.price_max.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-warm-gray font-sans mt-2">
                Final pricing depends on event size, duration, and specific requirements.
              </p>
            </div>

            {/* Availability Calendar */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-sans font-semibold text-ink text-base mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-terracotta" /> Availability
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs text-warm-gray font-sans font-medium">
                    {day}
                  </div>
                ))}
                {/* Offset for starting day */}
                {Array.from({ length: today.getDay() }, (_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`text-center text-xs font-sans py-2 rounded-lg ${
                      day.available
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-400 border border-red-100"
                    }`}
                  >
                    {day.date.getDate()}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs font-sans text-warm-gray">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-green-50 border border-green-200" /> Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-red-50 border border-red-100" /> Booked
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
              <h3 className="font-sans font-semibold text-ink text-lg mb-2">
                Book {vendor.name}
              </h3>
              <p className="text-sm text-warm-gray font-sans mb-6">
                Request a booking and our team will confirm availability within 24 hours.
              </p>

              {bookingRequested ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-sans text-ink font-medium">Request sent!</p>
                  <p className="text-xs text-warm-gray font-sans mt-1">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setBookingRequested(true)}
                  className="w-full rounded-full bg-terracotta py-3 text-sm font-medium text-white transition-colors hover:bg-[#A8401F]"
                >
                  Request booking
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Category</span>
                  <span className="text-ink">{vendor.category}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Rating</span>
                  <span className="text-ink">{vendor.rating} / 5.0</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Status</span>
                  <span className={vendor.available ? "text-green-700" : "text-red-600"}>
                    {vendor.available ? "Available" : "Currently booked"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Price range</span>
                  <span className="text-ink">
                    ${vendor.price_min.toLocaleString()}–${vendor.price_max.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
