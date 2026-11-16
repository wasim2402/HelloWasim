import { NextResponse } from "next/server"

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  const username = "wasim2402"

  try {
    // 1. Fetch user profile from GitHub REST API
    let profile = {
      login: username,
      name: "Wasim Aktar",
      avatar_url: "https://avatars.githubusercontent.com/u/133221301?v=4",
      public_repos: 15,
      followers: 12,
    }

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          "User-Agent": "Wasim-Portfolio",
        },
        next: { revalidate: 3600 },
      })
      if (userRes.ok) {
        const userData = await userRes.json()
        profile = {
          login: userData.login || username,
          name: userData.name || "Wasim Aktar",
          avatar_url: userData.avatar_url || profile.avatar_url,
          public_repos: userData.public_repos || profile.public_repos,
          followers: userData.followers || profile.followers,
        }
      }
    } catch (e) {
      console.warn("Failed to fetch GitHub profile, using default profile", e)
    }

    // 2. Fetch contribution calendar data
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: {
          "User-Agent": "Wasim-Portfolio",
        },
        next: { revalidate: 3600 },
      }
    )

    if (!contribRes.ok) {
      throw new Error(`Contribution API responded with status ${contribRes.status}`)
    }

    const contribData = await contribRes.json()

    return NextResponse.json({
      success: true,
      profile,
      total: contribData.total,
      contributions: contribData.contributions,
    })
  } catch (error: any) {
    console.error("Error in /api/github-contributions:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch GitHub contributions",
      },
      { status: 500 }
    )
  }
}
