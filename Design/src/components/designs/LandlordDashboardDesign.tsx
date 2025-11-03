import { Plus, Eye, MessageSquare, Edit, Trash2, Upload, Home } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function LandlordDashboardDesign() {
  const myProperties = [
    {
      id: '1',
      title: 'Modern 2-room apartment in Vesterbro',
      location: 'Vesterbro, Copenhagen',
      price: 12000,
      status: 'active',
      views: 342,
      messages: 8,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
    },
    {
      id: '2',
      title: 'Cozy studio near Nørreport',
      location: 'Nørreport, Copenhagen',
      price: 8500,
      status: 'active',
      views: 198,
      messages: 5,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
    },
  ];

  return (
    <div className="bg-muted/20 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Landlord Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and bookings</p>
          </div>
          <Button style={{ backgroundColor: 'var(--copenhagen-blue)' }}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Listings</CardDescription>
              <CardTitle className="text-3xl">2</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Views</CardDescription>
              <CardTitle className="text-3xl">540</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Messages</CardDescription>
              <CardTitle className="text-3xl">13</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Bookings</CardDescription>
              <CardTitle className="text-3xl">2</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="add">Add Property</TabsTrigger>
          </TabsList>

          {/* My Properties */}
          <TabsContent value="properties" className="space-y-4">
            {myProperties.map((property) => (
              <Card key={property.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <ImageWithFallback
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="mb-1">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                        <Badge className="bg-[#2C9F5D]">{property.status}</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 my-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Price</div>
                          <div style={{ color: 'var(--copenhagen-blue)' }}>
                            {property.price.toLocaleString()} kr
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Views</div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {property.views}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Messages</div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {property.messages}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Booking Requests */}
          <TabsContent value="bookings" className="space-y-4">
            {[
              {
                tenant: 'Anna Nielsen',
                property: 'Modern 2-room apartment in Vesterbro',
                date: '2025-10-15',
                time: '14:00',
                status: 'pending'
              },
              {
                tenant: 'Lars Jensen',
                property: 'Cozy studio near Nørreport',
                date: '2025-10-14',
                time: '16:00',
                status: 'pending'
              }
            ].map((booking, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{booking.tenant}</h3>
                        <Badge className="bg-[#F4A300]">Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {booking.property}
                      </p>
                      <p className="text-sm">
                        📅 {booking.date} at {booking.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" style={{ backgroundColor: 'var(--copenhagen-green)' }}>
                        Accept
                      </Button>
                      <Button variant="outline" size="sm">
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Add Property */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Property</CardTitle>
                <CardDescription>List your apartment for rent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label>Property Title</Label>
                    <Input placeholder="e.g. Modern 2-room apartment in Vesterbro" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vesterbro">Vesterbro</SelectItem>
                          <SelectItem value="norreport">Nørreport</SelectItem>
                          <SelectItem value="osterbro">Østerbro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Monthly Rent (kr)</Label>
                      <Input type="number" placeholder="12000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Number of Rooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 room</SelectItem>
                          <SelectItem value="2">2 rooms</SelectItem>
                          <SelectItem value="3">3 rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Size (m²)</Label>
                      <Input type="number" placeholder="65" />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe your property..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Photos</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop photos here, or click to select
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Publish Property
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
