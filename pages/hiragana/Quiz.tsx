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

  const [selection, setSelection] = React.useState<{
    value: string,
    correct: boolean
  } | undefined>(undefined)

  const setRandomItem = React.useCallback(() => {
    setSelection(undefined)
    const item = data[Math.round((data.length - 1) * Math.random())];
    const choices = [item.transcription];
    const trans = transcriptions.filter((t) => t.level === item.level)
    while (choices.length !== 4) {
      const randomVal = trans[Math.round((trans.length - 1) * Math.random())];
      if (!choices.includes(randomVal.value)) {
        choices.push(randomVal.value);
      }
    }
    setCurrentItem({
      value: item,
      choices: shuffle(choices)
    })

  }, [data, transcriptions])

  const handleChoiceClick = React.useCallback((value: string) => {
    if (statusRef.current === Status.idle) {
      const correct =  currentItem.value.transcription === value
      setSelection({
        value,
        correct
      })
      dispatchScore({type: correct ? 'correct' : 'wrong'})
    }
  }, [currentItem, statusRef])

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
