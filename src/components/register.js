import { onNavigate } from '../main.js';
import { createUser } from '../lib/firebase.js';
// import { displayName } from '../lib/firebase.js';

export const register = () => {
  const container = document.createElement('section');
  container.className = 'containerRegister';

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Travelers';

  const subTitle = document.createElement('h3');
  subTitle.className = 'subTitle';
  subTitle.textContent = 'Por el mundo';

  const formRegister = document.createElement('form');

  const buttonSign = document.createElement('button');
  buttonSign.className = 'buttonEnter';
  buttonSign.textContent = 'Registrarme';

  const buttonBack = document.createElement('button');
  buttonBack.className = 'buttonBack';
  buttonBack.textContent = 'Regresar';

  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'Correo Electrónico';
  inputEmail.setAttribute('id', 'emailSignup');
  inputEmail.setAttribute('required', '');

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.placeholder = 'Nombre';
  inputName.setAttribute('required', '');
  inputName.setAttribute('id', 'name');

  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.setAttribute('id', 'passwordSignup');
  inputPassword.setAttribute('required', '');

  const emailText = document.createElement('p');
  emailText.textContent = 'Escribe tu correo:';

  const nameText = document.createElement('p');
  nameText.textContent = 'Escribe tu nombre:';

  const passwordText = document.createElement('p');
  passwordText.textContent = 'Contraseña';

  const errorText = document.createElement('p');
  errorText.setAttribute('id', 'errorText');

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailSignup').value;
    const password = document.getElementById('passwordSignup').value;

    createUser(email, password)
      .then(() => {
        onNavigate('/wall');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          errorText.textContent = 'Este correo ya se encuentra registrado';
        } else if (errorCode === 'auth/weak-password') {
          errorText.textContent = 'La contraseña debe tener al menos 6 carácteres';
        } else if (errorCode === 'auth/invalid-email') {
          errorText.textContent = 'El correo es inválido';
        }
      });
  });

  buttonBack.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });

  container.append(
    title,
    subTitle,
    formRegister,
    errorText,
    buttonBack,
  );

  formRegister.append(
    nameText,
    inputName,
    emailText,
    inputEmail,
    passwordText,
    inputPassword,
    buttonSign,
  );

  return container;

}


  //Traemos el nombre del usuario, sin el nombre de usuario las preguntas se bloquean y no se muestran//
function getName(){
  const name = document.getElementById("name")
  if(name){
    localStorage.setItem('username', name.value);
}}
export { getName };
// }
// }


