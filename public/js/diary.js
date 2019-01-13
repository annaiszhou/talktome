$("#buttonLocal").click(function(){
    $("#UrlText").attr('hidden',true);
    $("#upload").attr('hidden',false);
});

$("#buttonUrl").click(function(){
    $("#UrlText").attr('hidden',false);
    $("#upload").attr('hidden',true);
});
                            
$("#upload").change(function(){
    // var path = $("#upload").val();
    // console.log(path);
    var f = document.getElementById("upload");
    var filename = f.value; // 'C:\fakepath\test.png'
    if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.JPG') || filename.endsWith('.PNG') || filename.endsWith('.GIF') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
        alert('Can only upload image file.');
        return false;
    } else {
        console.log(filename);
    }
})

