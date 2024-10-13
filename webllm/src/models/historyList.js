import {Collection} from 'backbone';
import Message from './message.js';

const HistoryList = Collection.extend({
    model:Message,
    url: 'http://localhost/api/history',
    parse(response) {
        return response.data;
    }
    
});

export default HistoryList;