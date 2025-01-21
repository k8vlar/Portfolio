//animation de texte déroulant//
function scrambleText(element, finalText, duration = 4000, callback) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let currentText = element.innerText;
    const finalLength = finalText.length;
    let intervalId;
    let startTime;

    function updateText(progress) {
        let newText = '';
        for (let i = 0; i < finalLength; i++) {
            if (i < finalText.length * progress) {
                newText += finalText[i];
            } else {
                newText += characters[Math.floor(Math.random() * characters.length)];
            }
        }
        element.innerText = newText;
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            updateText(progress);
            requestAnimationFrame(animate);
        } else {
            element.innerText = finalText;
            if (callback) callback();
        }
    }

    requestAnimationFrame(animate);
}


const loadingElement = document.getElementById('loading');
const demoElement = document.querySelector('.demo');
const nameElement = document.querySelector('.name');
const welcomeElement = document.querySelector('.welcome');
const radioContainer = document.querySelector('.radio-container');
const containerElement = document.querySelector('.container');
const secondSection = document.querySelector('.second-section');
// const thirdSection = document.querySelector('third-section');
// let thirdSectionVisible = sessionStorage.getItem('thirdSectionVisible') === 'true';

if (!sessionStorage.getItem('loadingCompleted')) {
    scrambleText(loadingElement, "Loading", 4000, function() {
        setTimeout(function() {
            demoElement.classList.add('hidden');
            nameElement.classList.add('visible');
            scrambleText(welcomeElement, "Bienvenue\nje suis KEVIN VELLARD\nDEVELOPPEUR JUNIOR\nVEUX TU EN SAVOIR PLUS?", 3000, function() {
                radioContainer.classList.add('visible');
                sessionStorage.setItem('loadingCompleted', 'true');
            });
        }, 1000);
    });
} else {
    demoElement.style.display = 'none';
    nameElement.classList.add('visible');
    welcomeElement.innerText = "Bienvenue\nje suis KEVIN VELLARD\nDEVELOPPEUR JUNIOR\nVEUX TU EN SAVOIR PLUS?";
    radioContainer.classList.add('visible');
    if (sessionStorage.getItem('secondSectionVisible')) {
        secondSection.classList.add('visible');
    }
}

// fonctionnalité radio bouton first section //
document.addEventListener("DOMContentLoaded", function() {
    const radioO = document.getElementById('option-o');
    const radioN = document.getElementById('option-n');
    let secondSectionVisible = sessionStorage.getItem('secondSectionVisible') === 'true';

    function handleOptionChange() {
        if (radioN.checked) {
            nameElement.classList.add('hidden');
            setTimeout(function() {
                nameElement.innerHTML = "<img src='assets/images/gameover.png' alt='Game Over' style='width: 100%; height: auto; cursor: pointer;'>";
                nameElement.classList.remove('hidden');
                document.querySelector('.name img').addEventListener('click', function() {
                    location.reload();
                });
            }, 1000);
        } else if (radioO.checked) {
            secondSection.classList.add('visible');
            secondSectionVisible = true;
            sessionStorage.setItem('secondSectionVisible', 'true');
            setTimeout(function() {
                secondSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }

    function triggerOptionO() {
        radioO.checked = true;
        handleOptionChange();
    }

    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === 'o' || (event.key === 'Enter' && radioO.checked)) {
            radioO.checked = true;
            handleOptionChange();
        } else if (event.key.toLowerCase() === 'n' || (event.key === 'Enter' && radioN.checked)) {
            radioN.checked = true;
            handleOptionChange();
        } else if (event.key === 'ArrowLeft') {
            radioO.checked = true;
        } else if (event.key === 'ArrowRight') {
            radioN.checked = true;
        }
    });

    radioN.addEventListener('change', handleOptionChange);
    radioO.addEventListener('change', handleOptionChange);

    document.querySelector('label[for="option-o"]').addEventListener('click', triggerOptionO);

    window.addEventListener('scroll', function() {
        if (window.scrollY === 0 && !secondSectionVisible) {
            containerElement.classList.remove('hidden');
            secondSection.classList.remove('visible');
        }
    });
});

// feature radio button second section //

document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll('.project');
    let currentIndex = -1;

    function updateSelection(index) {
        projects.forEach((project, i) => {
            if (i === index) {
                project.classList.add('selected');
                if (i === projects.length - 1) {
                    // Pour l'icône de skills (dernière icône)
                    project.querySelector('img').src = './assets/images/icons/saveicon/double/icons8-tout-sauvegarder-80.png';
                } else {
                    // Pour les icônes de projet
                    project.querySelector('img').src = './assets/images/icons/computer/open/icons8-dossier-ouvert-80.png';
                }
            } else {
                project.classList.remove('selected');
                if (i === projects.length - 1) {
                    // Pour l'icône de skills (dernière icône)
                    project.querySelector('img').src = './assets/images/icons/saveicon/icons8-sauvegarder-80.png';
                } else {
                    // Pour les icônes de projet
                    project.querySelector('img').src = './assets/images/icons/computer/icons8-dossier-80.svg';
                }
            }
        });
    }

    function handleKeyNavigation(event) {
        switch(event.key) {
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % projects.length;
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + projects.length) % projects.length;
                break;
            case 'Enter':
                if (currentIndex !== -1) {
                    projects[currentIndex].querySelector('a').click();
                }
                return;
            default:
                return;
        }
        updateSelection(currentIndex);
        projects[currentIndex].focus();
        event.preventDefault();
    }

    projects.forEach((project, index) => {
        project.addEventListener('focus', () => {
            currentIndex = index;
            updateSelection(currentIndex);
        });
    });

    document.addEventListener('keydown', handleKeyNavigation);
});


// function triggerSectionThree() {
//     thirdSection.classList.add('visible');
//     thirdSectionVisible = true;
//     sessionStorage.setItem('thirdSectionVisible', 'true');
//     setTimeout(function() {
//         thirdSection.scrollIntoView({ behavior: 'smooth' });
//     }, 500);
// }