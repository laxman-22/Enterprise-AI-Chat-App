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
import { useChat } from "@ai-sdk/react"
import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat"
import { MessageInput } from "@/components/ui/message-input"
import { MessageList } from "@/components/ui/message-list"
import { PromptSuggestions } from "@/components/ui/prompt-suggestions"
import { useParams } from "next/navigation"

export default function Page() {
  const { sessionId } = useParams()
  const {
      messages,
      input,
      handleInputChange,
      handleSubmit,
      append,
      status,
      stop,
    } = useChat()
  
    const isLoading = status === 'submitted' || status === 'streaming'
    const lastMessage = messages.at(-1)
    const isEmpty = messages.length === 0
    const isTyping = lastMessage?.role === "user"
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
                    Chat Session: {sessionId}
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
              {isEmpty ? (
              <PromptSuggestions
                label="Click New Chat to begin"
                append={append}
                suggestions={["What is the capital of France?", "Tell me a joke"]}
              />
            ) : null}
      
            {!isEmpty ? (
              <ChatMessages messages={messages}>
                <MessageList messages={messages} isTyping={isTyping} />
              </ChatMessages>
            ) : null}
      
            <ChatForm
              className="mt-auto"
              isPending={isLoading || isTyping}
              handleSubmit={handleSubmit}
            >
              {({ files, setFiles }) => (
                <MessageInput
                  value={input}
                  onChange={handleInputChange}
                  stop={stop}
                  disabled={true}
                  isGenerating={isLoading}
                />
              )}
            </ChatForm>
          </ChatContainer>
        </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
