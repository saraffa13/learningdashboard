import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead } from '../../store/slices/notificationSlice';
import { RootState } from '../../store/store';

const NotificationCenter: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-green-500';
      case 'warning': return 'bg-yellow-100 border-yellow-500';
      case 'error': return 'bg-red-100 border-red-500';
      default: return 'bg-blue-100 border-blue-500';
    }
  };

  return (
    <div className="fixed right-4 top-4 w-80">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`${getNotificationColor(notification.type)} p-4 rounded border-l-4 mb-2 
            ${notification.read ? 'opacity-50' : ''}`}
          onClick={() => dispatch(markAsRead(notification.id))}
        >
          <p className="text-sm">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;