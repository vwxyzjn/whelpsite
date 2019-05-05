// function changeclass(x) {
// 	y = document.getElementById(x);
// 	if (window.pageYOffset > 100) {
//     y.classList.add("change");
//   } else {
//     x.classList.remove("change");
//   }
	// console.log("scrollled");
	// document.scrollTop();
// }

// function $(window).on("scroll", function() {
// 	console.log("scroll");
//     if($(window).scrollTop() > 300) {
//         $(".navbar").addClass("change");
//     } else {
//         //remove the background property so it comes transparent again (defined in your css)
//        $(".navbar").removeClass("change");
//     }
// });

$(document).ready(function() {
       // $('#clickMe').click(function() {
            $.ajax({
                url: "event.json",
                method: "GET",
                dataType: 'json',
                contentType: "application/json",
                success: function(result){
				// makemarker(result);
				$(function() {
					$.each(result, function(index, value) {
						$('<div class="col-lg-3 col-md-6 col-sm-12">').append(
							$('<h2>').text(value.name),
							$('<th3>').text(value.event_type),
							$('<p>').text(value.url)
						).appendTo('#myevents');
					});
				});
				},
                error:function(req, status, err) {
                    console.log(req);
                    console.log(status);
                    console.log(err);
                }
            });
       // });
	});