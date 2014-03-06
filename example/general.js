var fmg = require(__dirname + '/../');

var watcher = fmg.watch('alanhoff89@jourrapide.com');
watcher.once('email', function(email){
    console.log('GOT EMAIL', email);
    watcher.stop();
});

watcher.on('error', function(err){
    throw err;
});
