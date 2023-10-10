import { useState } from "react";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const StatisticLine = ({ name, count }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{count}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine name="good" count={good} />
            <StatisticLine name="neutral" count={neutral} />
            <StatisticLine name="bad" count={bad} />
            <StatisticLine name="total" count={total} />
            <StatisticLine name="average" count={average} />
            <StatisticLine name="positive" count={positive + "%"} />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} name="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button handleClick={() => setBad(bad + 1)} name="bad" />
      <Heading text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
