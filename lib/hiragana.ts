import {getLangData, IGetHiraganaDataResult} from "./loadLang";

export function getHiraganaData(): IGetHiraganaDataResult {
  return getLangData('hiragana.json')
}

