(function($, win, doc) {
    var output, allData, allKey;
    win.Emoji = {
        load: function(target) {
            output.html('loading...');
            $.getJSON('data/' + target + '.json', function(data) {
                output.html('');
                for(var key in data) {
                    output.append('<li>' + key + ': ' + data[key].join(', ') + '</' + 'li>');
                }
            });
        },
        trim: function(str, search) {
            var reg;
            str = str || '';
            search = search || '\\s';
            reg = new RegExp('^' + search + '+|' + search + '+$', 'ig');
            return str.replace(reg, '');
        }
    };
    $(doc).ready(function() {
        output = $('#output');
        $.getJSON('data/all.json', function(data) {
            allData = data;
            // init allKey
            allKey = ',';
            for(key in allData) {
                allKey += key + ',';
            }
            // create search UI
            $('#search').show()
            .on('keyup', function(evt) {
                var key = Emoji.trim(evt.target.value);
                var reg = new RegExp(',[^,]*' + key + '[^,]*,', 'ig');
                var keys = [];

                if(!key)
                    return;

                keys = allKey.match(reg) || [];
                if(!keys.length) {
                    output.html('No Result...');
                } else {
                    output.html('');
                    while(key = keys.pop()) {
                        key = Emoji.trim(key, ',');
                        output.append('<li>' + key + ': ' + allData[key].join(', ') + '</' + 'li>');
                    }
                }
            });
        });
    });
})(jQuery, window, document);
