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
import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat"
import { MessageInput } from "@/components/ui/message-input"
import { MessageList } from "@/components/ui/message-list"
import { PromptSuggestions } from "@/components/ui/prompt-suggestions"
import { useParams } from "next/navigation"
import { createChatMessage } from "@/graphql/mutations"
import { generateClient } from "aws-amplify/api";
import { Amplify } from 'aws-amplify'
import awsconfig from '@/amplifyconfig'
import { useEffect, useState, useRef } from "react"
import { chatMessagesByChatSessionIDAndCreatedAt } from "@/graphql/queries"
import { toast } from "sonner"
import { ModelSortDirection } from "@/API"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { fetchAuthSession } from 'aws-amplify/auth'

Amplify.configure(awsconfig)

async function getBedrockResponse(prompt: string) {
  
const authSession = await fetchAuthSession();
  const idToken = authSession.tokens?.idToken?.toString();

  if (!idToken) {
    throw new Error("User is not authenticated.");
  }
  const credentials = fromCognitoIdentityPool({
      identityPoolId: 'us-east-2:926c0534-bd6b-46ea-acf4-788a978bb92e',
      clientConfig: { region: 'us-east-2' },
      logins: {
        'cognito-idp.us-east-2.amazonaws.com/us-east-2_u8vRUHB2r': idToken, // Replace with your actual User Pool ID
      },
    });

    const client = new BedrockRuntimeClient({
      region: 'us-east-2',
      credentials,
    });

    const command = new InvokeModelCommand({
      modelId: 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
        temperature: 0.5,
      }),
    });

    const response = await client.send(command);
    const body = await response.body.transformToString();
    return JSON.parse(body);

}


export default function Page() {
  const hasFetched = useRef(false)
    const { sessionId } = useParams()
    const chatId = Array.isArray(sessionId) ? sessionId[0] : sessionId
    const client = generateClient()

    const [messages, setMessages] = useState<
      { id: string; role: "user" | "assistant"; content: string }[]
    >([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    if (!chatId) return;
    useEffect(() => {
      if (!chatId || hasFetched.current) return
      hasFetched.current = true

      const fetchMessages = async () => {
        try {
          const res = await client.graphql({
            query: chatMessagesByChatSessionIDAndCreatedAt,
            variables: {
              chatSessionID: chatId,
              sortDirection: ModelSortDirection.ASC,
            },
          })

          const items = res.data.chatMessagesByChatSessionIDAndCreatedAt.items
          const formatted = items.map((msg: any) => ({
            id: msg.id,
            role: msg.sender,
            content: msg.message,
          }))

          setMessages(formatted)
        } catch (err) {
          toast.error("Failed to load messages")
        }
      }

      fetchMessages()
    }, [chatId])

    
    const handleSubmit = async (
      event?: { preventDefault?: () => void },
      options?: { experimental_attachments?: FileList }
    ) => {
      event?.preventDefault?.()
      if (!input.trim()) return

      const userMessage: { id: string; role: "user" | "assistant"; content: string } = {
        id: crypto.randomUUID(),
        role: "user",
        content: input,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        await client.graphql({
          query: createChatMessage,
          variables: {
            input: {
              chatSessionID: chatId,
              sender: "user",
              message: input,
            },
          },
        })

        const response = await getBedrockResponse(input)
        console.log(response)

        const assistantMessage: { id: string; role: "user" | "assistant"; content: string } = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.content[0].text,
        }

        setMessages((prev) => [...prev, assistantMessage])

        await client.graphql({
          query: createChatMessage,
          variables: {
            input: {
              chatSessionID: chatId,
              sender: "assistant",
              message: assistantMessage.content,
            },
          },
        })
      } catch (err) {
        console.error("Error:", err)
        toast.error("Failed to get response")
      } finally {
        setIsLoading(false)
      }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
    }

    const wrappedAppend = async (message: { role: "user"; content: string }) => {
      const userMessage = {
        id: crypto.randomUUID(),
        role: "user" as const,
        content: message.content,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        await client.graphql({
          query: createChatMessage,
          variables: {
            input: {
              chatSessionID: chatId,
              sender: "user",
              message: message.content,
            },
          },
        })

        const response = await getBedrockResponse(message.content)

        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: response.content[0].text,
        }

        setMessages((prev) => [...prev, assistantMessage])

        await client.graphql({
          query: createChatMessage,
          variables: {
            input: {
              chatSessionID: chatId,
              sender: "assistant",
              message: assistantMessage.content,
            },
          },
        })
      } catch (err) {
        console.error("Error in wrappedAppend:", err)
        toast.error("Failed to get response")
      } finally {
        setIsLoading(false)
      }
    }


    const isEmpty = messages.length === 0
    const isTyping = isLoading


    
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
                label="How can I help you?"
                append={wrappedAppend}
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
                  disabled={false}
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
