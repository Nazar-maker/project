import { useState } from "react";
const Filter = (props) => {
  const { searchName, handleSearchChanged } = props;
  return (
    <div>
      filter shown with{" "}
      <input value={searchName} onChange={handleSearchChanged} />
    </div>
  );
};
const PersonForm = (props) => {
  const { lInfo } = props;
  return (
    <form onSubmit={lInfo[0]}>
      <div>
        name: <input value={lInfo[1]} onChange={lInfo[2]} />
      </div>
      <div>
        number: <input value={lInfo[3]} onChange={lInfo[4]} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  const { show } = props;
  return (
    <>
      {show.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  const addToPhonebook = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).includes(newName))
      alert(`${newName} is already added to phonebook`);
    else {
      const personObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewPhone("");
  };
  const handleNameChanged = (event) => {
    setNewName(event.target.value);
  };
  const hanlePhoneChanged = (event) => {
    setNewPhone(event.target.value);
  };
  const handleSearchChanged = (event) => {
    setSearchName(event.target.value);
  };
  const personsToShow =
    searchName.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        handleSearchChanged={handleSearchChanged}
      />

      <h3>Add a New</h3>
      <PersonForm
        lInfo={[
          addToPhonebook,
          newName,
          handleNameChanged,
          newPhone,
          hanlePhoneChanged,
        ]}
      />

      <h3>Numbers</h3>
      <Persons show={personsToShow} />
    </div>
  );
};

export default App;
