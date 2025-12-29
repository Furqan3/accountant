"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { createClient } from "@/lib/supabase"
import Footer from "@/components/layout/footer"
import PageHero from "@/components/shared/page-hero"
import { Camera, Mail, Building2, User as UserIcon, Upload } from "lucide-react"
import Image from "next/image"
import { toast } from "react-toastify"

export default function ProfilePage() {
  const router = useRouter()
  const { user, profile, loading, refreshProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        companyName: profile.company_name || "",
        email: user?.email || "",
      })
    } else if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || "",
        companyName: user.user_metadata?.company_name || "",
        email: user.email || "",
      })
    }
  }, [profile, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
        }),
      })

      if (!response.ok) {
        toast.error("Failed to update profile")
        return
      }

      toast.success("Profile updated successfully!")
      await refreshProfile()
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB")
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image")
      return
    }

    setIsUploadingAvatar(true)
    try {
      const supabase = createClient()

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, file, {
          upsert: true,
        })

      if (uploadError) {
        toast.error("Failed to upload image")
        console.error("Upload error:", uploadError)
        return
      }

      // Get public URL
      const { data } = supabase.storage.from("profiles").getPublicUrl(filePath)
      const avatarUrl = data.publicUrl

      // Update profile with new avatar URL via API
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatarUrl: avatarUrl,
        }),
      })

      if (!response.ok) {
        toast.error("Failed to update profile picture")
        console.error("Update error")
      } else {
        toast.success("Profile picture updated!")
        await refreshProfile()
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast.error("Something went wrong")
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || "/placeholder.svg"

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PageHero title="My Profile" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section with Avatar */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 h-32"></div>

          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-6">
              <div className="relative inline-block">
                <Image
                  src={avatarUrl}
                  alt={formData.fullName || "User"}
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white object-cover bg-white"
                />
                {isEditing && (
                  <>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer transition shadow-lg"
                    >
                      {isUploadingAvatar ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={isUploadingAvatar}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition font-medium"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        // Reset form data
                        if (profile) {
                          setFormData({
                            fullName: profile.full_name || "",
                            companyName: profile.company_name || "",
                            email: user?.email || "",
                          })
                        }
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition font-medium disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      Full Name
                    </div>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {formData.fullName || "Not set"}
                    </p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                  </label>
                  <p className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-600">
                    {formData.email}
                    <span className="ml-2 text-xs text-gray-500">(Cannot be changed)</span>
                  </p>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Company Name
                    </div>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your company name (optional)"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                      {formData.companyName || "Not set"}
                    </p>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Account Created</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Sign In</p>
                    <p className="text-gray-900 font-medium">
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
