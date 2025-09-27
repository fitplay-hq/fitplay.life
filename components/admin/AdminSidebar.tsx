"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BarChart3,
  Package,
  ShoppingCart,
  CreditCard,
  Building2,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const adminNavItems = [
  {
    title: "Overview",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
    items: [
      {
        title: "All Orders",
        url: "/admin/orders",
      },
      {
        title: "Create Order",
        url: "/admin/orders/create",
      },
    ],
  },
  {
    title: "Wallets",
    url: "/admin/wallets",
    icon: DollarSign,
  },
  {
    title: "Vendors",
    url: "/admin/vendors",
    icon: Building2,
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <SidebarProvider>
        <Sidebar className="border-r border-gray-200 bg-white">
          <SidebarHeader className="border-b border-gray-200 bg-emerald-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Admin Dashboard
                </h2>
                <div className="mt-1">
                  <Badge
                    variant="destructive"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Admin
                  </Badge>
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-6">
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Loading...</div>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2 px-4">
              <div className="h-4 w-px bg-gray-300" />
              <Badge
                variant="destructive"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Admin
              </Badge>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-6 bg-gray-50">
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">Loading dashboard...</div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return null; // Will redirect in useEffect
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200 bg-white p-0">
        <SidebarHeader className="border-b border-gray-200 bg-emerald-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Admin Dashboard
              </h2>
              <div className="mt-1">
                <Badge
                  variant="destructive"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Admin
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => {
                  const isActive = pathname === item.url;
                  const hasSubItems = item.items && item.items.length > 0;
                  const isSubActive =
                    hasSubItems &&
                    item.items.some((sub) => pathname === sub.url);

                  if (hasSubItems) {
                    return (
                      <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={isSubActive}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className={`
                                px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                ${
                                  isActive || isSubActive
                                    ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600"
                                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                }
                              `}
                              tooltip={item.title}
                            >
                              <item.icon className="h-5 w-5" />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={`
                                      px-3 py-1.5 rounded text-sm transition-colors
                                      ${
                                        pathname === subItem.url
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                      }
                                    `}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600"
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }
                        `}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-gray-200">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="sm"
                className="w-full text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="text-xs text-gray-500 text-center mt-4">
            FitPlay.life v2.0.1
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-gray-600 hover:text-emerald-600" />
            <div className="h-4 w-px bg-gray-300" />
            <Badge
              variant="destructive"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Admin
            </Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 bg-gray-50">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
