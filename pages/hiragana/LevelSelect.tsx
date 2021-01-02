import * as React from 'react';
import Quiz, {IQuizProps} from "./Quiz";
import {IGetHiraganaDataResult} from "../../lib/hiragana";


const LevelSelect: React.FC<IGetHiraganaDataResult> = (props) => {
  const {levels, data} = props;
  const [options, setOptions] = React.useState<number[]>([]);
  const [selection, setSelection] = React.useState<number[]>([]);
  const [quizData, setQuizData] = React.useState<IQuizProps | undefined>(undefined)
  React.useEffect(() => {
    setSelection(levels.slice())
    setOptions(levels.slice());
  }, [levels])

  const handleSelect = React.useCallback((value: number) => {
    const index = selection.indexOf(value);
    if (index !== -1) {
      if (selection.length > 1) {
        selection.splice(index, 1)
      }
    } else {
      selection.push(value);
    }
    setSelection(selection.slice());

  }, [selection]);

  const startQuiz = React.useCallback(() => {
    const filtered = data.filter((t) => selection.includes(t.level));
    setQuizData({
      data: filtered,
      transcriptions: filtered.map((t) => ({
        value: t.transcription,
        level: t.level
      }))
    })
  }, [data, selection])
  return quizData ? <Quiz {...quizData}/> : <div>
    {options.map((t) => <Option
      checked={selection.includes(t)}
      example={data.find((d) => d.level === t)?.character}
      onClick={handleSelect}
      value={t}/>)}
    <button type={'submit'} onClick={startQuiz}>Start</button>
  </div>
}

const Option: React.FC<{ value: number; checked: boolean, example?: string, onClick: (value: number) => void }> =
  ({value, checked, example, onClick}) => {
    const handleClick = React.useCallback(() => {
      onClick(value);
    }, [onClick, value])
    return <p>
      <label><input type={'checkbox'} checked={checked} onChange={handleClick}/> Level {value} {example}</label>
    </p>
  }
export default LevelSelect;
