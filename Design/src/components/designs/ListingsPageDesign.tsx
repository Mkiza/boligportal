import { SlidersHorizontal, MapPin, Home, Heart, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ListingsPageDesign() {
  return (
    <div className="bg-muted/20 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2">Available Apartments in Copenhagen</h1>
          <p className="text-muted-foreground">2,400 apartments found</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3>Filters</h3>
                <Button variant="ghost" size="sm">Clear all</Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block">Price Range</Label>
                <Slider defaultValue={[0, 20000]} max={30000} step={1000} />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>0 kr</span>
                  <span>30,000 kr</span>
                </div>
              </div>

              {/* Rooms */}
              <div className="mb-6">
                <Label className="mb-3 block">Number of Rooms</Label>
                <div className="space-y-2">
                  {['1 room', '2 rooms', '3 rooms', '4+ rooms'].map((room) => (
                    <div key={room} className="flex items-center space-x-2">
                      <Checkbox id={room} />
                      <label htmlFor={room} className="text-sm cursor-pointer">{room}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <Label className="mb-3 block">Features</Label>
                <div className="space-y-2">
                  {['Furnished', 'Pet-friendly', 'Balcony', 'Parking'].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox id={feature} />
                      <label htmlFor={feature} className="text-sm cursor-pointer">{feature}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <Label className="mb-3 block">Availability</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instant" defaultChecked />
                    <label htmlFor="instant" className="text-sm cursor-pointer">Instant Booking</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verified" defaultChecked />
                    <label htmlFor="verified" className="text-sm cursor-pointer">Verified Only</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border group">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1522708323590-d24dbb6b0267' : '1560448204-e02f11c3d0e2'}?w=800&q=80`}
                      alt="Apartment"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Favorite Button */}
                    <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                      <Heart className="h-5 w-5 text-muted-foreground" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge className="bg-[#2C9F5D] text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      {i % 3 === 0 && (
                        <Badge style={{ backgroundColor: 'var(--copenhagen-gold)' }}>
                          ⚡ Instant Booking
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="line-clamp-1">Modern {i}-room apartment</h3>
                      <div className="text-xl" style={{ color: 'var(--copenhagen-blue)' }}>
                        {(10000 + i * 1000).toLocaleString()} kr
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Vesterbro, Copenhagen</span>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>{i} rooms</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{50 + i * 10} m²</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Available Feb {i}
                      </span>
                      <Button
                        size="sm"
                        style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline">Previous</Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  style={page === 1 ? { backgroundColor: 'var(--copenhagen-blue)' } : {}}
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
