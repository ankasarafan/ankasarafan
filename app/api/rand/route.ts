import { NextResponse } from "next/server"
import { fetchDataWithCache } from "@/app/lib/fetchData"
import { setCorsHeaders } from "@/app/lib/cors"
import { processTitle } from "@/app/lib/titleProcessor"
export const runtime = 'edge';
export const revalidate = 86400 // Revalidate every 24 hours (1 day)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const perPage = Number.parseInt(searchParams.get("per_page") || "50")

  try {
    const data = await fetchDataWithCache()

    // Mengacak data menggunakan algoritma Fisher-Yates shuffle
    const shuffledData = [...data]
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]]
    }

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedFiles = shuffledData.slice(startIndex, endIndex)

    const response = NextResponse.json({
      result: {
        total_pages: data.length,
        results_total: data.length.toString(),
        results: paginatedFiles.length,
        files: paginatedFiles.map((file) => ({
          public: "1",
          single_img: file.single_img,
          canplay: file.canplay ? 1 : 0,
          uploaded: file.uploaded,
          views: file.views.toString(),
          length: file.length.toString(),
          download_url: file.download_url,
          file_code: file.file_code,
          title: file.title,
          fld_id: "0",
          splash_img: file.splash_img,
        })),
        per_page_limit: perPage.toString(),
      },
      status: 200,
      msg: "OK",
      server_time: new Date().toISOString().replace("T", " ").substr(0, 19),
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

