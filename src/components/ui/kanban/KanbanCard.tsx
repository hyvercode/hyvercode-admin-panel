import React from 'react';
import { KanbanTask } from '../../../types';
import { USERS_DATA } from '../../../constants';
import Avatar from '../avatar/Avatar';
import Tooltip from '../Tooltip';

interface KanbanCardProps {
  task: KanbanTask;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const assignee = USERS_DATA.find(u => u.id === task.assigneeId);
  return (
    <div className="bg-neutral-0 dark:bg-neutral-1000 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 mb-4 cursor-grab">
      <h4 className="font-semibold text-sm">{task.title}</h4>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{task.description}</p>
      {assignee && (
        <div className="mt-3 flex justify-end">
          <Tooltip content={assignee.name}>
            <Avatar name={assignee.name} src={`https://picsum.photos/40/40?random=${assignee.id}`} size="sm" />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default KanbanCard;
