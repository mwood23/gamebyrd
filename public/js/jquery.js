//Trigger responsive navbar 
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();

  $(".dropdown-button").dropdown();

 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    setTimeout(function(){
    	$('.modal-trigger').leanModal();
    },500)
  });
