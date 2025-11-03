import { Search, MapPin, Heart, Home, Filter, Menu, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function MobileDesigns() {
  return (
    <div className="bg-background">
      <div className="text-center mb-8">
        <h2 className="text-3xl mb-3">Mobile Views</h2>
        <p className="text-muted-foreground">Optimized for smartphones and tablets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Mobile Home */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-muted max-w-sm mx-auto">
          <div className="aspect-[9/16] bg-background overflow-y-auto">
            {/* Mobile Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-6 w-6" style={{ color: 'var(--copenhagen-blue)' }} />
                <span style={{ color: 'var(--copenhagen-blue)' }}>CopenHome</span>
              </div>
              <Menu className="h-6 w-6" />
            </div>

            {/* Mobile Hero */}
            <div className="bg-gradient-to-br from-[#1B4F72] to-[#2C5F8D] text-white p-6">
              <h1 className="text-2xl mb-3">Find Your Home</h1>
              <p className="text-sm text-white/90 mb-4">
                Trusted apartment rentals in Copenhagen
              </p>

              {/* Mobile Search */}
              <div className="bg-white rounded-lg p-3 space-y-2">
                <input 
                  className="w-full px-3 py-2 bg-input-background text-foreground rounded text-sm"
                  placeholder="Location..."
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    className="px-3 py-2 bg-input-background text-foreground rounded text-sm"
                    placeholder="Max price"
                  />
                  <input 
                    className="px-3 py-2 bg-input-background text-foreground rounded text-sm"
                    placeholder="Rooms"
                  />
                </div>
                <Button 
                  className="w-full"
                  style={{ backgroundColor: 'var(--copenhagen-gold)' }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Mobile Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                <div>
                  <div className="text-lg">2,400+</div>
                  <div className="text-xs text-white/80">Listings</div>
                </div>
                <div>
                  <div className="text-lg">15k+</div>
                  <div className="text-xs text-white/80">Tenants</div>
                </div>
                <div>
                  <div className="text-lg">100%</div>
                  <div className="text-xs text-white/80">Verified</div>
                </div>
              </div>
            </div>

            {/* Mobile Property Cards */}
            <div className="p-4 space-y-4">
              <h2 className="text-lg">Featured</h2>
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-border">
                  <div className="relative aspect-video bg-muted">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                      alt="Apartment"
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-[#2C9F5D] text-white text-xs">
                        ✓ Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm">Modern 2-room apt</h3>
                      <div className="text-sm" style={{ color: 'var(--copenhagen-blue)' }}>
                        12,000 kr
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>Vesterbro</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs"
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

        {/* Mobile Listings */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-muted max-w-sm mx-auto">
          <div className="aspect-[9/16] bg-muted/20 overflow-y-auto">
            {/* Mobile Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg">Apartments</h1>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">2,400 found</p>
            </div>

            {/* Mobile Property List */}
            <div className="p-3 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-border">
                  <div className="flex gap-3 p-3">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80"
                        alt="Apartment"
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                        <Heart className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm truncate">Modern apt</h3>
                        <div className="text-sm" style={{ color: 'var(--copenhagen-blue)' }}>
                          {(10000 + i * 1000).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>Vesterbro</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{i} rooms</span>
                        <span>•</span>
                        <span>{50 + i * 10}m²</span>
                      </div>
                      <Badge className="bg-[#2C9F5D] text-white text-xs">
                        ✓ Verified
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Property Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-muted max-w-sm mx-auto">
          <div className="aspect-[9/16] bg-background overflow-y-auto">
            {/* Mobile Image */}
            <div className="relative aspect-square bg-muted">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                alt="Apartment"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <Button size="sm" variant="secondary" className="h-8">
                  ← Back
                </Button>
                <div className="flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full ${i === 0 ? 'bg-white w-6' : 'bg-white/50 w-1.5'}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Details */}
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-xl">Modern 2-room apartment</h1>
                  <div className="text-xl" style={{ color: 'var(--copenhagen-blue)' }}>
                    12,000 kr
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Vesterbro, Copenhagen</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge className="bg-[#2C9F5D]">✓ Verified</Badge>
                <Badge style={{ backgroundColor: 'var(--copenhagen-gold)' }}>
                  ⚡ Instant
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Rooms</div>
                  <div className="text-sm">2</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Size</div>
                  <div className="text-sm">65m²</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Floor</div>
                  <div className="text-sm">3rd</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Rating</div>
                  <div className="text-sm">4.8</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Beautiful and bright apartment in the heart of Vesterbro. Modern amenities and excellent location.
                </p>
              </div>

              {/* Mobile CTA */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-border -mx-4 px-4 pb-4">
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                  >
                    Book Viewing
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
