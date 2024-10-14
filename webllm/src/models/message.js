
import {Model} from 'backbone';

const Message = Model.extend({
    urlRoot: 'http://localhost/api/history',
    defaults() {
        return {
            role: '',
            content:'',
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