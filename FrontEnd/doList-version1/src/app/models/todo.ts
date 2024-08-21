 
export interface Todo {
    id?: string; // El ID puede ser opcional al crear una nueva tarea
    title: string;
    description?: string;
    isFinished: boolean;
  }