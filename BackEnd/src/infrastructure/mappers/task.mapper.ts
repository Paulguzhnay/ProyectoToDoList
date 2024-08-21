import { CustomError, TaskEntity } from "../../domain";

export class TaskMapper {
  static taskEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, title, description, userID, isFinished = false } = object;

    if (!_id || !id) throw CustomError.badRequest('Missing id');
    if (!title) throw CustomError.badRequest('Missing title');
    if (!description) throw CustomError.badRequest('Missing description');
    if (!userID) throw CustomError.badRequest('Missing userID');

    return new TaskEntity(
      _id || id,
      userID,
      title,
      description,
      isFinished,
    );
  }
}