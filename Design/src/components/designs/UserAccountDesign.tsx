import { Heart, MessageSquare, Bell, User, Settings, LogOut, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function UserAccountDesign() {
  const savedProperties = [
    {
      id: '1',
      title: 'Modern 2-room apartment in Vesterbro',
      location: 'Vesterbro, Copenhagen',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      savedDate: '2025-10-10'
    },
    {
      id: '2',
      title: 'Bright studio in Nørreport',
      location: 'Nørreport, Copenhagen',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      savedDate: '2025-10-08'
    },
  ];

  const messages = [
    {
      id: '1',
      landlord: 'John Hansen',
      property: 'Modern 2-room apartment in Vesterbro',
      lastMessage: 'The viewing is confirmed for tomorrow at 2 PM',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      landlord: 'Maria Petersen',
      property: 'Bright studio in Nørreport',
      lastMessage: 'Thank you for your interest. When would you like to schedule a viewing?',
      time: '1 day ago',
      unread: false
    },
  ];

  const bookings = [
    {
      id: '1',
      property: 'Modern 2-room apartment in Vesterbro',
      landlord: 'John Hansen',
      date: '2025-10-13',
      time: '14:00',
      status: 'confirmed'
    },
    {
      id: '2',
      property: 'Cozy apartment in Østerbro',
      landlord: 'Anna Nielsen',
      date: '2025-10-15',
      time: '16:00',
      status: 'pending'
    },
  ];

  return (
    <div className="bg-muted/20 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                {/* Profile */}
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarFallback className="text-xl">SJ</AvatarFallback>
                  </Avatar>
                  <h3>Sarah Jensen</h3>
                  <p className="text-sm text-muted-foreground">sarah.jensen@email.dk</p>
                </div>

                <Separator className="my-4" />

                {/* Menu */}
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="favorites" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="favorites">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="alerts">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </TabsTrigger>
              </TabsList>

              {/* Favorites */}
              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Properties</CardTitle>
                    <CardDescription>
                      {savedProperties.length} properties saved
                    </CardDescription>
                  </CardHeader>
                </Card>

                {savedProperties.map((property) => (
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
                            <div className="text-right">
                              <div className="text-xl" style={{ color: 'var(--copenhagen-blue)' }}>
                                {property.price.toLocaleString()} kr
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Saved {property.savedDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                            >
                              View Property
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4 mr-2 fill-red-500 text-red-500" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Messages */}
              <TabsContent value="messages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>
                      Your conversations with landlords
                    </CardDescription>
                  </CardHeader>
                </Card>

                {messages.map((message) => (
                  <Card key={message.id} className={message.unread ? 'border-primary' : ''}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {message.landlord.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4>{message.landlord}</h4>
                              {message.unread && (
                                <Badge variant="default" className="bg-[#2C9F5D]">New</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {message.property}
                            </p>
                            <p className="text-sm">{message.lastMessage}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {message.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Bookings */}
              <TabsContent value="bookings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Viewing Bookings</CardTitle>
                    <CardDescription>
                      Your scheduled apartment viewings
                    </CardDescription>
                  </CardHeader>
                </Card>

                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3>{booking.property}</h3>
                            <Badge className={booking.status === 'confirmed' ? 'bg-[#2C9F5D]' : 'bg-[#F4A300]'}>
                              {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Landlord: {booking.landlord}
                          </p>
                          <p className="text-sm">
                            📅 {booking.date} at {booking.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Alerts */}
              <TabsContent value="alerts">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Alerts</CardTitle>
                    <CardDescription>
                      Get notified when new properties match your criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Notification Settings */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email when new properties match
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Instant alerts on your device
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <Label>Daily Summary</Label>
                          <p className="text-sm text-muted-foreground">
                            Daily email with all new matches
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    {/* Saved Searches */}
                    <div>
                      <h4 className="mb-4">Saved Searches</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <p>2-room apartments in Vesterbro</p>
                            <p className="text-sm text-muted-foreground">
                              Max 12,000 kr • 3 new matches
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <p>Pet-friendly apartments</p>
                            <p className="text-sm text-muted-foreground">
                              All Copenhagen • 1 new match
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      style={{ backgroundColor: 'var(--copenhagen-blue)' }}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Create New Search Alert
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
