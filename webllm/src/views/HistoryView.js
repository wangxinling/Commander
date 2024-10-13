import {View} from 'backbone';
import MessageView from './MessageView.js';
import $ from "jquery";


const HistoryView = View.extend({
    //find history div
    el: $('#history'),

    events: {
        "click #load"  : "loadAll",
        "click #clean" : "clean",
      },
    
    initialize: function () {
        this.listenTo(this.model, 'add', this.addOne);
        this.listenTo(this.model, 'reset', this.addAll);
        this.listenTo(this.model, 'all', this.render);

    },
    render: function () {
        this.$("#history-box").empty();
        this.addAll();

    },
    addOne: function (message) {
        var messageView = new MessageView({ model: message });
        this.$("#history-box").append(messageView.render().el);

    },
    addAll: function () {
        if(this.model.length > 0) {
            this.model.each(this.addOne, this);
        };
    },

    // button handlers
    loadAll: function () {
        this.model.fetch()
    },

    clean: function () {
        this.model.reset()
    },
    
});

export default HistoryView;