const form = document.getElementById('registration-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (form.password.value !== form['password-confirmation'].value) {
        isValid = false;
        alert('Підтвердженний пароль повинен відповідати введному у "Пароль"');
    }

    for (let field of form.elements) {
        if (field.tagName === 'BUTTON' || field.tagName === 'FIELDSET') {
            continue;
        }
        
        if (field.type === 'radio') {
            const selected = document.querySelector(`input[name=${field.name}]:checked`);
            if (!selected) {
                isValid = false;
                alert(`Оберіть значення для ${field.name}`);
            }

            continue;
        }

        if (!field.value.trim()) {
            isValid = false;
            alert(`Заповніть поле ${field.name}`);
            continue;
        }
    }

    if (isValid) form.submit();
})