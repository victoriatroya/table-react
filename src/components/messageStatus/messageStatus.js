import React from 'react';

import './messageStatus.scss';

const MessageStatus = ({ text }) => {
    return (
        <div className="text">
            { text }
        </div>
    );
};

export default MessageStatus;