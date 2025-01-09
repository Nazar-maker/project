const Header = ({ course }) => <h1>{course}</h1>;
const Content = ({ parts }) => (
  <>
    {parts.map((p) => (
      <p key={p.id}>
        {p.name} {p.exercises}
      </p>
    ))}
  </>
);
const Total = ({ sum }) => <strong>total of {sum} exercises</strong>;

const Course = (props) => {
  const { courses } = props;
  function getSum(total, num) {
    return total + num;
  }

  return (
    <div>
      {courses.map((c) => (
        <>
          <Header course={c.name} />
          <Content parts={c.parts} />
          <Total
            sum={c.parts.map((part) => part.exercises).reduce(getSum, 0)}
          />
        </>
      ))}
    </div>
  );
};

export default Course;
