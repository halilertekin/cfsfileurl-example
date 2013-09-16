Images = new CollectionFS('images');


if (Meteor.isClient) {
    Template.imageList.images = function () {
        return Images.find()
    };


    Template.dropZone.events = {
        'dragenter .drop-zone': function (e, t) {
            e.stopPropagation();
            e.preventDefault();
            $(t.find('drop-zone')).addClass('drop-zone-hover');
        },
        'dragexit .drop-zone': function (e, t) {
            e.stopPropagation();
            e.preventDefault();
            $(t.find('drop-zone')).removeClass('drop-zone-hover');
        },
        'dragover .drop-zone': function (e, t) {
            e.stopPropagation();
            e.preventDefault();
        },
        'drop .drop-zone': function (e, t) {
            e.stopPropagation();
            e.preventDefault();

            var files = e.dataTransfer.files;

            for (var i = 0, f; f = files[i]; i++) {
                Images.storeFile(f);

            }

        }
    };

}

if (Meteor.isServer) {
    var handler = {
        "default1": function (options) {
            return {
                blob: options.blob,
                fileRecord: options.fileRecord
            };
        }
    }
    Images.fileHandlers(handler);

    Meteor.startup(function () {
        // code to run on server at startup
    });
}
