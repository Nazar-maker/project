import { useState, useEffect } from "react";
import phServices from "./services/phServices";

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

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type === "error") {
    const notificationStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: "20",
      borderStyle: "solid",
      borderRadius: "5",
      padding: "10",
      marginBottom: "10",
    };
    return <div style={notificationStyle}>{message}</div>;
  }
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20",
    borderStyle: "solid",
    borderRadius: "5",
    padding: "10",
    marginBottom: "10",
  };
  return <div style={notificationStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  const [addedNotification, setAddedNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  const addToPhonebook = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((n) => n.name === newName);
        const changedPerson = { ...person, number: newPhone };
        phServices
          .update(person.id, changedPerson)
          .then((response) => {
            setPersons(persons.map((p) => (p.name === newName ? response : p)));
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${person.name} has alrady been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };
      phServices.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setAddedNotification(`Added ${personObject.name}`);
        setTimeout(() => {
          setAddedNotification(null);
        }, 3000);
      });
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
  const handleDelete = (id) => {
    const person = persons.filter((n) => n.id === id);
    if (window.confirm(`Delete ${person[0].name}?`)) {
      phServices.remove(id);
      setPersons(persons.toSpliced(persons.indexOf(person[0]), 1));
    }
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
      <Notification message={addedNotification} />
      <Notification message={errorMessage} type={"error"} />
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
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} {"      "}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
