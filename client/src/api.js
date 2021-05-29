export const getTodos = () => fetch("/api/").then(res => { 
  
  return res.json() })

export const createTodo = (todo) => fetch("/api/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})

export const updateTodo = (todo, id) => fetch(`/api/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})

export const getTodo = (id) => fetch(`/api/${id}`).then(res => res.json())