import React from 'react';

class DataTable extends React.Component {




    constructor(props) {
        super(props);

        this.todos = props.todos
        this.todoLogs = props.todoLogs
        this.deleteTodo = props.deleteTodo

      }


  render() {

    const data = this.todoLogs;
    

    // Map over the data to generate table rows

    try {

      console.log("made it to dataTable")

      const tableRows = data.map((todoLog) => (


        <tr key={todoLog.id}>
          <td>{this.todos.find(x => x.id === todoLog.id).title}</td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d09_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d08_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d07_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d06_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d05_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d04_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d03_04_24}></input></td>
          <td><input type="checkbox" onChange={() => {this.todos.find(x => x.id === todoLog.id)}} checked={todoLog.d02_04_24}></input></td>
          <td><button><i className="material-icons" onClick={() => {this.deleteTodo(todoLog.id)}}>delete</i></button></td>
        </tr>
      ));

      console.log("made it to dataTable v2")

      return (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>09/04</th>
              <th>08/04</th>
              <th>07/04</th>
              <th>06/04</th>
              <th>05/04</th>
              <th>04/04</th>
              <th>03/04</th>
              <th>02/04</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      );
     

    } catch (error) {

      console.log(error)

      return (<p>Table Loading...</p>)

    }
  }
}

export default DataTable;