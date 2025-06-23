"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChatContainer } from "@/components/ui/chat"
import { PromptSuggestions } from "@/components/ui/prompt-suggestions"
import { useState } from 'react'

export default function Page() {
  
    const [messages, setMessages] = useState<
      { id: string; role: "user" | "assistant"; content: string }[]
    >([])

    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const append = (message: { role: "user"; content: string }) => {
      const newMessage = {
        id: crypto.randomUUID(),
        role: message.role,
        content: message.content,
      }
      setMessages((prev) => [...prev, newMessage])
    }

    return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Chat
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-end px-4 py-10">
        <div className="w-full h-full">
            {/* keep chat history here */}
            <ChatContainer>
              <PromptSuggestions
                label="Select a chat"
                append={append}
                suggestions={[]}
              />
      
          </ChatContainer>
        </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
