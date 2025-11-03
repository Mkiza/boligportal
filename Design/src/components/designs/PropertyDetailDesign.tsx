import { ArrowLeft, Heart, Share2, MapPin, Home, Calendar, CheckCircle, Shield, Star, MessageSquare, Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function PropertyDetailDesign() {
  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  ];

  return (
    <div className="bg-muted/20 min-h-screen">
      {/* Back Button */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative aspect-[16/10] bg-muted">
                <ImageWithFallback
                  src={images[0]}
                  alt="Apartment"
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === 0 ? 'bg-white w-8' : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === 0 ? 'border-primary' : 'border-transparent opacity-60'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">Modern 2-room apartment in Vesterbro</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Vesterbro, Copenhagen
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl" style={{ color: 'var(--copenhagen-blue)' }}>
                      12,000 kr
                    </div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className="bg-[#2C9F5D]">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified Landlord
                  </Badge>
                  <Badge style={{ backgroundColor: 'var(--copenhagen-gold)' }}>
                    ⚡ Instant Booking Available
                  </Badge>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="pt-6">
                {/* Key Facts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Home className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Rooms</div>
                    <div>2</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl mb-2">📏</div>
                    <div className="text-sm text-muted-foreground">Size</div>
                    <div>65 m²</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Available</div>
                    <div className="text-sm">Feb 1</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div>4.8/5</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Beautiful and bright apartment located in the heart of Vesterbro, Copenhagen. This charming 2-room apartment 
                    offers 65m² of living space with modern amenities and excellent natural light throughout. 
                    Perfect for professionals or students looking for a comfortable home in Copenhagen.
                    The apartment comes fully furnished with high-quality furniture and appliances.
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Hardwood floors',
                      'Central heating',
                      'High-speed internet',
                      'Washing machine',
                      'Fully furnished',
                      'Kitchen appliances',
                      'Balcony',
                      'Storage space',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#2C9F5D]" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Nearby</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="mb-2">🚇 Public Transport</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Metro: 5 min walk</li>
                      <li>Bus stop: 2 min walk</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2">🛒 Shopping</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Supermarket: 3 min walk</li>
                      <li>Shopping center: 10 min</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2">🎓 Education</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>School: 8 min walk</li>
                      <li>University: 15 min</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Landlord</CardTitle>
                  <CardDescription>Response time: Usually within 1 hour</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Landlord Info */}
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Avatar>
                      <AvatarFallback>JH</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>John Hansen</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Shield className="h-3 w-3 text-[#2C9F5D]" />
                        Verified landlord
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <Button 
                    className="w-full"
                    size="lg"
                    style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Viewing
                  </Button>

                  <Button variant="outline" className="w-full" size="lg">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Trust This Listing?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-[#2C9F5D] mt-0.5" />
                    <div>
                      <div className="text-sm">Verified Landlord</div>
                      <div className="text-xs text-muted-foreground">
                        Identity and ownership confirmed
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2C9F5D] mt-0.5" />
                    <div>
                      <div className="text-sm">Human-Reviewed</div>
                      <div className="text-xs text-muted-foreground">
                        No scams, 100% legitimate
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5" style={{ color: 'var(--copenhagen-gold)' }} />
                    <div>
                      <div className="text-sm">High Rated</div>
                      <div className="text-xs text-muted-foreground">
                        4.8/5 from 12 reviews
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
