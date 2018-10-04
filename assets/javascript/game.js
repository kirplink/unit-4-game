// $('#tracer-container').click(function(){
    // $("#tracer-container").animate({left: '250px'});
// }); 

$(".card").flip();

$(".char-select-btn").on("click", function(){
    // console.log($(this).parent().attr('id'));
    var parentId = $(this).parent().attr('id');
    console.log("#" + parentId);
    $("#" + parentId).animate({
        left: "+=50"
    }, 5000, function() {

    });
});

