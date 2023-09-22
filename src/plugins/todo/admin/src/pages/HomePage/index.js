/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system';

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Illo } from "../../components/Illo";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";
import TodoModal from "../../components/TodoModal";
import TodoCount from '../../components/TodoCount';
import TodoTable from "../../components/TodoTable";
import todoRequests from '../../api/todo';
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function addTodo(data) {
    setTodoData([...todoData, { ...data, id: nanoid(), isDone: false }]);
  }

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    const todo = await todoRequests.getAllTodos();
    setTodoData(todo);
    setIsLoading(false);
  };

  useEffect( () => {
    fetchData();
  }, []);

  async function addTodo(data) {
    await todoRequests.addTodo(data);
    await fetchData();
  }

  async function toggleTodo(data) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data) {
    await todoRequests.deleteTodo(data.id);
    await fetchData();
  }

  async function editTodo(id, data) {
    await todoRequests.editTodo(id, data);
    await fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All your todos in one place."
        as="h2"
      />

      <ContentLayout>
        {todoData.length === 0
          ? (
            <EmptyStateLayout
              icon={<Illo />}
              content="You don't have any todos yet..."
              action={
                <Button
                  onClick={() => setShowModal(true)}
                  variant="secondary"
                  startIcon={<Plus />}
                >
                  Add your first todo
                </Button>
              }
            />
          )// add emty state component here
          : (
            <>
              <TodoCount count={todoData.length}/>
              <TodoTable
                todoData={todoData}
                setShowModal={setShowModal}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </>
          )// add count and table componennet here
        }
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </>
  );
};

export default HomePage;
