import React from 'react';
import { Task } from '../../../types';
import { USERS_DATA } from '../../../constants';
import Badge from '../Badge';
import AvatarGroup from '../avatar/AvatarGroup';
import Card from '../card/Card';

interface KanbanCardProps {
  task: Task;
}

const priorityColors = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
} as const;

const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const assignees = USERS_DATA.filter(user => task.assigneeIds.includes(user.id));

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumnId', task.status);
    e.currentTarget.style.opacity = '0.4';
  };
  
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  }

  return (
    <Card 
      className="mb-3 cursor-grab active:cursor-grabbing"
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Card.Body>
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{task.title}</h4>
          <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{task.description}</p>
        <div className="flex justify-between items-center mt-3">
          <AvatarGroup users={assignees} size="sm" max={3} />
          <span className="text-xs text-neutral-500">
            <i className="bi bi-paperclip mr-1"></i>2
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default KanbanCard;