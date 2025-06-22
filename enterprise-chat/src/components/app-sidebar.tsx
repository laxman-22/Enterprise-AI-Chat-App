"use client"

import * as React from "react"

import { NavFavorites } from "@/components/nav-favorites"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  favorites: [
    {
      name: "Test Chat",
      url: "",
      emoji: ""
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "",
  //     icon: Settings2
  //   }
  // ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <p>Logged In</p>
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto"></NavSecondary> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
