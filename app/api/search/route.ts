import { NextResponse } from "next/server"
import { fetchDataWithCache } from "@/app/lib/fetchData"
import { setCorsHeaders } from "@/app/lib/cors"
import { processTitle } from "@/app/lib/titleProcessor"

export const runtime = 'edge';
export const revalidate = 86400 // Revalidate every 24 hours (1 day)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const perPage = Number.parseInt(searchParams.get("per_page") || "30")

  if (!query) {
    const errorResponse = NextResponse.json({ error: "Search query is required" }, { status: 400 })
    return setCorsHeaders(errorResponse)
  }

  try {
    const data = await fetchDataWithCache()
    
    // Memisahkan query menjadi array kata-kata
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean)
    
    // Membuat Set untuk menyimpan file_code yang sudah ditemukan agar tidak ada duplikat
    const seenFileCodes = new Set<string>()
    
    // Mencari hasil untuk setiap kata kunci
    const searchResults = data
      .filter((file: any) => {
        const titleLower = file.title.toLowerCase()
        // Hanya menyertakan file yang belum dilihat dan cocok dengan salah satu kata kunci
        return !seenFileCodes.has(file.file_code) && 
               keywords.some(keyword => titleLower.includes(keyword))
      })
      .map((file: any) => {
        // Menambahkan file_code ke Set setelah diproses
        seenFileCodes.add(file.file_code)
        return {
          single_img: file.single_img,
          length: file.length.toString(),
          views: file.views.toString(),
          title: file.title,
          file_code: file.file_code,
          uploaded: file.uploaded,
          splash_img: file.splash_img,
          canplay: file.canplay ? 1 : 0,
        }
      })

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedResults = searchResults.slice(startIndex, endIndex)

    const response = NextResponse.json({
      server_time: new Date().toISOString().replace("T", " ").substr(0, 19),
      status: 200,
      msg: "OK",
      result: paginatedResults,
    })

    return setCorsHeaders(response)
  } catch (error) {
    const errorResponse = NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    return setCorsHeaders(errorResponse)
  }
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 200 }))
}
