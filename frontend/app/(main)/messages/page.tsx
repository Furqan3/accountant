"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import ConversationList from "@/components/messages/conversation-list"
import ChatView from "@/components/messages/chat-view"

const conversations = [
  { id: "1", name: "Elmer Laverty", avatar: "/professional-man-glasses.png", lastMessage: "Haha oh man 🔥", time: "12m" },
  { id: "2", name: "Florencio Dorrance", avatar: "/professional-man-dark-hair.jpg", lastMessage: "woohoooo", time: "24m" },
  {
    id: "3",
    name: "Lavern Laboy",
    avatar: "/professional-blonde-woman.png",
    lastMessage: "Haha that's terrifying 😅",
    time: "1h",
  },
  {
    id: "4",
    name: "Titus Kitamura",
    avatar: "/asian-professional-man.png",
    lastMessage: "omg, this is amazing",
    time: "5h",
  },
  { id: "5", name: "Geoffrey Mott", avatar: "/young-professional-man.png", lastMessage: "aww 😍", time: "2d" },
  { id: "6", name: "Alfonzo Schuessler", avatar: "/professional-man-beard.png", lastMessage: "perfect!", time: "1m" },
]

const initialMessages = [
  { id: "1", text: "Hi, we've received your service request", isOwn: false, avatar: "/professional-man-dark-hair.jpg" },
  { id: "2", text: "But before proceeding", isOwn: false, avatar: "/professional-man-dark-hair.jpg" },
  { id: "3", text: "we need some information from you", isOwn: false, avatar: "/professional-man-dark-hair.jpg" },
  { id: "4", text: "Sure, let me know what's required?", isOwn: true, avatar: "/professional-man-avatar.png" },
  { id: "5", text: "We need your address details you requested", isOwn: false, avatar: "/professional-man-dark-hair.jpg" },
]

const order = {
  id: "ORD-000003",
  items: [
    { name: "Registered Office Address (x1)", price: 30 },
    { name: "Confirmation Statement", price: 45.3 },
    { name: "Register company as dormant & file Confirmation Statement", price: 12.56 },
  ],
  status: "Pending" as const,
  isPaid: true,
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeConversation, setActiveConversation] = useState("2")
  const [messages, setMessages] = useState(initialMessages)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { id: Date.now().toString(), text, isOwn: true, avatar: "/professional-man-avatar.png" }])
  }

  const activeContact = conversations.find((c) => c.id === activeConversation)

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="px-4 pt-4">
        <Header />
      </div>

      <main
        className="flex-1 flex flex-col md:flex-row m-4 bg-white rounded-xl  shadow-sm border border-gray-200 overflow-hidden"
      >
        <ConversationList
          conversations={conversations}
          activeId={activeConversation}
          onSelect={setActiveConversation}
        />
        <ChatView
          contactName={activeContact?.name || ""}
          contactAvatar={activeContact?.avatar || ""}
          isOnline
          order={order}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </main>

    </div>
  )
}
