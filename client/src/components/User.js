import React from 'react';

import { Message, Icon } from 'semantic-ui-react';

const User = ( { user } ) => {

    return (
        <Message>
            <Icon size='huge' name='spy' />
            <Message.Header>{user.contents}</Message.Header>
            <p>
                {user.title}
            </p>
        </Message>
    );
};

export default User;