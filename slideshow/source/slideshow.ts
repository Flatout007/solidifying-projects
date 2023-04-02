
class Slideshow {

    public FormElement: HTMLElement;
    public FileElement: HTMLElement;
    public AppElement: HTMLDivElement;
    public SlideShowContainer: HTMLElement;
    private photos: Array<any>;

    constructor(formElement: HTMLElement, fileElement: HTMLElement, appElement: HTMLDivElement, slideShowContainer: HTMLElement, photos: Array<any>) {
        this.FormElement = formElement;
        this.FileElement = fileElement;
        this.AppElement = appElement;
        this.photos = photos;
        this.SlideShowContainer = slideShowContainer;

        this.FileElement.addEventListener("change", (e: any): void => {
            this.processFile(e);
        });
    }

    processFile(e: any): void {
        const files = e?.currentTarget.files;

        const reader = new FileReader();

        reader.onload = (): void => {

            const image = document.createElement("img");
            const input = document.querySelector(".file") as any;

            image.src = reader.result as string;

            this.photos.push(reader.result);

            input.value = "";

            this.render();
        }

        reader.readAsDataURL(files[0]);
    }

    render(): void {

        this.AppElement.innerHTML = "";
        this.AppElement.appendChild(this.FormElement);
        this.AppElement.appendChild(this.SlideShowContainer);
        this.SlideShowContainer.innerHTML = "";

        for (let i = 0; i < this.photos.length; i++) {

            const image = document.createElement("img");

            image.setAttribute("class", "photo");

            image.src = this.photos[i];

            this.SlideShowContainer.appendChild(image);
        }

        console.log("re-rendered");
        console.log(this);
    }
}

function main(formElement: HTMLElement, fileElement: HTMLElement, appElement: HTMLDivElement, slideShowContainer: HTMLElement) {
    const photos = [];
    const slideshow = new Slideshow(formElement, fileElement, appElement, slideShowContainer, photos);

    slideshow.render();
}