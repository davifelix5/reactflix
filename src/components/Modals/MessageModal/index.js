import React from 'react';
import { MessageWrapper, MessageContent, MessageButtons } from '../styles'
import Proptypes from 'prop-types';

function MessageModal({ message, disable }) {
    return (
        <MessageWrapper>
            <MessageContent>
                {message}
            </MessageContent>
            <MessageButtons>
                <MessageButtons.Primary onClick={disable}>
                    OK
                </MessageButtons.Primary>
            </MessageButtons>
        </MessageWrapper>
    )
}

MessageModal.propTypes = {
    message: Proptypes.string.isRequired,
    disable: Proptypes.func.isRequired,
}

export default MessageModal