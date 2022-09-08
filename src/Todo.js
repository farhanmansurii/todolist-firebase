import React, { useEffect, useState } from "react"
import { Button, Container, Flex, Input, Text } from "@chakra-ui/react"
import { db } from "./firebase"
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  QuerySnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"

import { async } from "@firebase/util"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
const Todo = () => {
  const [inputData, setInputData] = useState("")
  const [todos, setTodos] = useState([])

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todo", id))
  }
  const updateTodo = async (todo) => {
    await updateDoc(doc(db, "todo", todo.id), {
      completed: !todo.completed,
    })
  }

  const onsubmitHandler = (e) => {
    e.preventDefault()
    if (inputData !== "") {
      addDoc(collection(db, "todo"), {
        input: { inputData },
        completed: false,
      })
    }
    setInputData("")
  }
  useEffect(() => {
    const q = query(collection(db, "todo"))
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let todosArray = []
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id })
      })
      setTodos(todosArray)
    })
    return () => unsub()
  }, [])
  return (
    <>
      <Container height="100vh" width="360px" bg="#FFCDD2">
        <form onSubmit={onsubmitHandler}>
          <Input
            variant="unstyled"
            bg="#FD7D96"
            size="lg"
            fontSize="xl"
            value={inputData}
            px="2rem"
            py="2"
            color="#4D4141"
            onChange={(e) => setInputData(e.target.value)}
            my="3rem"
          />
        </form>

        {todos.map((todo) => (
          <Flex
            key={todo.id}
            justify="space-evenly"
            onClick={() => updateTodo(todo)}
          >
            <Text fontSize="xl" as={todo.completed === true ? "s" : ""}>
              {todo.input.inputData}
            </Text>
            <DeleteIcon onClick={() => deleteTodo(todo.id)} />
          </Flex>
        ))}
      </Container>
    </>
  )
}

export default Todo
