/*
 *
 * HomePage
 *
 */

import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system';

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Illo } from "../../components/Illo";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";
import TodoModal from "../../components/TodoModal";
import TodoCount from '../../components/TodoCount';
import TodoTable from "../../components/TodoTable";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function addTodo(data) {
    setTodoData([...todoData, { ...data, id: nanoid(), isDone: false }]);
  }

  async function toggleTodo(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteTodo(data) {
    alert("Add Delete Todo in API");
  }

  async function editTodo(id, data) {
    alert("Add Edit Todo in API");
  }

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
