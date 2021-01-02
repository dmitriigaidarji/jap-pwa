import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

interface IResult{
  data: Array<{
    "character": string,
    "transcription": string
  }>,
  transcriptions: string[]
}

export function getHiraganaData(): IResult {
  const fullPath = path.join(dataDirectory, 'hiragana.json')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const parsed: IResult['data'] = JSON.parse(fileContents);
  return {
    data: parsed,
    transcriptions: parsed.map((t) => t.transcription)
  }
}
