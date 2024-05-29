const handleSubmit=($event)=> {
    $event.preventDefault()
    const validation = formValidation()

    validation ? alert(`
    Nombre: ${document.getElementById('nombre').value}
    Apellido: ${document.getElementById('apellido').value}
    Documento: ${document.getElementById('dni').value}
    Email: ${document.getElementById('direccionDeCorreo').value}
    Edad: ${document.getElementById('edad').value}
    Actividad: ${document.getElementById('actividad').value}
    Educacion: ${document.getElementById('educacion').value}
    Ofertas: ${document.getElementById('ofertas').checked}
    Novedades: ${document.getElementById('novedades').checked}
    `) : true
}

const generateError=(element, message)=> {
    element.textContent = message
    element.style.display = 'block'
}

const hideError=(element)=>{
    element.textContent = ''
    element.style.display = 'none'
}

const getErrorElement=(field)=> document.getElementById('error' + field.id.charAt(0).toUpperCase() + field.id.slice(1)) // Selecciona de manera dinámica el elemento 'error' para el campo especificado

document.getElementById('formularioDeRegistro').addEventListener('submit', handleSubmit)

const formValidation=()=> {
    let validation = true
    
    // Validación de los campos de texto (nombre, apellido, documento)

    const textFields = document.querySelectorAll('input[type="text"]')
    textFields.forEach((field)=>{
        const errorField = getErrorElement(field)

        if (field.value.length == '') {
            generateError(errorField, '¡Este campo es requerido!')
            validation = false
        } else if (field.value.length < 3) {
            generateError(errorField, '¡Este campo debe tener al menos 3 caracteres!')
            validation = false
        } else hideError(errorField)
    })

    
    // Validación del email

    const emailField = document.getElementById('direccionDeCorreo')
    const emailError = getErrorElement(emailField)
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) { // Validación del formato del email
        hideError(emailError)
    } else {
        generateError(emailError, '¡Ingrese un correo electrónico válido!')
        validation = false
    }

    // Validación de la edad

    const ageField = document.getElementById('edad')
    const ageError = getErrorElement(ageField)
    const age = parseInt(ageField.value) | 0

    if (age <= 0) {
        generateError(ageError, '¡Ingrese una edad válida!')
        validation = false
    } else if (age < 18) {
        generateError(ageError, 'Debes ser mayor a 18 años para registrarte')
        validation = false        
    } else hideError(ageError)


    // Validación de la actividad
    
    const activityField = document.getElementById('actividad')
    const activityError = getErrorElement(activityField)

    if (activityField.value == '') {
        generateError(activityError, 'Por favor, seleccione una actividad')
        validation = false
    } else hideError(activityError)

    
    // Validación de la educación

    const educationField = document.getElementById('educacion')
    const educationError = getErrorElement(educationField)

    if (educationField.value == '') {
        generateError(educationError, 'Por favor, seleccione un nivel de estudios')
        validation = false
    } else hideError(educationError)

    
    // Validación de la casilla de 'Aceptar términos'

    const termsAndConditions = document.getElementById('terminosYCondiciones')
    const termsAndConditionsError = getErrorElement(termsAndConditions)

    if (!termsAndConditions.checked) {
        generateError(termsAndConditionsError, '¡Debes aceptar los términos y condiciones!')
        validation = false
    } else hideError(termsAndConditionsError)

    return validation
}