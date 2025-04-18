import { NextResponse } from "next/server"
import { setCorsHeaders } from "@/app/lib/cors"
export const runtime = 'edge';
export const revalidate = 86400 // Revalidate every 24 hours (1 day)

export async function GET() {
  const currentTime = new Date().toISOString()

  const response = NextResponse.json({
    msg: "API Documentation",
    server_time: currentTime,
    status: 200,
    endpoints: [
      {
        method: "GET",
        path: "/api/list",
        description: "Mengambil daftar data dengan paginasi dan pencarian.",
        params: [
          { name: "page", type: "integer", description: "Nomor halaman (default: 1)" },
          { name: "per_page", type: "integer", description: "Jumlah item per halaman (default: 10)" },
        ],
        response: {
          msg: "OK",
          server_time: "string",
          status: 200,
          result: {
            total_pages: "integer",
            files: [
              {
                single_img: "string",
                protected_embed: "string",
                splash_img: "string",
                views: "integer",
                last_view: "integer",
                filecode: "string",
                canplay: "boolean",
                title: "string",
                status: 200,
                size: "integer",
                protected_dl: "string",
                uploaded: "string",
                length: "integer",
                file_code: "string",
              },
            ],
            results_total: "integer",
            results: "integer",
          },
        },
      },
      {
        method: "GET",
        path: "/api/rand",
        description: "Mengambil daftar data secara acak dengan paginasi.",
        params: [
          { name: "page", type: "integer", description: "Nomor halaman (default: 1)" },
          { name: "per_page", type: "integer", description: "Jumlah item per halaman (default: 50)" },
        ],
        response: {
          msg: "OK",
          server_time: "string",
          status: 200,
          result: {
            total_pages: "integer",
            files: [
              {
                single_img: "string",
                protected_embed: "string",
                splash_img: "string",
                views: "integer",
                last_view: "integer",
                filecode: "string",
                canplay: "boolean",
                title: "string",
                status: 200,
                size: "integer",
                protected_dl: "string",
                uploaded: "string",
                length: "integer",
                file_code: "string",
              },
            ],
            results_total: "integer",
            results: "integer",
          },
        },
      },
      {
        method: "GET",
        path: "/api/info",
        description: "Mengambil informasi detail tentang file berdasarkan file_code.",
        params: [{ name: "file_code", type: "string", description: "Kode unik file" }],
        response: {
          msg: "OK",
          server_time: "string",
          status: 200,
          result: {
            single_img: "string",
            protected_embed: "string",
            splash_img: "string",
            views: "integer",
            last_view: "integer",
            filecode: "string",
            canplay: "boolean",
            title: "string",
            status: 200,
            size: "integer",
            protected_dl: "string",
            uploaded: "string",
            length: "integer",
            file_code: "string",
          },
        },
      },
      {
        method: "GET",
        path: "/api/search",
        description: "Mencari data berdasarkan query pencarian.",
        params: [
          { name: "q", type: "string", description: "Query pencarian" },
          { name: "page", type: "integer", description: "Nomor halaman (default: 1)" },
          { name: "per_page", type: "integer", description: "Jumlah item per halaman (default: 10)" },
        ],
        response: {
          msg: "OK",
          result: [
            {
              single_img: "string",
              protected_embed: "string",
              splash_img: "string",
              views: "integer",
              last_view: "integer",
              filecode: "string",
              canplay: "boolean",
              title: "string",
              status: 200,
              size: "integer",
              protected_dl: "string",
              uploaded: "string",
              length: "integer",
              file_code: "string",
            },
          ],
          status: 200,
          server_time: "string",
          pagination: {
            page: "integer",
            per_page: "integer",
            total_results: "integer",
            total_pages: "integer",
          },
        },
      },
    ],
  })

  return setCorsHeaders(response)
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 200 }))
}

