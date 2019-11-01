const canvas1 = document.getElementById("canvas-original");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("canvas-novo");
const ctx2 = canvas2.getContext("2d");
var id_image="#canvas-novo";
let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

document.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
        var salto=5;
        if (e.target.classList.contains("brightness-add")) {
            Caman(id_image, img, function () {
                this.brightness(salto).render();
            });
        } else if (e.target.classList.contains("brightness-remove")) {
            Caman(id_image, img, function () {
                this.brightness(-salto).render();
            });
        } else if (e.target.classList.contains("contrast-add")) {
            Caman(id_image, img, function () {
                this.contrast(salto).render();
            });
        } else if (e.target.classList.contains("contrast-remove")) {
            Caman(id_image, img, function () {
                this.contrast(-salto).render();
            });
        } else if (e.target.classList.contains("exposure-add")) {
            Caman(id_image, img, function () {
                this.exposure(salto).render();
            });
        } else if (e.target.classList.contains("exposure-remove")) {
            Caman(id_image, img, function () {
                this.exposure(-salto).render();
            });
        } else if (e.target.classList.contains("saturation-add")) {
            Caman(id_image, img, function () {
                this.saturation(salto).render();
            });
        } else if (e.target.classList.contains("saturation-remove")) {
            Caman(id_image, img, function () {
                this.saturation(-salto).render();
            });
        }else if (e.target.classList.contains("greyscale")) {
            Caman(id_image, img, function () {
                this.greyscale().render();
            });
        }else if (e.target.classList.contains("reset")) {
            Caman(id_image, img, function () {
                this.revert();
            });
        }else if (e.target.classList.contains("save")) {
            Caman(id_image, img, function () {
                var jpegUrl = canvas2.toDataURL("image/jpeg");
                console.info(jpegUrl)
            });
        }
    }
});

// Upload File
uploadFile.addEventListener("change", () => {
    // Get File
    const file = document.getElementById("upload-file").files[0];
    // Init FileReader API
    const reader = new FileReader();

    // Check for file
    if (file) {
      // Set file name
      fileName = file.name;
      // Read data as URL
      reader.readAsDataURL(file);
    }

    // Add image to canvas
    reader.addEventListener(
      "load",
      () => {
        // Create image
        img = new Image();
        // Set image src
        img.src = reader.result;
        // On image load add to canvas
        img.onload = function() {
          canvas1.width = img.width;
          canvas1.height = img.height;
          ctx1.drawImage(img, 0, 0, img.width, img.height);
          canvas1.removeAttribute("data-caman-id");
          Caman("#canvas-original", function () {
            this.resize({
              width: 400,
              height: 400
            });

            // You still have to call render!
            this.render();
          });

          canvas2.width = img.width;
          canvas2.height = img.height;
          ctx2.drawImage(img, 0, 0, img.width, img.height);
          canvas2.removeAttribute("data-caman-id");
          Caman("#canvas-novo", function () {
            this.resize({
              width: 400,
              height: 400
            });

            // You still have to call render!
            this.render();
          });
        };
      },
      false
    );
  });
