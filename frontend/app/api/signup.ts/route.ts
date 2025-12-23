import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const companyName = formData.get("companyName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const profilePic = formData.get("profilePic") as File | null

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Full name, email, and password are required" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Handle profile picture upload
    let profilePicUrl = null
    if (profilePic && profilePic.size > 0) {
      // Convert file to base64 for storage (for production, use a proper file storage service)
      const bytes = await profilePic.arrayBuffer()
      const buffer = Buffer.from(bytes)
      profilePicUrl = `data:${profilePic.type};base64,${buffer.toString("base64")}`
    }

    // Create user
    const result = await db.collection("users").insertOne({
      name: fullName,
      companyName,
      email,
      password: hashedPassword,
      image: profilePicUrl,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
