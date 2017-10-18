
	jQuery(document).ready(function($){
									
				function swapButton(){
					var txtswap = $(".form-footer button[type='submit']");
					if (txtswap.text() == txtswap.data("btntext-sending")) {
						txtswap.text(txtswap.data("btntext-original"));
					} else {
						txtswap.data("btntext-original", txtswap.text());
						txtswap.text(txtswap.data("btntext-sending"));
					}
				}
				

				function recaptchaResetCallback () {
					if($('#g-recaptcha').length) { 
						grecaptcha.reset(); 
					}
				}
			   
				$( "#smart-form" ).validate({
						errorClass: "state-error",
						validClass: "state-success",
						errorElement: "em",
						rules: {
								sendername: {
										required: true,
										minlength: 2
								},		
								emailaddress: {
										required: true,
										email: true
								},
								sendersubject: {
										required: true,
										minlength: 4
								},								
								sendermessage: {
										required: true,
										minlength: 10
								},
								"g-recaptcha-response":{
									required:true,
									remote:'/processReCaptcha'
								}
						},
						messages:{
								sendername: {
										required: 'Введите ваше имя',
										minlength: 'Имя должно быть не короче 2 символов'
								},				
								emailaddress: {
										required: 'Введите ваш email адрес',
										email: 'Введите корректный email адрес'
								},
								sendersubject: {
										required: 'Введите тему',
										minlength: 'Subject must be at least 4 characters'
								},														
								sendermessage: {
										required: 'Введите сообщение',
										minlength: 'Сообщение должно быть не короче 10 символов'
								},															
								"g-recaptcha-response":{
										required: 'Отметьте reCaptcha для верификации',
										remote:'Ошибка reCaptcha верификации'
								}
						},
						highlight: function(element, errorClass, validClass) {
								$(element).closest('.field').addClass(errorClass).removeClass(validClass);
						},
						unhighlight: function(element, errorClass, validClass) {
								$(element).closest('.field').removeClass(errorClass).addClass(validClass);
						},
						errorPlacement: function(error, element) {
						   if (element.is(":radio") || element.is(":checkbox")) {
									element.closest('.option-group').after(error);
						   } else {
									error.insertAfter(element.parent());
						   }
						},				
						submitHandler:function(form) {
							$(form).ajaxSubmit({
								    target:'.result',	
									beforeSubmit:function(){ 
											swapButton();
											$('.form-footer').addClass('progress');
									},
									error:function(){
											swapButton();
											$('.form-footer').removeClass('progress');
									},
									 success:function(){
										 	swapButton();
											$('.form-footer').removeClass('progress');
											$('.alert-success').show().delay(7000).fadeOut();
											$('.field').removeClass("state-error, state-success");
											if( $('.alert-error').length == 0){
												$('#smart-form').resetForm();
												recaptchaResetCallback();
											}
									 }
							  });
						}
				});	
		 
		
	});				
    