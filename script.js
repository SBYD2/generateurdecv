const champs = document.querySelectorAll('#cvForm input, #cvForm textarea');
const container = document.getElementById('competencesContainer');


function ajouterCompetence() {
const input = document.createElement('input');
input.type = 'text';
input.className = 'form-control mb-2 competence';
input.placeholder = 'Compétence';
input.addEventListener('input', mettreAJourPreview);
container.appendChild(input);
}


function supprimerCompetence() {
if (container.lastChild) {
container.removeChild(container.lastChild);
mettreAJourPreview();
}
}


function recupererCompetences() {
const competences = document.querySelectorAll('.competence');
let html = '<ul>';
competences.forEach(c => {
if (c.value.trim() !== '') {
html += `<li>${c.value}</li>`;
}
});
html += '</ul>';
return html;
}


champs.forEach(champ => {
champ.addEventListener('input', mettreAJourPreview);
});


function mettreAJourPreview() {
document.getElementById('preview').innerHTML = `
<h2>${prenom.value} ${nom.value}</h2>
<p><strong>Email :</strong> ${email.value}</p>
<p><strong>Téléphone :</strong> ${telephone.value}</p>
<h4>Profil</h4>
<p>${profil.value}</p>
<h4>Expérience</h4>
<p>${experience.value}</p>
<h4>Formation</h4>
<p>${formation.value}</p>
<h4>Compétences</h4>
${recupererCompetences()}
`;
}


function telechargerPDF() {
const formData = new FormData();
formData.append('nom', nom.value);
formData.append('prenom', prenom.value);
formData.append('email', email.value);
formData.append('telephone', telephone.value);
formData.append('profil', profil.value);
formData.append('experience', experience.value);
formData.append('formation', formation.value);


const competences = [];
document.querySelectorAll('.competence').forEach(c => {
if (c.value.trim() !== '') competences.push(c.value);
});
formData.append('competences', competences.join(','));


fetch('generate_pdf.php', {
method: 'POST',
body: formData
})
.then(res => res.blob())
.then(blob => {
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'cv.pdf';
a.click();
});
}

