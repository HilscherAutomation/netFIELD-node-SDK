/**********************************************************************
 * Copyright (c) 2019 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var querystring = require('querystring');
var client = require('../../client');
var validate = require('../../utils/validate');
var checkers = require('../../utils/checkers');

/**
 * Get group items by groupId
 * @param {number} groupId
 * @param {number} page
 * @param {number} limit
 * @param {String} sortBy attribute from user object
 * @param {String} sortOrder asc, desc
 * @param {function} callback optional
 */

 module.exports = function (groupId, page, limit, sortBy, sortOrder, callback) {
    if(checkers.isFunction(page)) {
        callback = page;
        page = null;
    }
    if(checkers.isFunction(limit)) {
        callback = limit;
        limit = null;
    }
    if(checkers.isFunction(sortBy)) {
        callback = sortBy;
        sortBy = null;
    }
    if(checkers.isFunction(sortOrder)) {
        callback = sortOrder;
        sortOrder = null;
    }
    try {
        const query = {};
        if(page !== undefined && page !== null) {
            query.page = page;
            validate.validateNumber(page);
        }
        if(limit !== undefined && limit !== null) {
            query.limit = limit;
            validate.validateNumber(limit);
        }
        if(sortBy !== undefined && sortBy !== null) {
            query.sortBy = sortBy;
            validate.validateString(sortBy);
        }
        if(sortOrder !== undefined && sortOrder !== null) {
            query.sortOrder = sortOrder;
            validate.validateString(sortOrder);
        }
        validate.validateNumber(groupId);
        var path = `/groups/${groupId}/items?` + querystring.stringify(query);
        return client.get('auth', path, callback);
    } catch (e) {
        if (callback) {
            return callback(e, null);
        }
        return Promise.reject(e);
    }
 }