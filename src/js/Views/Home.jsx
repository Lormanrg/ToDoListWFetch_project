import React, { useEffect, useState } from "react";

const initialTask = {
  label: "",
  done: false,
};
const urlBase = "http://assets.breatheco.de/apis/fake/todos/user";

const Home = () => {
  const [task, setTask] = useState(initialTask);
  const [allTask, setAllTask] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.label.trim() != "") {
      // setAllTask([...allTask, task]);
      updateData();
      setTask(initialTask);
      setError(false);
    } else {
      setError(true);
      console.log();
    }
  };

  //   const PressOnClick = (event) => {};

  const delTask = async (id) => {
    let newListTask = allTask.filter((item, index) => index != id);
    try {
      let response = await fetch(`${urlBase}/lorman`, {
        method: "PUT",
        body: JSON.stringify(newListTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    setAllTask(newListTask);
  };

  const getData = async () => {
    try {
      let response = await fetch(`${urlBase}/lorman`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setAllTask(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = async () => {
    try {
      let response = await fetch(`${urlBase}/lorman`, {
        method: "PUT",
        body: JSON.stringify([...allTask, task]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <ul>
          <h1>To Do List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What do you need to do?"
              name="label"
              className="form-control"
              value={task.label}
              onChange={handleChange}
            ></input>
            {error ? (
              <div className="alert alert-danger">
                "The cell mustn't be empty"
                <i className="fa-solid fa-face-frown"></i>
              </div>
            ) : null}

            {allTask.map((item, index) => {
              return (
                <li key={index} className="form-control">
                  {item.label}
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => delTask(index)}
                  ></i>
                </li>
              );
            })}
          </form>
        </ul>
        <div className="numberTasks form-control">
          {allTask.length} tasks left
        </div>
      </div>
    </>
  );
};

export default Home;
