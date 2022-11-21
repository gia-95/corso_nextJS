import axios from 'axios'

//test mod git
// backtips ALT + 96

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// Le interfacce definisco il tipo (come le classi)
interface Todo {
    id: number,
    title: string,
    completed: boolean
}

axios.get(url).then(response => {
    const todo = response.data as Todo; // della struttura dell'interfaccia Todo

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    console.log(`
    The Todo ID: ${id}
    The title: ${title}
    Th finisched: ${completed}
    `);

    logTodo(id, title, completed)
});


const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`
    The Todo ID: ${id}
    The title: ${title}
    Th finisched: ${completed}
    `);
};




