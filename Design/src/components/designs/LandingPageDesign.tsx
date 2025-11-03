import { Search, MapPin, Building2, Shield, MessageCircle, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function LandingPageDesign() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1B4F72] to-[#2C5F8D] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
              Find Your Perfect Home in Copenhagen
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Transparent, fast, and trusted apartment rentals. Join thousands of happy renters.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg p-4 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Location */}
                <div className="md:col-span-1">
                  <label className="text-sm text-foreground mb-1 block">Location</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-input-background">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Copenhagen</SelectItem>
                      <SelectItem value="vesterbro">Vesterbro</SelectItem>
                      <SelectItem value="norreport">Nørreport</SelectItem>
                      <SelectItem value="osterbro">Østerbro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="md:col-span-1">
                  <label className="text-sm text-foreground mb-1 block">Max Price</label>
                  <Select defaultValue="any">
                    <SelectTrigger className="bg-input-background">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any price</SelectItem>
                      <SelectItem value="8000">Up to 8,000 kr</SelectItem>
                      <SelectItem value="12000">Up to 12,000 kr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Size */}
                <div className="md:col-span-1">
                  <label className="text-sm text-foreground mb-1 block">Rooms</label>
                  <Select defaultValue="any">
                    <SelectTrigger className="bg-input-background">
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any rooms</SelectItem>
                      <SelectItem value="1">1 room</SelectItem>
                      <SelectItem value="2">2 rooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="md:col-span-1 flex items-end">
                  <Button 
                    className="w-full h-10"
                    style={{ backgroundColor: 'var(--copenhagen-gold)' }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-1">2,400+</div>
                <div className="text-sm text-white/80">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">15,000+</div>
                <div className="text-sm text-white/80">Happy Tenants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">100%</div>
                <div className="text-sm text-white/80">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Banners */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3">Why Choose CopenHome?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing apartment rentals in Copenhagen with transparency, speed, and trust at the core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Largest Selection in Copenhagen",
                description: "Over 2,400 verified apartments across all neighborhoods",
                color: "var(--copenhagen-blue)"
              },
              {
                icon: Shield,
                title: "Verified Landlords",
                description: "Every landlord is verified. No scams, 100% human-reviewed",
                color: "var(--copenhagen-green)"
              },
              {
                icon: MessageCircle,
                title: "Free Messaging for Tenants",
                description: "Contact landlords directly at no cost. Fast responses guaranteed",
                color: "var(--copenhagen-gold)"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3">Featured Apartments</h2>
            <p className="text-muted-foreground">Handpicked selection of the best apartments available now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-border">
                <div className="relative aspect-[4/3] bg-muted">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80`}
                    alt="Apartment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#2C9F5D] text-white text-xs px-2 py-1 rounded">✓ Verified</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3>Modern 2-room apartment</h3>
                    <div className="text-xl" style={{ color: 'var(--copenhagen-blue)' }}>
                      12,000 kr
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-3 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Vesterbro, Copenhagen</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
