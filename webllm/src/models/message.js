
import {Model} from 'backbone';

const Message = Model.extend({
    defaults() {
        return {
            id: null,
            role: '',
            content:'',
            timestamp: null,
        };
    },

    parse(response) {
        return {
            id: response.id,
            role: response.role,
            content: response.content,
            timestamp: new Date(response.timestamp),
        };
    }
});

export default Message;