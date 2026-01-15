import React, { useState, useEffect, Suspense, useRef } from 'react';
import supabase from "../../supabaseClient";

import AppContext from '../appContext';

import '../App.css'

import DataTable from '../components/Table';



function Home() {


  const [todos, setTodos] = useState(null);
  const [todoLogs, setTodoLogs] = useState(null);

  const [input, setInput] = useState("");

  const [listUpdated, setListUpdated] = useState(1);

  const [dataTable, setDataTable] = useState(null);




  async function addTodo() {

    var inputFormatted = input;



    const { data, error } = await supabase
      .from('todos')
      .insert({ title: inputFormatted})
      .select()


    const { error1 } = await supabase
      .from('todo-completions')
      .insert({ id: data[0].id})

    setListUpdated(listUpdated + 1);


    console.log(listUpdated)



  }

  async function toggleTodo(todo) {



      if (todo.is_completed) {
        const { error } = await supabase
          .from('todos')        
          .update({ is_completed: 'FALSE' })
          .eq('id', todo.id)

      } else if (!todo.is_completed) {

        const { error } = await supabase
          .from('todos')    
          .update({ is_completed: 'TRUE' })
          .eq('id', todo.id) 

      }


  }

  async function deleteTodo(id) {

    setListUpdated(listUpdated + 1)

    console.log("delete todo func")

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    const { error1 } = await supabase
      .from('todo-completions')
      .delete()
      .eq('id', id)




    console.log(listUpdated)

  }




  useEffect(() => {

    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select()

        if (error) {
          setTodos(null)
          console.log(error)

        }
        if (data) {
          setTodos(data)

        }
    }

    fetchTodos()

    const fetchTodoLogs = async () => {
      const { data, error } = await supabase
        .from('todo-completions')
        .select()

        if (error) {
          setTodoLogs(null)
          console.log(error)

        }

        if (data) {
          setTodoLogs(data)

        }
    }

    fetchTodoLogs()

  }, [listUpdated])


  useEffect(() => {

    console.log("table render rerun")

    if (todos && todoLogs) {

      console.log("render rerun, made past if statmenet")

      setDataTable(<DataTable todos={todos} todoLogs={todoLogs} deleteTodo={deleteTodo} toggleTodo={toggleTodo}></DataTable>)
  

    } else {

      console.log("1.3 could not updated table")

    }

  }, [listUpdated, todos, todoLogs])



  return (
    <div className='flex-row w-fit m-auto mt-5'>

      <h3 className='text-2xl underline text-center'>Your Habits:</h3>

      <div className='flex border-2 border-black rounded-xl m-5 px-3 items-center w-fit'>

        <p>Habit Name:</p>
        <input onInput={e => setInput(e.target.value)} value={input} type='text' className='border-2 h-7 ml-2 border-black'></input>
        <button className='m-3 px-2 bg-gray-200 border-2' onClick={addTodo}>Add New Habit</button>

      </div>

      {dataTable} 
      


    </div>



  );

}

export default Home