import React from 'react'
import { MessageWrapper, MessageContent, MessageButtons } from '../styles'
import Proptypes from 'prop-types';

function PromptModal({ message, accept, reject }) {
    return (
        <MessageWrapper>
            <MessageContent>
                {message}
            </MessageContent>
            <MessageButtons>
                <MessageButtons.Secondary onClick={reject}>
                    Cancelar
                </MessageButtons.Secondary>
                <MessageButtons.Primary onClick={accept}>
                    OK
                </MessageButtons.Primary>
            </MessageButtons>
        </MessageWrapper>
    )
}

PromptModal.defaultProps = {
    message: 'Tem certeza que deseja realizar essa oparação?'
}

PromptModal.propTypes = {
    message: Proptypes.string,
    accept: Proptypes.func.isRequired,
    reject: Proptypes.func.isRequired,
}

export default PromptModal