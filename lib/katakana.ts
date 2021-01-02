import {getLangData, IGetHiraganaDataResult} from "./loadLang";

export function getKatakanaData(): IGetHiraganaDataResult {
  return getLangData('katakana.json')
}

