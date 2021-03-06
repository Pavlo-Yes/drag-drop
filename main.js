var dropRegion = document.getElementById("drop-region");
var imagePreviewRegion = document.getElementById("image-preview");

function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault);
dropRegion.addEventListener('dragleave', preventDefault);
dropRegion.addEventListener('dragover', preventDefault);
dropRegion.addEventListener('drop', preventDefault);

function handleDrop(e) {
    var data = e.dataTransfer,
        files = data.files;

    handleFiles(files)
}

dropRegion.addEventListener('drop', handleDrop, false);

function handleFiles(files) {
    for (var i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i]))
            previewAnduploadImage(files[i]);
    }
}

dropRegion.addEventListener('drop', handleDrop, false);

function handleFiles(files) {
    for (var i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i]))
            previewAnduploadImage(files[i]);
    }
}

function validateImage(image) {
    var validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (validTypes.indexOf(image.type) === -1) {
        alert("Invalid File Type");
        return false;
    }
    return true;
}

function previewAnduploadImage(image) {
    var imgView = document.createElement("div");
    imgView.className = "image-view";
    imagePreviewRegion.appendChild(imgView);

    var img = document.createElement("img");
    imgView.appendChild(img);

    var overlay = document.createElement("div");
    overlay.className = "overlay";
    imgView.appendChild(overlay);

    var reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(image);

    var formData = new FormData();
    formData.append('image', image);

    var uploadLocation = 'https://api.imgbb.com/1/upload';
    formData.append('key', 'a80b5b2f58fd684e5f20a610245ad1e5');

    var ajax = new XMLHttpRequest();
    ajax.open("POST", uploadLocation, true);

    ajax.onreadystatechange = function (e) {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                // done!
            } else {
                // error!
            }
        }
    };
    ajax.upload.onprogress = function (e) {

        var perc = (e.loaded / e.total * 100) || 100,
            width = 100 - perc;

        overlay.style.width = width;
    };
    ajax.send(formData);
}
