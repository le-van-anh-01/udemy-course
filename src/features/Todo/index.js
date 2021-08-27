import React from 'react';
import TodoForm from './components/TodoForm';

const TodoFeature = () => {

    const handleTodoFormSubmit = (values) => {
        console.log('Form submit', values);
    }
    return (
        <div>
            <h1>This is TodoFeature</h1>
            <TodoForm onSubmit={handleTodoFormSubmit} />
        </div>
    )
}

export default TodoFeature;
