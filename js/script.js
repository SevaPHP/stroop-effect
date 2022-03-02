'use strict';
window.addEventListener('DOMContentLoaded', ()=> {
    //Переменная modal модальное окно, в котором будут меняться вопросы и выводиться результат
   const modal = document.querySelector('.modal'),
     //Переменная ball - в нее выводим результаты полученных балов
         ball = document.querySelector('#ball');
     //iter - создаем счетчик для нумерации страницы    
    let iter = 1;

    //Функция которая вычесляет рандомное число от 0  - 4
   function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

   //массив colors в котором мы храним цвета
   const colors = ['Красный','Оранжевый','Желтый',
         'Зеленый','Голубой','Синий','Фиолетовый'
    ]
    //Переменная state мы тут храним состояние балов. Если пользователь укажет верный ответ то состояние будет меняться 
   const state = {
       b:0
   }

   //Основная функция CanYouSee() в которой происходит весь расчет
  function CanYouSee(){

    let c = colors.map(item => item);
    let a = [];
    let bb = 0 ;

    //Цикл в котором выводим только 4 рандомных элемента!  
   for ( let i = 0; i < 4; i++ ) {

    //4 цвета выбранные рандомным образом, запихиваем в новый массив для дальнешей работы с ним
    let ind = Math.floor(Math.random() * c.length);
    let item = document.createElement('li');
    item.setAttribute("class",'markerks2');
    item.textContent = c[ind];
         c.splice(ind, 1);
        a.push(item.textContent);
     }

     //Выбираем из нового массива рандомный цвет для названия
     const rand = Math.floor(Math.random() * a.length);
     a.push(a[rand]);
     //Выбираем из нового массива рандомный цвет для правильного покраски в правильный ответ
     const win = Math.floor(Math.random() * a.length);
     a.push(a[win]);

     //cоздаем верстку динамически . Название главного цвета
     let ul = document.createElement("ul");
     ul.setAttribute("id",'go_ul');
     //Красим в тот цвет который будет правильный
     ul.setAttribute("class",`colortext_${colors.indexOf(a[5])}`);
     ul.innerHTML = `
     ${a[4]}
     `; 
     //Добавляем верстку на сайт
         modal.append(ul); 

         //Добавляем из нашего нового массива рандомные цвета и красим их в черный цвет. для выборки.
       a.forEach((item,key)=>{
           if(key <= 3){
                bb++;
                let a1 = document.createElement('li');
                a1.setAttribute("class",'markerks2');
                a1.innerHTML = `${item}`;
                document.querySelector('#go_ul').append(a1);
           }
      
       }) 

       //Вешаем обработчик событий на наши цвета. Если человек кликнул на правильный цвет то +1 бал. Если нет то бал не начисляется
       document.querySelectorAll('.markerks2').forEach(item =>{
            item.addEventListener('click',(e)=>{
                //Задаем количество вопросов 
                if(iter <= 14){
                    iter++; 
                    document.querySelector('#forapage').innerHTML = `${iter}`;
                    //console.log(iter);

                    let check = document.querySelector('#go_ul');
                    let last = check.classList.value.slice(-1);
                    let left = colors.indexOf(item.innerHTML);
                    
                    //Если кликнул праавильно то +1
                    if(left == last){
                        alert('Успех +1 бал');
                        state.b = state.b + 1;
                        //console.log(state.b);
                        ball.innerHTML = `${state.b}`;
                        modal.innerHTML = ``;
                        CanYouSee();
                        
                    }else{
                        //Если кликнул не правильно то не начисляем
                        alert('Ошибка');
                        modal.innerHTML = ``;
                        CanYouSee();
                    }

                }else{
                    
                    let check = document.querySelector('#go_ul');
                    let last = check.classList.value.slice(-1);
                    let left = colors.indexOf(item.innerHTML);
                    
                    if(left == last){
                        alert('Успех +1 бал');
                        state.b = state.b + 1;
                        //console.log(state.b);
                        ball.innerHTML = `${state.b}`;
                        modal.innerHTML = ``;
                        CanYouSee();
                        
                    }else{
                        alert('Ошибка');
                        modal.innerHTML = ``;
                        CanYouSee();
                    }
                    //Заканчиваем программу на последнем вопросе
                    alert('Конец');
                    //Затираем верстку и создаем новую Для результата
                    modal.innerHTML = `Вы набрали столько баллов - ${state.b}<br>
                    <button id = "start">Попробовать снова</button>`;
                    //Появилась кнопка "попробовать снова" вешаем на нее событие , если нажать на нее то программа перезагружается.
                    document.querySelector('#start').addEventListener('click',()=>{
                        location.reload();
                    })

                }
              

            });
        })
            

  }
  

    CanYouSee();
    
    

    

})