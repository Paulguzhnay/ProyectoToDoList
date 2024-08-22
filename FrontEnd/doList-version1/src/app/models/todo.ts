export interface Todo {
  id?: string; // Si usas un ID para identificar las tareas
  title: string;
  description: string; // Añade esta línea si también usas la descripción
  userID:string
  isFinished: boolean;
  isSelected?: boolean; // Nueva propiedad opcional
}
