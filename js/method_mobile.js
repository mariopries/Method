// //-- Funções para serem carregadas após a página carregar (APENAS UMA VEZ)
// $(window).load(function(){

//     //--Inibe os efeitos de realizar um scroll maior do que a tela - mobile
//     document.body.style.overscrollBehavior = 'contain'

//     //-- Verifica se não foi gerada a zona de toque e cria uma - mobile
//         menuTouch('MAINFORM'); //Passar local para zona de toque - mobile (TELA TODA/TOUCH DO MENU)

// });

// //-- Controle da zona de toque do menu
// function menuTouch(local) {
//     let pageWidth = window.innerWidth || document.body.clientWidth;
//     let treshold = Math.max(1,Math.floor(0.1 * (pageWidth)));
//     let touchstartX = 0;
//     let touchstartY = 0;
//     let touchendX = 0;
//     let touchendY = 0;
//     let resolutionX = window.innerWidth;
//     let resolutionY = window.innerHeight;

//     const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
//     const gestureZone = document.getElementById(local);

//     gestureZone.addEventListener('touchstart', function(event) {
//         touchstartX = event.changedTouches[0].pageX;
//         touchstartY = event.changedTouches[0].pageY;
//     }, false);

//     gestureZone.addEventListener('touchend', function(event) {
//         touchendX = event.changedTouches[0].pageX;
//         touchendY = event.changedTouches[0].pageY;
//         handleGesture(event);

//     }, false);

//     function handleGesture(e) {
//         let x = touchendX - touchstartX;
//         let y = touchendY - touchstartY;
//         let xy = Math.abs(x / y);
//         let yx = Math.abs(y / x);
//         if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
//             if (yx <= limit) {
//                 if ((touchstartX < resolutionX/10 && touchendX>touchstartX) || (touchendX<touchstartX)){
//                     if (x < 0) {
//                         console.log("left");

//                         ucSidebar.Collapse();
//                     } else {
//                         console.log("right");
//                         ucSidebar.Expand();

//                     }
//                 } else {
//                     console.log('invalid');
//                 }
//             }
//             if (xy <= limit) {
//                 if ((touchstartY < 50 && touchendY>touchstartY) || (touchendY<touchstartY)){
//                     if (y < 0) {
//                         console.log("top");

//                         if (document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.contains('open')) {

//                             $('ul.dropdown-menu').animate({height:'toggle'},200);

//                             $('ul.dropdown-menu').queue(function() {
//                                 $('ul.dropdown-menu').css('visibility','hidden');
//                                 document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.remove('open');
//                                 $('ul.dropdown-menu').dequeue();
//                                 });
//                         }
//                     } else {
//                         $('#DDO_ADMINAG_MPAGEContainer > .dropdown-menu').css('left','unset');
//                         $('#DDO_ADMINAG_MPAGEContainer > .dropdown-menu').css('right','0');
//                         $('.btn-group').css('position','unset');
//                         $('.dropdown-menu').css('width','50%');
//                         $('.dropdown-menu').css('overflow','hidden');

//                         console.log("bottom");

//                         if (! document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.contains('open')) {
//                             $('ul.dropdown-menu').css('visibility','visible');
//                             $('ul.dropdown-menu').animate({height:'toggle'},200);
//                             $('ul.dropdown-menu').queue(function() {
//                                 document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.add('open');
//                                 $('ul.dropdown-menu').dequeue();
//                             });
//                         }
//                     }
//                 } else {
//                     console.log('invalid');
//                 }

//             }
//         } else {
//             console.log("tap");
//         }
//     }
// }