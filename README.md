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

# Hooks do React (useSomething)

## useEffect

Todo useEffect é executado assim que o componente é renderizado, e toda vez que uma das dependências for alterada. Caso não seja passado nenhuma dependência, o useEffect será executado somente na primeira renderização.

```jsx
import { useEffect } from 'react';

function avisarAPI() {
  console.log('Lista salva no backend!')
}

export function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (list.length > 0) {
      avisarAPI();
    }
  }, [list]); // fica monitorando a lista, e toda vez que ela for alterada, o useEffect é chamado

  function addToList(){
    setList((state) =>[...state, 'Novo item']);
  }

  return (
    <div>
      <ul>
        {list.map((item) => (<li key={item}>{item}</li>))}
      </ul>

      <button onClick={addToList}>Adicionar item</button>
    </div>
  );
}
```