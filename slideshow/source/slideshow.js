var Slideshow = /** @class */ (function () {
    function Slideshow(formElement, fileElement, appElement, slideShowContainer, photos) {
        var _this = this;
        this.FormElement = formElement;
        this.FileElement = fileElement;
        this.AppElement = appElement;
        this.photos = photos;
        this.SlideShowContainer = slideShowContainer;
        this.FileElement.addEventListener("change", function (e) {
            _this.processFile(e);
        });
    }
    Slideshow.prototype.processFile = function (e) {
        var _this = this;
        var files = e === null || e === void 0 ? void 0 : e.currentTarget.files;
        var reader = new FileReader();
        reader.onload = function () {
            var image = document.createElement("img");
            var input = document.querySelector(".file");
            image.src = reader.result;
            _this.photos.push(reader.result);
            input.value = "";
            _this.render();
        };
        reader.readAsDataURL(files[0]);
    };
    Slideshow.prototype.render = function () {
        this.AppElement.innerHTML = "";
        this.AppElement.appendChild(this.FormElement);
        this.AppElement.appendChild(this.SlideShowContainer);
        this.SlideShowContainer.innerHTML = "";
        for (var i = 0; i < this.photos.length; i++) {
            var image = document.createElement("img");
            image.setAttribute("class", "photo");
            image.src = this.photos[i];
            this.SlideShowContainer.appendChild(image);
        }
        console.log("re-rendered");
        console.log(this);
    };
    return Slideshow;
}());
function main(formElement, fileElement, appElement, slideShowContainer) {
    var photos = [];
    var slideshow = new Slideshow(formElement, fileElement, appElement, slideShowContainer, photos);
    slideshow.render();
}
