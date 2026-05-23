import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { vendors, cities, categories } from "../lib/data";
import { Star, MapPin, DollarSign } from "lucide-react";

export const Route = createFileRoute("/vendors/")({
  component: VendorsPage,
});

function VendorsPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = vendors.filter((v) => {
    if (selectedCity && v.city !== selectedCity) return false;
    if (selectedCategory && v.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-ink text-center mb-3">
          Vendor Directory
        </h1>
        <p className="text-center text-warm-gray font-sans mb-10 max-w-xl mx-auto">
          Browse our curated network of 400+ vetted vendors across the country.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-ink font-sans focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vendor) => (
            <Link
              key={vendor.id}
              to="/vendors/$vendorId"
              params={{ vendorId: vendor.id }}
              className="group bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-terracotta/30"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={vendor.image_url}
                  alt={vendor.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-sans font-semibold text-ink text-base leading-tight">
                    {vendor.name}
                  </h3>
                  <span className="flex items-center gap-0.5 text-sm text-warm-gray font-sans">
                    <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
                    {vendor.rating}
                  </span>
                </div>
                <span className="inline-block text-xs font-medium bg-muted text-warm-gray px-2 py-0.5 rounded-full mb-2">
                  {vendor.category}
                </span>
                <p className="text-sm text-warm-gray font-sans line-clamp-2 mb-3">
                  {vendor.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-warm-gray font-sans">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {vendor.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {vendor.price_min.toLocaleString()}–{vendor.price_max.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-warm-gray font-sans mt-10">
            No vendors found matching your filters.
          </p>
        )}
      </main>
    </div>
  );
}
