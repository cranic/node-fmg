var request = require('request');
var cheerio = require('cheerio');
var ev = require('events').EventEmitter;
var util = require('util');
var moment = require('moment');
var async = require('async');

exports.watch = function(email, options){
    if(!options)
        options = {};

    var lastID = null;

    var defaults = {
        interval : 5000,
        stop : false,
        timer : null
    };

    var controllers = function(){

    };

    util.inherits(controllers, ev);

    controllers.prototype.stop = function(){
        defaults.stop = true;
        if(defaults.timer)
            clearTimeout(defaults.timer);
    };

    controllers.prototype.resume = function(){
        defaults.stop = false;
        loop();
    };


    var events = new controllers();

    Object.keys(defaults).forEach(function(key){
        if(options[key])
            defaults[key] = options[key];
    });

    var loop = function(){
        var domain = String(email).split('@')[1];
        var name = String(email).split('@')[0];
        var next = function(err){
            if(err)
                events.emit('error', err);

            if(!defaults.stop)
                defaults.timer = setTimeout(loop, defaults.interval);
        };

        request.get(util.format('http://www.fakemailgenerator.com/inbox/%s/%s/', domain, name), function(err, headers, body){
            if(err)
                return next(err);

            if(body.indexOf('Waiting for e-mails...') !== -1)
                return next();

            var msgs = [];
            var $ = cheerio.load(body);

            $('#email-list li').each(function(i, el){
                var msg = {};

                $(el).find('dd').each(function(i, el){
                    var key;
                    var value = $(el).text();

                    if(i === 1)
                        key = 'sender';
                    else if(i === 2)
                        key = 'subject';
                    else if(i === 3)
                        key = 'date';
                    else if(i === 4)
                        key = 'expire';

                    if(key)
                        msg[key] = $(el).text();
                });

                msg.id = $(el).find('a').attr('href').split('-').pop().replace(/\D/g, '');
                msgs.push(msg);
            });

            if(msgs.length)
                async.eachSeries(msgs, function(msg, callback){
                    if(Number(msg.id) > Number(lastID))
                        request.get('http://www.fakemailgenerator.com/email/' + domain + '/' + name + '/message-' + msg.id + '/', function(err, headers, body){
                            if(err)
                                return callback(err);

                            msg.body = body;
                            lastID = msg.id;
                            events.emit('email', msg);
                            callback();
                        });
                    else
                        callback();
                }, function(err){
                    next(err);
                });
            else
                next();
        });

    };

    loop();
    return events;
};

exports.fetchDomains = function(callback){
    request.get('http://fakemailgenerator.com', function(err, headers, body){
        if(err)
            return callback(err);

        var domains = [];
        var $ = cheerio.load(body);
        $('#home-email-group ul li a').each(function(i, el){
            domains.push($(this).text().replace(/@/g, '').toLowerCase().trim());
        });

        callback(null, domains);
    });
};
