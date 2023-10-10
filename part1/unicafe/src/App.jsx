import { useState } from "react";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const Stat = ({ name, count }) => {
  return (
    <p>
      {name} {count}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <Stat name="good" count={good} />
      <Stat name="neutral" count={neutral} />
      <Stat name="bad" count={bad} />
    </div>
  );
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
