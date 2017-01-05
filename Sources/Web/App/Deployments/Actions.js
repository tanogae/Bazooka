﻿import reqwest from "reqwest";

module.exports = {
    updateDeployments: function (filter) {
        var query = "";
        var date = new Date();
        date.setHours(0, 0, 0, 0);

        if (filter === "Today") {
            query = "?$filter=(StartDate gt DateTime'" + date.toISOString() + "' or StartDate eq null) ";
        }

        if (filter === "Yesterday") {
            date.setDate(date.getDate() - 1);
            query = "?$filter=(StartDate gt DateTime'" + date.toISOString() + "' or StartDate eq null)  ";
        }

        if (filter === "Last week") {
            date.setDate(date.getDate() - 7);
            query = "?$filter=(StartDate gt DateTime'" + date.toISOString() + "' or StartDate eq null)  ";
        }

        if (filter === "Last month") {
            date.setDate(date.getDate() - 30);
            query = "?$filter=(StartDate gt DateTime'" + date.toISOString() + "' or StartDate eq null)  ";
        }

        return reqwest({
            url: "/api/deployment/" + query,
            type: 'json',
            contentType: 'application/json',
            method: "get"
        });
    },

    cancelDeployment: function (id) {
        return reqwest({
            url: "/api/deploy/cancel?deploymentId=" + id,
            type: 'json',
            contentType: 'application/json',
            method: "get"
        });
    },

    updateDeployment: function (id) {
        return reqwest({
            url: "/api/deployment/" + id,
            type: 'json',
            contentType: 'application/json',
            method: "get"
        });
    }
};