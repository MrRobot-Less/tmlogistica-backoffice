$(document).ready(function(){

	// masks
    $('.cep').mask('00000-000', { reverse: false, placeholder: '_____-___' });
	$('.measures').mask('0000', {reverse: true});
	$('.money').mask('00.000,00', {reverse: true});

});