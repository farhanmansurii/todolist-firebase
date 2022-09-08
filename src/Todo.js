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
      <Container height="110vh" width="380px" bg="#FFCDD2">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="semibold"
          pt="1.5rem"
          align="left"
          mx="0.5rem"
          color="#4D4141"
        >
          Welcome ,Farhan!
        </Text>
        <form onSubmit={onsubmitHandler}>
          <Input
            variant="unstyled"
            bg="#FD7D96"
            size="lg"
            fontSize="xl"
            value={inputData}
            px="1rem"
            width="90%"
            py="2"
            color="#4D4141"
            placeholder="Enter a task"
            _placeholder={{ color: "#4D4141" }}
            onChange={(e) => setInputData(e.target.value)}
            my="1.5rem"
            fontFamily="mono"
            mx="0.5rem"
            align="center"
          />
        </form>

        {todos.map((todo) => (
          <Flex
            key={todo.id}
            justify="space-between"
            onClick={() => updateTodo(todo)}
            mx="0.9rem"
            align="left"
            fontFamily="mono"
            bg="#FD7D96"
            px="2rem"
            py="0.5rem"
            mt="2"
            borderRadius="xl"
          >
            <Text fontSize="xl" as={todo.completed === true ? "s" : ""}>
              {todo.input.inputData}
            </Text>
            <DeleteIcon
              fontSize="xl"
              mt="1"
              onClick={() => deleteTodo(todo.id)}
            />
          </Flex>
        ))}
      </Container>
    </>
  )
}

export default Todo
