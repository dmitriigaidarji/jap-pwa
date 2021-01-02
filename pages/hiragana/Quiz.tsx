import * as React from 'react';

export interface IQuizProps {
  data: Array<{
    "character": string;
    "transcription": string;
  }>,
  transcriptions: string[]
}
function shuffle(array: string[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const Quiz: React.FC<IQuizProps> = ({data, transcriptions}) => {
  const [currentItem, setCurrentItem] = React.useState<{
    value: {
      "character": string;
      "transcription": string;
    },
    choices: string[]
  } | undefined>(undefined)

  const setRandomItem = React.useCallback(() => {
    const item = data[Math.round((data.length - 1) * Math.random())];
    const choices = [item.transcription];
    while (choices.length !== 4){
      const randomVal = transcriptions[Math.round((transcriptions.length - 1) * Math.random())];
      if (!choices.includes(randomVal)){
        choices.push(randomVal);
      }
    }
    setCurrentItem({
      value: item,
      choices: shuffle(choices)
    })

  }, [data, transcriptions])

  React.useEffect(() => {
    setRandomItem();
  }, [setRandomItem])
  return <div>
    {JSON.stringify(currentItem)}
  </div>
}

export default Quiz;
