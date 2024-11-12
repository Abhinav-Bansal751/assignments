import { ChangeEvent, FormEvent, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  // State for all todos
  const [todos,setTodos] = useState([]);
  // todoItem is the current todo you are filling out (with the title and description).

  // State for the current todo being added or updated
  const [todoitem,setTodoItem] = useState({   id: nanoid(),title: "", description: "" });
  // todos is the collection of all your todos that you have added so far.

  // Handle input change for title and description
  function handleInputChange(e){
    const { name, value } = e.target;
    // console.log("name is ",name);
    setTodoItem((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  function handleAddTodo(){
    // Add newTodo to the todos array
    //check before adding ,that we have both title and description or not
    if(todoitem.title && todoitem.description){
      const newTodo = {
        id: nanoid(),
        title:todoitem.title,
        description:todoitem.description
      }
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      console.log(newTodo);
    }

   // Reset input fields
   setTodoItem({ title: "", description: "" });
  } 


   // Handle deleting a todo
   function handleDelete(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // Remove todo with matching id
    setTodos(updatedTodos); // Update the todos state
  }

  //editing todo
  function handleEdit(id){

    const todoToEdit = todos.find((item) => item.id === id );
    // setTodoItem(todoToEdit);
    setTodoItem({
      title: todoToEdit.title,
      description: todoToEdit.description,
    });
  }


  return (
    <div className="flex items-center justify-center h-full w-full bg-black">
      <h1>
      Todo app
      </h1>
        <input
        type="text"
        placeholder="Enter Title"
        value={todoitem.title}
        onChange={handleInputChange}
        name="title"
        // The onChange function (handleInputChange) updates the correct property in todoItem as the user types.
        />
        <input
        type="text"
        placeholder="Enter Description"
        value={todoitem.description}
        onChange={handleInputChange}
        name="description"
        //the name property is used to tell react which property of todoitem is being updated
        />
        <button
        onClick={handleAddTodo}
        >Add</button>

        <div id="display-todo">
          <div >
          {todos.length === 0 ? (
            <p className="text-white">No todos yet. Please add some.</p>
          ) : (
            todos.map((item) => (
              <div key={item.id} id="todo">
                <h3 className="text-white font-bold">{item.title}</h3>
                <h4 className="text-gray-300">{item.description}</h4>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(item.id)} // Edit button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)} // Delete button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          </div>
        {/* {todoitem.title}
        {todoitem.description} */}
        </div>

    </div>
  );
}

export default App;