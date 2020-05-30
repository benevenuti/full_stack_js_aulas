Olá, vamos criar o aplicativo APoD.

Precisamos seguir os seguintes passos:

- Criar um novo projeto denominado APoD;
- Criar um documento HTML5;
- Incluir o Bootstrap (somente o CSS)
- Incluir o jQuery V3;
- Baixar e incluir o plugin jQuery Tiny Pub/Sub - https://github.com/cowboy/jquery-tiny-pubsub
- Criar uma classe chamada Hide para setar o display como "none"
- Criar uma estrutura de container > row > col-xs-12 que conterá todo o corpo de nossa página
- Criar um título para a página
- Adicionar um subtitulo
- Criar um elemento de "preload" (apenas uma div informando que algo está carregando) 

- Criar um container para a imagem que carregará como hide, contendo a seguinte estrutura

<div class="thumbnail js-day-image hide">
        <img src="" alt="" class="js-image-url">
	<div class="caption">
        	<h3 class="js-title"></h3>
		<p class="js-explanation"></p>
	</div>
</div>

- Criar o código Java! Tadã!
- Caso prefica, neste link você encontra a versão finalizada https://we.tl/t-8LdFDytCVb

======================= Cola =======================
	// Model
        function Model(){
            this.photo = null;
            this.photoUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
            this.getPhoto();
        };

        // solicita a foto ao servidor
        Model.prototype.getPhoto = function(){
            $.ajax({ 
                url: this.photoUrl 
            }).done($.proxy(function(data){
                this.lastPhoto = data;
                $.publish('Model.lastPhoto', data);
            }, this));
        }

        // View 
        function View(){
            this.loaderElement = $('.js-loader');
            this.photoContainerElement = $('.js-day-image');
            this.photoImgElement = this.photoContainerElement.find('.js-image-url');
            this.titleElement = this.photoContainerElement.find('.js-title');
            this.explanationElement = this.photoContainerElement.find('.js-explanation');

            $.subscribe('Controller.renderPhoto.View', this.renderPhoto.bind(this));
        }

        View.prototype.renderPhoto = function(e, photo){
            this.photoImgElement.attr('src', photo.url);
            this.titleElement.text(photo.title);
            this.explanationElement.text(photo.explanation);
            this.loaderElement.hide();
            this.photoContainerElement.removeClass('hide');
        }

        // Controller
        function Controller(){
            this.Model = new Model;
            this.View = new View;

            $.subscribe('Model.lastPhoto.Controller', this.photoReceived.bind(this));
        }

        // recebe uma foto nova e envia para a View renderizar
        Controller.prototype.photoReceived = function(e, data){
            $.publish('Controller.renderPhoto', data);
        }

        // O controlador, que instancia o Model e a View
        var AppCtrl = new Controller;