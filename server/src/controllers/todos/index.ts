import { Request, Response } from 'express';

import TodoModel from '../../models/todos';
import { Todo } from '../../types/todo';

export const getTodos = async (req: Request, res: Response) => {
  const todos: Todo[] = await TodoModel.find();

  res.status(200).json({ todos });
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  //! pada versi mongoose 6 keatas fungsi findbyId sudah tidak menambahkan callback lagi
  try {
    const id = req.params.id;
    const data = await TodoModel.findById(id);
    if (data) {
      res.status(200).json({
        status: 'succesfully',
        todoById: data
      });
    }
    console.info('ini id nya' + id);
  } catch (error) {
    res.status(401).json({
      status: 'Error',
      errorMessage: error
    });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const body: Pick<Todo, 'title' | 'status'> = req.body;

  if (!body.title || !body.status) {
    res.status(401).json({
      status: 401,
      erroMesagge: `Validator Erro : todo validation failed : title ${body.title} , status ${body.status}`
    });
    return;
  }

  const newTodoModel = new TodoModel({
    title: body.title,
    status: body.status
  });

  const newTodo = await newTodoModel.save();
  const updateTodoAfterSave = await TodoModel.find();

  res.status(201).json({
    message: 'todo success addes',
    addtodo: newTodo,
    allTodoAfterAddition: updateTodoAfterSave
  });
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    body
  } = req;

  if (!body.title || !body.status || !id) {
    res.status(401).json({
      status: 401,
      erroMessage:
        'ValidatorError: _id or required body properties is not defined'
    });
    return;
  }

  const updateTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body);
  const updatedAllTodoAfterUpdate = await TodoModel.find();

  if (!updateTodo) {
    res.status(501).json({
      status: 501,
      erroMessage: 'Edit todo Failed. Not implemented'
    });

    return;
  }

  res.status(201).json({
    message: 'todo success updated',
    updateTodo,
    todos: updatedAllTodoAfterUpdate
  });
};

export const removeTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id }
  } = req;

  if (!id) {
    res.status(401).json({
      status: 401,
      erroMessagge: '_id is not defined'
    });
    return;
  }

  const removeTodo = await TodoModel.findByIdAndRemove(id);
  const updatedAllTodoAfterRemove = await TodoModel.find();

  if (!removeTodo) {
    res.status(501).json({
      status: 501,
      erroMessage: 'Remove todo failed , Not implemented'
    });
    return;
  }

  res.status(200).json({
    messagge: 'Todo successfully remove',
    removeTodo,
    todos: updatedAllTodoAfterRemove
  });
};

//! Testing API with postman done
