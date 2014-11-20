'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Task = mongoose.model('Task'),
    Project = mongoose.model('Project'),
    Person = mongoose.model('Person'),
    _ = require('lodash');

/**
 * Create a Task
 */
exports.createTask = function(req, res) {
    var person, project;
    var task = new Task(req.body);

    task.user = req.user;

    Person.findById(req.body.personId).exec(function(err, person_object) {

        person = person_object;

        Project.findById(req.body.projectId).exec(function(err, project_object) {

            project = project_object;

            task.projectName = project.name;
            task.personName = person.name;

            task.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    person.tasks.push(task);
                    person.save();
                    project.tasks.push(task);
                    project.save();
                    res.jsonp(task);
                }
            });
        });
    });
};
/**
 * Show the current Task
 */
exports.readTask = function(req, res) {

    res.jsonp(req.task);
};

/**
 * Update a Task
 */
exports.updateTask = function(req, res) {
    var task = req.task;

    task = _.extend(task, req.body);

    task.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Delete an Task
 */
exports.deleteTask = function(req, res) {

    var task = req.task;
    Project.findById(req.task.project).exec(function(err, project) {

        if (project && project.tasks) {
            var i = project.tasks.indexOf(task._id);

            project.tasks.splice(i, 1);

            project.save();
        }

    });
    Person.findById(req.task.person).exec(function(err, person) {

        if (person && person.tasks) {
            var i = person.tasks.indexOf(task._id);

            person.tasks.splice(i, 1);

            person.save();
        }

    });
    task.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * List of Tasks
 */
exports.listTasks = function(req, res) {
    Task.find().sort('-created').populate('person', 'name').populate('project', 'name').exec(function(err, tasks) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(tasks);
        }
    });
};

/**
 * Task middleware
 */
exports.taskByID = function(req, res, next, id) {
    Task.findById(id).populate('user', 'username').exec(function(err, task) {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load Task ' + id));
        req.task = task;
        next();
    });
};

/**
 * Task authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.task.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
