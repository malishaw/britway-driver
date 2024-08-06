import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Home, Menu, Package2, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Britway",
  description: "Driver booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full  max-h-screen flex-col gap-2 sticky top-0">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="">Britway</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <Link
                    href="/driver"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Home className="h-4 w-4" />
                    Drivers
                  </Link>
                  <Link
                    href="/booking"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Booking
                  </Link>
                </nav>
              </div>
              <div className="mt-auto p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                  <CardContent className="p-2 text-center">
                    <span>v 1.0.0</span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Package2 className="h-6 w-6" />
                      <span className="sr-only">Britway</span>
                    </Link>
                    <Link
                      href="/driver"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Drivers
                    </Link>
                    <Link
                      href="/booking"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Booking
                    </Link>
                  </nav>
                  <div className="mt-auto">
                    <Card x-chunk="dashboard-02-chunk-0">
                      <CardContent className="p-2 text-center">
                        <span>v 1.0.0</span>
                      </CardContent>
                    </Card>
                  </div>
                </SheetContent>
              </Sheet>
              {/*<div className="w-full flex-1">*/}
              {/*  <form>*/}
              {/*    <div className="relative">*/}
              {/*      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />*/}
              {/*      <Input*/}
              {/*        type="search"*/}
              {/*        placeholder="Search products..."*/}
              {/*        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </form>*/}
              {/*</div>*/}
            </header>
            <main className="flex flex-1 p-4 lg:gap-6 lg:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
