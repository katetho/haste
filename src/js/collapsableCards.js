let header = document.getElementsByClassName("d-block");
    let cardBody = document.getElementsByClassName("collapse show");


    for (let i = 0; i < header.length; i++) {
        header[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            fixHeight(panel);
            setTimeout(showHide, 0, panel); //showHide must execute after fixHeight
        }); //otherwise height won't have a pixel value, and the transition wouldnt occur
    } //try promises again

    window.addEventListener("resize", function() { //
        for (let i = 0; i < cardBody.length; i++) {
            if (cardBody[i].style.height !== '0px')
                cardBody[i].style.height = 'auto';
        }
    });

    function showHide(el) {
        if (el.style.height !== '0px') {
            el.style.height = '0px';
        } else {
            el.style.display = 'block'; // Make it visible
            el.style.height = el.scrollHeight + 'px';
        }
    }

    function fixHeight(el) {
        if (el.style.height !== '0px') {
            el.style.height = el.scrollHeight + 'px';
        }
    }
