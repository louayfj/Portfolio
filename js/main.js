// main.js

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');

    neonCursor({
        el: heroSection,
        shaderPoints: 16,
        curvePoints: 80,
        curveLerp: 0.5,
        radius1: 5,
        radius2: 30,
        velocityTreshold: 10,
        sleepRadiusX: 100,
        sleepRadiusY: 100,
        sleepTimeCoefX: 0.0025,
        sleepTimeCoefY: 0.0025
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission with SweetAlert2
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Form data
        const formData = new FormData(this);

        // Send form data to Formspree
        fetch('https://formspree.io/f/xeqywkvy', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Thank you! Your message has been sent.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                document.getElementById('contact-form').reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        Swal.fire({
                            title: 'Error!',
                            text: data["errors"].map(error => error["message"]).join(", "),
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Oops! There was a problem submitting your form',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: 'Oops! There was a problem submitting your form',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    });
});
