import {View} from 'backbone';
import _ from 'underscore';
import Message from '../models/message.js';

const MessageView = View.extend({

    template: _.template('<div class="message-container <%= role %>" ><div class="message"><%= content %></div></div>'),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    }

});

export default MessageView;