"use client"

import * as React from "react"
import {
  Plus,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { useState } from "react"
import { toast } from "sonner"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { generateClient } from "aws-amplify/api"
import { createChatSession } from "@/graphql/mutations"
import { useRouter } from "next/navigation"
import { Amplify } from 'aws-amplify'
import awsconfig from '@/amplifyconfig'
import { fetchAuthSession } from "aws-amplify/auth"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { listChatSessions } from "@/graphql/queries"
import { deleteChatSession } from "@/graphql/mutations"
import { chatMessagesByChatSessionIDAndCreatedAt } from "@/graphql/queries";
import { ModelSortDirection } from "@/API"


Amplify.configure(awsconfig)
type Chat = {
  name: string
  url: string
  emoji: string
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [favorites, setFavorites] = useState<Chat[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const client = generateClient()

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await client.graphql({ query: listChatSessions })
        const items = res.data.listChatSessions.items

        const mapped = items.map((item: any) => ({
          name: item.title,
          url: `/chat/${item.id}`,
          emoji: "",
        }))

        setFavorites(mapped)
      } catch (err: any) {
        toast.error("Failed to load sessions")
      }
    }

    fetchSessions()
  }, [pathname]) 

  const handleSelectChat = async (chatId: string) => {
    try {
      const res = await client.graphql({
        query: chatMessagesByChatSessionIDAndCreatedAt,
        variables: {
          chatSessionID: chatId,
          sortDirection: ModelSortDirection.ASC
        }
      });

      const messages = res.data.chatMessagesByChatSessionIDAndCreatedAt.items;
      console.log("Fetched messages:", messages);
      toast("Loading...")
      router.push(`/chat/${chatId}`);
      } catch (err) {
        toast.error("Unable to select chat");
      }
  } 

  const handleDeleteChat = async (name: string) => {
    try {
      const chatToDelete = favorites.find(chat => chat.name === name);
      if (!chatToDelete) return;

      const id = chatToDelete.url.split("/").pop(); // Extract ID from URL

      if (!id) {
            toast.error("Invalid chat ID");
            return;
          }

      await client.graphql({
    
        query: deleteChatSession,
        variables: {
          input: { id }
        }
      });

      setFavorites(prev => prev.filter(chat => chat.name !== name));
      toast.success("Chat deleted successfully");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error("Failed to delete chat");
    }
  };


  const handleNewChat = async () => {
    try {
      const session = await fetchAuthSession()
      const isLoggedIn = !!session.identityId

      if (!isLoggedIn) {
        router.push("/login")
      }
    } catch {
      router.push("/login")
    }

    try {
      const sessionId = Math.floor(10000000 + Math.random() * 90000000)
      const newChat = {
        name: `Chat ${sessionId}`,
        url: `/chat/${sessionId}`,
        emoji: ''
      }
      
      console.log(sessionId)

      const res = await client.graphql({
        query: createChatSession,
        variables: {
          input: {
            title: `Chat ${sessionId}`
          }
        }
      })

      setFavorites((prev) => [...prev, newChat])
      router.push(newChat.url)
    } catch (error: any) {
      toast(error.message)
    }
  
  }

  const data = {
  navMain: [
    {
      title: "New Chat",
      url: "#",
      icon: Plus,
      onClick: handleNewChat,
    }
  ],
}

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={favorites} onDelete={handleDeleteChat} onSelect={handleSelectChat}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
