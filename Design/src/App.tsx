import { useState } from "react";
import { Building2, Heart, User, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { LandingPageDesign } from "./components/designs/LandingPageDesign";
import { ListingsPageDesign } from "./components/designs/ListingsPageDesign";
import { PropertyDetailDesign } from "./components/designs/PropertyDetailDesign";
import { LandlordDashboardDesign } from "./components/designs/LandlordDashboardDesign";
import { UserAccountDesign } from "./components/designs/UserAccountDesign";
import { MobileDesigns } from "./components/designs/MobileDesigns";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8" style={{ color: 'var(--copenhagen-blue)' }} />
              <span className="text-xl" style={{ color: 'var(--copenhagen-blue)' }}>CopenHome</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-muted-foreground hover:text-primary transition-colors">
                Find Apartment
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                How it Works
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                className="hidden md:inline-flex"
                style={{ backgroundColor: 'var(--copenhagen-blue)' }}
              >
                List Property
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="border-t border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-end gap-4">
            <button className="text-sm hover:text-primary transition-colors">🇩🇰 Dansk</button>
            <span className="text-muted-foreground">|</span>
            <button className="text-sm hover:text-primary transition-colors">🇬🇧 English</button>
          </div>
        </div>
      </header>

      {/* Design Viewer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">
              CopenHome Design System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern apartment rental platform for Copenhagen. Clean, trustworthy design with 
              Copenhagen-inspired colors and mobile-first responsive layouts.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="landing" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2">
              <TabsTrigger value="landing" className="data-[state=active]:bg-[#1B4F72] data-[state=active]:text-white">
                Landing Page
              </TabsTrigger>
              <TabsTrigger value="listings" className="data-[state=active]:bg-[#1B4F72] data-[state=active]:text-white">
                Listings
              </TabsTrigger>
              <TabsTrigger value="detail" className="data-[state=active]:bg-[#1B4F72] data-[state=active]:text-white">
                Property Detail
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#1B4F72] data-[state=active]:text-white">
                Landlord Dashboard
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-[#1B4F72] data-[state=active]:text-white">
                User Account
              </TabsTrigger>
              <TabsTrigger value="mobile" className="data-[state=active]:bg-[#1B4F72] data-[state=active]:text-white">
                Mobile Views
              </TabsTrigger>
            </TabsList>

            {/* Design Content */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
              <TabsContent value="landing" className="m-0">
                <LandingPageDesign />
              </TabsContent>

              <TabsContent value="listings" className="m-0">
                <ListingsPageDesign />
              </TabsContent>

              <TabsContent value="detail" className="m-0">
                <PropertyDetailDesign />
              </TabsContent>

              <TabsContent value="dashboard" className="m-0">
                <LandlordDashboardDesign />
              </TabsContent>

              <TabsContent value="account" className="m-0">
                <UserAccountDesign />
              </TabsContent>

              <TabsContent value="mobile" className="m-0 p-8">
                <MobileDesigns />
              </TabsContent>
            </div>
          </Tabs>

          {/* Color Palette */}
          <div className="mt-16">
            <h2 className="text-3xl mb-6 text-center">Color Palette</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div 
                  className="h-32 rounded-lg mb-3 shadow-md"
                  style={{ backgroundColor: '#1B4F72' }}
                ></div>
                <h3 className="mb-1">Copenhagen Blue</h3>
                <p className="text-sm text-muted-foreground">#1B4F72</p>
                <p className="text-xs text-muted-foreground">Primary Brand Color</p>
              </div>
              <div className="text-center">
                <div 
                  className="h-32 rounded-lg mb-3 shadow-md"
                  style={{ backgroundColor: '#F4A300' }}
                ></div>
                <h3 className="mb-1">Copenhagen Gold</h3>
                <p className="text-sm text-muted-foreground">#F4A300</p>
                <p className="text-xs text-muted-foreground">Accent & CTAs</p>
              </div>
              <div className="text-center">
                <div 
                  className="h-32 rounded-lg mb-3 shadow-md"
                  style={{ backgroundColor: '#2C9F5D' }}
                ></div>
                <h3 className="mb-1">Copenhagen Green</h3>
                <p className="text-sm text-muted-foreground">#2C9F5D</p>
                <p className="text-xs text-muted-foreground">Success & Trust</p>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <div className="mt-16 bg-muted/30 rounded-lg p-8">
            <h2 className="text-3xl mb-6 text-center">Design Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="mb-2">🎨 Clean & Minimal</h3>
                <p className="text-sm text-muted-foreground">
                  Spacious layouts with plenty of whitespace for clarity and focus
                </p>
              </div>
              <div>
                <h3 className="mb-2">✅ Trust & Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Verified badges, clear pricing, and landlord information upfront
                </p>
              </div>
              <div>
                <h3 className="mb-2">📱 Mobile-First</h3>
                <p className="text-sm text-muted-foreground">
                  Responsive design optimized for all devices and screen sizes
                </p>
              </div>
              <div>
                <h3 className="mb-2">⚡ Speed & Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Quick actions, instant booking, and streamlined user flows
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B4F72] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="text-xl">CopenHome</span>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Design Mockup - Modern Apartment Rental Platform for Copenhagen
            </p>
            <p className="text-white/60 text-xs">
              © 2025 CopenHome Design System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
