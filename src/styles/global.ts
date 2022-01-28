import { createGlobalStyle } from 'styled-components';
export type IGlobalColors = {
  background: string;
  red: string;
  green: string;
  blue: string;
  blue_light: string;
  text_title: string;
  text_body: string;
  shape: string;
};
export const globalColors: IGlobalColors = {
  background: '#f0f2f5',
  red: '#e52e4d',
  green: '#33cc95',
  blue: '#5429CC',
  blue_light: '#6933ff',
  text_title: '#363f5f',
  text_body: '#969cb3',
  shape: '#FFFFFF',
};

export const GlobalStyle = createGlobalStyle`
:root {
    --background: ${globalColors.background};
    --red: ${globalColors.red};
    --green: ${globalColors.green};
    --blue:${globalColors.blue};
    --blue-light: ${globalColors.blue_light};
    --text-title: ${globalColors.text_title};
    --text-body: ${globalColors.text_body};
    --shape: ${globalColors.shape};
}
 * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
 }
// font-size: 16px (Desktop) default
 html {
     // quando o usuario estiver com uma tela até 1080pixels de largura...
     // eu vou diminuir meu font-size
     @media (max-width: 1080px){
         font-size: 93.75%; // 15px
     }
     @media(max-width: 720px){
         font-size: 87.5%; // 14px
     }

 }
// REM = 1rem = font-size
 body {
     background: var(--background);
     -webkit-font-smoothing: antialiased;
 }

 body, input, textarea, button {
     font-family: "Poppins", sans-serif;
     font-weight: 400;
}
    
h1, h2, h3,h4,h5,h6, strong {
    font-weight: 600;
}
 button {
     cursor: pointer;
 }

 [disabled] {
     opacity: 0.6;
     cursor: not-allowed;
 }

 .react-modal-overlay {
     background: rgba(0,0,0,0.5); // opacidade do preto 50%

     position: fixed;
     top: 0;
     bottom: 0;
     right: 0;
     left: 0;

     display: flex;
     align-items: center;
     justify-content: center;
 }
 .react-modal-content {
     width: 100%;
     max-width: 576px;
     background: var(--background);
     padding: 3rem;
     position: relative;
     border-radius: 0.24rem;
 }
 .react-modal-close {
     position: absolute;
     right: 1.5rem;
     top: 1.5rem;
     border: 0;
     background: transparent;
     
    transition: 0.2s;
     &:hover{
        filter: brightness(0.8)
     }
 }
`;
