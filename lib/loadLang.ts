import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

export interface IGetHiraganaDataResult {
  data: Array<{
    "character": string,
    "transcription": string,
    level: number
  }>,
  levels: number[]
}

export function getLangData(fileName: string): IGetHiraganaDataResult {
  const fullPath = path.join(dataDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const parsed: IGetHiraganaDataResult['data'] = JSON.parse(fileContents);
  return {
    data: parsed,
    levels: Array.from(new Set<number>(parsed.map((t) => t.level))).sort()
  }
}

