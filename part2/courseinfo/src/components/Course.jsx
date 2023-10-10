/* eslint-disable react/prop-types */
const Header = (props) => <h2>{props.course.name}</h2>;

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </>
);

const Total = (props) => {
	const parts = props.course.parts.map(course => course.exercises)
	const total = parts.reduce((s, p) => s + p)
	return <p><strong>total of {total} exercises</strong></p>
}

const Course = (props) => {
	return (
		<>
			<Header course={props.course} />
			<Content course={props.course} />
			<Total course={props.course} />
		</>
	)
};

export default Course;
