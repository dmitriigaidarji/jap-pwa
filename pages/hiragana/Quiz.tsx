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

const Quiz: React.FC<IQuizProps> = ({data, transcriptions}) => {
  const statusRef = React.useRef(Status.idle)
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
    if (statusRef.current === Status.idle)
      setSelection({
        value,
        correct: currentItem.value.transcription === value
      })
  }, [currentItem, statusRef])

  React.useEffect(() => {
    setRandomItem();
  }, [setRandomItem]);


  React.useEffect(() => {
    if (selection !== undefined){
      statusRef.current = Status.picked;
      setTimeout(() => setRandomItem(), 1000)
    }else{
      statusRef.current = Status.idle
    }
  }, [selection, statusRef, setRandomItem])
  return <div className={styles.container}>
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
