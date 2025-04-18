import { NextResponse } from "next/server";
import { fetchDataWithCache } from "@/app/lib/fetchData";
import { setCorsHeaders } from "@/app/lib/cors";
import { processTitle } from "@/app/lib/titleProcessor";
export const runtime = 'edge';
export const revalidate = 86400; // Revalidate every 24 hours (1 day)

// Define the type for the file object based on the JSON response
interface File {
  single_img: string;
  title: string;
  file_code: string;
  uploaded: string;
  canplay: number; // Note: In the JSON, `canplay` is a number (1 or 0)
  download_url: string;
  views: string; // Note: In the JSON, `views` is a string
  fld_id: string;
  splash_img: string;
  public: string;
  length: string; // Note: In the JSON, `length` is a string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1");
  const perPage = Number.parseInt(searchParams.get("per_page") || "50");

  try {
    const data = await fetchDataWithCache();

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedFiles = data.slice(startIndex, endIndex);

    const response = NextResponse.json({
      result: {
        total_pages: data.length,
        results_total: data.length.toString(),
        results: paginatedFiles.length,
        files: paginatedFiles.map((file: File) => ({
          public: file.public,
          single_img: file.single_img,
          canplay: file.canplay,
          uploaded: file.uploaded,
          views: file.views,
          length: file.length,
          download_url: file.download_url,
          file_code: file.file_code,
          title: file.title,
          fld_id: file.fld_id,
          splash_img: file.splash_img,
        })),
        per_page_limit: perPage.toString(),
      },
      status: 200,
      msg: "OK",
      server_time: new Date().toISOString().replace("T", " ").substr(0, 19),
    });

    return setCorsHeaders(response);
  } catch (error) {
    const errorResponse = NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    return setCorsHeaders(errorResponse);
  }
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 200 }));
}