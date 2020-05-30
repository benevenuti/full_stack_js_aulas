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