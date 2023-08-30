import { Schema, model } from 'mongoose';
import { Todo } from '../types/todo';

const schemaTodo: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model<Todo>('Todo', schemaTodo);
