import { useState } from "react";

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};
const Display = (props) => {
  const { text, value, unit } = props;
  return (
    <>
      {text} {value}
      {unit}
    </>
  );
};
const StatisticsLine = (props) => {
  const { text, value } = props;
  if (text === "positive")
    return (
      <div>
        <Display text={text} value={value} unit="%" />
      </div>
    );
  return (
    <div>
      <Display text={text} value={value} />
    </div>
  );
};
const Statistics = (props) => {
  const { stat } = props;
  return (
    // <div>
    //   <StatisticsLine text="good" value={stat[0]} />
    //   <StatisticsLine text="neutral" value={stat[1]} />
    //   <StatisticsLine text="bad" value={stat[2]} />
    //   <StatisticsLine text="all" value={stat[3]} />
    //   <StatisticsLine text="average" value={stat[4]} />
    //   <StatisticsLine text="positive" value={stat[5]} />
    // </div>
    <table>
      <tbody>
        <tr>
          <td>good </td>
          <td>{stat[0]}</td>
        </tr>
        <tr>
          <td>neutral </td>
          <td>{stat[1]}</td>
        </tr>
        <tr>
          <td>bad </td>
          <td>{stat[2]}</td>
        </tr>
        <tr>
          <td>all </td>
          <td>{stat[3]}</td>
        </tr>
        <tr>
          <td>average </td>
          <td>{stat[4]}</td>
        </tr>
        <tr>
          <td>postive </td>
          <td>{stat[5]}</td>
        </tr>
      </tbody>
    </table>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const setToGood = () => {
    const updatedGood = good + 1;
    const sum = updatedGood + neutral + bad;
    const average = (updatedGood - bad) / sum;
    const positive = (updatedGood / sum) * 100;
    setGood(updatedGood);
    setAll(sum);
    setAverage(average);
    setPositive(positive);
  };
  const setToNeutral = () => {
    const updatedNeutral = neutral + 1;
    const sum = good + updatedNeutral + bad;
    const average = (good - bad) / sum;
    const positive = (good / sum) * 100;
    setNeutral(updatedNeutral);
    setAll(updatedNeutral + good + bad);
    setAll(sum);
    setAverage(average);
    setPositive(positive);
  };
  const setToBad = () => {
    const updatedBad = bad + 1;
    const sum = good + neutral + updatedBad;
    const average = (good - updatedBad) / sum;
    const positive = (good / sum) * 100;
    setBad(updatedBad);
    setAll(updatedBad + good + neutral);
    setAll(sum);
    setAverage(average);
    setPositive(positive);
  };
  const categories = [good, neutral, bad, all, average, positive];
  if (all === 0)
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={setToGood} text="good" />
        <Button onClick={setToNeutral} text="neutral" />
        <Button onClick={setToBad} text="bad" />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setToGood} text="good" />
      <Button onClick={setToNeutral} text="neutral" />
      <Button onClick={setToBad} text="bad" />
      <h1>statistics</h1>
      <Statistics stat={categories} />
    </div>
  );
};

export default App;
