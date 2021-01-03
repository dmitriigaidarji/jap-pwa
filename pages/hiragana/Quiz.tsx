import * as React from 'react';
import styles from '../../styles/Quiz.module.css'

import cn from 'classnames'
import {shuffle} from "../../lib/helpers";

export interface IQuizProps {
  data: Array<{
    "character": string;
    "transcription": string;
    level: number
  }>,
  transcriptions: Array<{
    value: string;
    level: number
  }>
}


enum Status {
  idle,
  picked
}

interface IScore{
  correct: number, wrong: number
}
const initialCountsState: IScore = {correct: 0, wrong: 0};

const reducer: React.Reducer<IScore, {type: 'correct' | 'wrong'}> = (state, action) => {
  switch (action.type) {
    case 'correct':
      return {...state, correct: state.correct + 1};
    case 'wrong':
      return {...state, wrong: state.wrong + 1};
    default:
      throw new Error();
  }
}
const NUMBER_OF_OPTIONS = 6;
const Quiz: React.FC<IQuizProps> = ({data, transcriptions}) => {
  const statusRef = React.useRef(Status.idle)
  const [score, dispatchScore] = React.useReducer(reducer, initialCountsState)
  const [currentItem, setCurrentItem] = React.useState<{
    value: {
      "character": string;
      "transcription": string;
    },
    choices: string[]
  } | undefined>(undefined)

  const [mistakes, setMistakes] = React.useState<string[]>([])
  const [selection, setSelection] = React.useState<{
    value: string,
    correct: boolean
  } | undefined>(undefined)

  const setRandomItem = React.useCallback(() => {
    setSelection(undefined)
    let item = data[Math.round((data.length - 1) * Math.random())];
    if (mistakes.length > 0 && Math.random() > 0.7){
      const mistake = mistakes.splice(Math.round((mistakes.length - 1) * Math.random()), 1)[0]
      const found = data.find((t) => t.character === mistake);
      if (found){
        item = found;
      }
    }

    const choices = [item.transcription];
    const trans = transcriptions.filter((t) => t.level === item.level)
    while (choices.length !== NUMBER_OF_OPTIONS) {
      const randomVal = trans[Math.round((trans.length - 1) * Math.random())];
      if (!choices.includes(randomVal.value)) {
        choices.push(randomVal.value);
      }
    }
    setCurrentItem({
      value: item,
      choices: shuffle(choices)
    })

  }, [data, transcriptions, mistakes])

  const handleChoiceClick = React.useCallback((value: string) => {
    if (statusRef.current === Status.idle) {
      const correct =  currentItem.value.transcription === value
      setSelection({
        value,
        correct
      })
      dispatchScore({type: correct ? 'correct' : 'wrong'})
      if (!correct){
        mistakes.push(currentItem.value.character)
      }
    }
  }, [currentItem, statusRef, mistakes])

  React.useEffect(() => {
    setRandomItem();
  }, [setRandomItem]);


  React.useEffect(() => {
    if (selection !== undefined){
      statusRef.current = Status.picked;
      setTimeout(() => setRandomItem(), selection.correct ? 500 : 2000 )
    }else{
      statusRef.current = Status.idle
    }
  }, [selection, statusRef, setRandomItem])

  return <div className={styles.container}>
    <div className={styles.score}>
      <span className={styles.correctScore}>{score.correct}</span>
      <span className={styles.incorrectScore}>{score.wrong}</span>
    </div>
    {currentItem &&
    <>
      <div className={styles.displayCharacter}>
        {currentItem.value.character}
      </div>
      <div className={styles.grid}>
        {currentItem.choices.map((t) => <Choice
          key={t}
          value={t}
          onClick={handleChoiceClick}
          status={selection ? (
            selection.correct ? (selection.value === t ? 'correct' : 'neutral')
              : (selection.value === t ? 'incorrect' : (t === currentItem.value.transcription ? 'correct' : 'neutral'))
          ) : 'neutral'}
        />)}
      </div>
    </>
    }
  </div>
}

interface IChoiceProps<T extends string> {
  value: T,
  onClick: (value: T) => void,
  status: 'correct' | 'incorrect' | 'neutral'
}

const Choice: React.FC<IChoiceProps<string>> = ({value, onClick, status}) => {
  const handleClick = React.useCallback(() => {
    onClick(value)
  }, [value, onClick])
  return <div onClick={handleClick} className={cn({
    [styles.correct]: status === 'correct',
    [styles.incorrect]: status === 'incorrect',
    [styles.neutral]: status === 'neutral'
  }, styles.card)}>
    <div className={styles.center}>{value}</div>
  </div>
}
export default Quiz;
