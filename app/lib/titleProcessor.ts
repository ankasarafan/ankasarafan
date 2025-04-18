const additionalKeywords = [
  "sotwe",
  "bokep dood",
  "twitter",
  "bokepsatset",
  "simontok",
  "terbaru",
  "video",
  "bokep video",
  "simintok",
  "xpanas",
  "Full album",
  "baru",
  "montok",
  "memek",
  "bokep",
  "asupan",
  "doodstream",
  "bokepsin",
  "bebasindo",
  "pekoblive",
  "terabox",
  "streaming",
  "viral",
  "indo",
  "tiktok",
  "telegram",
  "Doodstream",
  "Doods",
  "Pro",
  "Telegram",
  "Full",
  "Album",
  "Viral",
  "Videos",
  "Poophd",
  "Twitter",
  "Bochiel",
  "Asupan",
  "Link",
  "Streaming",
  "Web",
  "Folder",
  "Cilbo",
  "Live",
  "Tele",
  "Terupdate",
  "Terbaru",
  "Links",
  "Lokal",
  "Dodstream",
  "Bokep",
  "Pemersatu",
  "Video",
  "Update",
  "Dood",
  "Doostream",
  "Website",
  "Downloader",
  "Indo",
  "Lulustream",
  "Sotwe",
  "Doodsflix",
  "Yakwad",
  "Doodflix",
  "Tobrut",
  "Lagi Viral",
  "Stw",
  "Doodstreem",
  "Sumenep",
  "Malam",
  "Jilbab",
  "Sesuai",
  "Gambar",
  "Colmek",
  "Binor",
  "Davis",
  "Smp",
  "Vk",
  "Asupan viral",
  "Download",
  "New",
  "Movies",
  "Hijab",
  "Hijabers",
  "Rusia",
  "tele",
  "Bangsa",
  "Pejuang",
  "Lendir",
  "Popstream",
  "Staklam",
  "viral dood",
  "Cpasmieux",
  "Prank",
  "Ojol",
]

export function processTitle(title: string): string {
  // Split the title into words and limit to 7
  let words = title.split(/\s+/).slice(0, 7)

  // Convert to lowercase for easier comparison and remove duplicates
  words = Array.from(new Set(words.map((word) => word.toLowerCase())))

  // Create a copy of additionalKeywords to shuffle
  const shuffledKeywords = [...additionalKeywords]

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledKeywords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledKeywords[i], shuffledKeywords[j]] = [shuffledKeywords[j], shuffledKeywords[i]]
  }

  // Add additional keywords until we reach 12 words
  let index = 0
  while (words.length < 12 && index < shuffledKeywords.length) {
    const newWord = shuffledKeywords[index].toLowerCase()
    if (!words.includes(newWord)) {
      words.push(newWord)
    }
    index++
  }

  // Capitalize the first letter of each word
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

