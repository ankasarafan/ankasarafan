import { NextResponse } from "next/server"
import { fetchDataWithCache } from "@/app/lib/fetchData"
import { setCorsHeaders } from "@/app/lib/cors"
import { processTitle } from "@/app/lib/titleProcessor"

export const runtime = 'edge';
export const revalidate = 86400 // Revalidate every 24 hours (1 day)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileCode = searchParams.get("file_code")

  if (!fileCode) {
    const errorResponse = NextResponse.json({ error: "file_code is required" }, { status: 400 });
    return setCorsHeaders(errorResponse);
    return setCorsHeaders(errorResponse)
  }

  try {
    const data = await fetchDataWithCache()

    const fileInfo = data.find((file: any) => file.file_code === fileCode);

    if (!fileInfo) {
      const notFoundResponse = NextResponse.json({ error: "File not found. Please check the file_code." }, { status: 404 });
      return setCorsHeaders(notFoundResponse)
    }

    const response = NextResponse.json({
      status: 200,
      result: [
        {
          filecode: fileInfo.file_code,
          size: fileInfo.size.toString(),
          status: 200,
          protected_embed: fileInfo.protected_embed,
          uploaded: fileInfo.uploaded,
          last_view: new Date().toISOString().replace("T", " ").substr(0, 19),
          canplay: fileInfo.canplay ? 1 : 0,
          protected_dl: fileInfo.protected_dl,
          single_img: fileInfo.single_img,
          title: fileInfo.title,
          views: fileInfo.views.toString(),
          length: fileInfo.length.toString(),
          splash_img: fileInfo.splash_img,
        },
      ],
      server_time: new Date().toISOString().replace("T", " ").substr(0, 19),
      msg: "OK",
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
