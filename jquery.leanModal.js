(function($){
    var modal_no = 0;
 
    $.fn.extend({ 
         
        leanModal: function(options) {
 
            var defaults = {
                top: 100,
                overlay: 0.5
            }
                 
            options =  $.extend(defaults, options);
 
            return this.each(function() {
            
                var o = options;
               
                $(this).click(function(e) {
                  
                    $("body").append("<div id='lean_overlay'></div>");

                    $this = $(this);
                    var href = $this.attr("href");

                    if(href.substr(0,1) == '#')
                    {
                        show_modal(href, o);
                    }
                    else
                    {
                        (function(){
                            id = "modal-dialog-"+(modal_no++);
                            $(document.createElement('div'))
                                .appendTo('body')
                                .css({'display': 'none'})
                                .attr('id',id)
                                .load(href,function(){show_modal("#"+id, o);});
                            $this.attr('href',"#"+id);
                        })();
                    }

                    e.preventDefault();
                            
                });
            });

            function show_modal(modal_id, options){
                $("#lean_overlay").click(function() { 
                     close_modal(modal_id);
                });
                            
                var modal_height = $(modal_id).outerHeight();
                var modal_width = $(modal_id).outerWidth();

                $('#lean_overlay').css({ 'display' : 'block', opacity : 0 });

                $('#lean_overlay').fadeTo(200,options.overlay);

                $(modal_id).css({ 
                
                    'display' : 'block',
                    'position' : 'fixed',
                    'opacity' : 0,
                    'z-index': 9999,
                    'left' : 50 + '%',
                    'margin-left' : -(modal_width/2) + "px",
                    'top' : options.top + "px"
                
                });

                $(modal_id).fadeTo(200,1);
            }

			function close_modal(modal_id){

        		$("#lean_overlay").fadeOut(200);

        		$(modal_id).css({ 'display' : 'none' });
			
			}
    
        }
    });
     
})(jQuery);