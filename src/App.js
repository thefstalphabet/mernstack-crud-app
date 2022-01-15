import styled from "styled-components";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  // states for age and name and friends
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [friends, setFriends] = useState([]);

  // function which send data to the server
  const handleSubmit = () => {
    Axios.post("https://mernstack-crud-app.herokuapp.com/addfriend", { name: name, age: age })
      .then((res) => {
        alert("Sucessfully send to the server");
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Function to delete friend
  const handleDelete = (id) => {
    Axios.delete(`https://mernstack-crud-app.herokuapp.com/delete/${id}`)
      .then((res) => {
        alert("Delete request sended to the server");
        setFriends(
          friends.filter((ele) => {
            return ele._id !== id;
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  // function which update the data of friend
  const handleUpdate = (id) => {
    const newAge = prompt("Enter new age:");
    Axios.put("https://mernstack-crud-app.herokuapp.com/update", { id: id, newAge: newAge })
      .then((res) => {
        alert("updated data sended to the server");
        setFriends(
          friends.map((ele) => {
            return ele._id === id
              ? { _id: id, name: ele.name, age: newAge }
              : ele;
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };
  // Extrating all friend from database
  useEffect(() => {
    Axios.get("https://mernstack-crud-app.herokuapp.com/read")
      .then((response) => {
        setFriends(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Container>
      <Friends>
        {friends.map((ele) => {
          return (
            <div>
              <h2>Name: {ele.name}</h2>
              <p>Age: {ele.age}</p>
              <Button
                onClick={() => {
                  handleUpdate(ele._id);
                }}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  handleDelete(ele._id);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </Friends>
      <Form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Friend Name"
        />
        <input
          onChange={(e) => {
            setAge(e.target.value);
          }}
          value={age}
          type="number"
          placeholder="Friend Age"
        />
        <Button type="submit">Add Friend</Button>
      </Form>
    </Container>
  );
}

export default App;
const Container = styled.div`
  height: 100vh;
  padding: 10px;
`;
const Friends = styled.div`
  div {
    background-color: lightgreen;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 18px;
    padding: 5px 10px;
  }
  p {
    font-size: 16px;
    padding: 5px 10px;
  }
  Button {
    padding: 5px;
  }
`;
const Form = styled.form`
  margin-top: 20px;
  input {
    display: block;
    margin: 10px;
    padding: 10px;
    font-size: 14px;
    outline: none;
  }
`;
const Button = styled.button`
  padding: 10px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: green;
  border: none;
  color: white;
`;
