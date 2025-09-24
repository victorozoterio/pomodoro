# Como criar um projeto react?

Basta executar o comando:
```shell
npm create vite@latest
```

# Formulário Controlled vs Uncontrolled (React Hook Form)

## Controlled

```jsx
export function App() {
  const [task, setTask] = useState('');

  return (
    <form>
      <input 
      id="task" 
      list="task-suggestions" 
      placeholder="Digite o nome da sua tarefa"
      onChange={(e) => setTask(e.target.value)} 
      value={task}
      />
    </form>
  );
}
```

## Uncontrolled

```jsx
export function App() {
  function handleSubmit(event) {
    event.target.task.value;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      id="task" 
      list="task-suggestions" 
      placeholder="Digite o nome da sua tarefa"
      />
    </form>
  );
}
```