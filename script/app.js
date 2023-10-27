const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/edgar.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/2.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/3.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 25),
	new Result("Ваш уровень выше среднего", 35),
	new Result("Поздравляем теперь посчитайте сколько баллов набрали", 38)
];


const questions = 
[
	new Question(" Эти люди проводят раскопки первобытных стоянок, захоронений и поселений, где жили люди в древности. ", 
	[
		new Answer('Лингвисты', 0),
		new Answer("Этнографы ", 0),
		new Answer("Антрапологи", 0),
		new Answer("Археологи", 1)
	]),
	new Question(" это период – (от греческих слов «палеос» – «древний» и «литос» – «камень»);", 
	[
		new Answer('Палеолит', 1),
		new Answer("Мезолит", 0),
		new Answer("Неолит", 0),
		new Answer("Энеолит", 0)
	]),
	new Question(" В V в. до н. э. – этот древнегреческий историк ..., написал книгу под названием «История», в которой имеются важные сведения по истории нашего края. ", 
	[
		new Answer('Юлий Цезарь ', 0),
		new Answer("Птолемей", 0),
		new Answer("Страбон", 0),
		new Answer("Геродот", 1)
	]),
	new Question("Период времени, когда во главе семьи стояла женщина? ", 
	[
		new Answer('Патриархат ', 0),
		new Answer("Матриархат", 1),
		new Answer("Патриаршество", 0),
		new Answer("Мезолит", 0)
	]),
	new Question("Люди этот професии изучают останки (скелеты и черепа) древнейших людей, стремясь восстановить их внешний облик. ", 
	[
		new Answer('Антрапологи', 1),
		new Answer("Археологи ", 0),
		new Answer("Этнографы ", 0),
		new Answer("Нумизматы", 0)

	]),

	new Question(" Это уникальная пещера в Испании, в которой сохранились цветные настенные рисунки времен позднего палеолита. ", 
	[
		new Answer('Альгамбра', 0),
		new Answer("Ласко ", 0),
		new Answer("Капова пещера", 0),
		new Answer("Альтамира", 1)
	]),
	new Question(" Это вера в наличие в окружающем человека мире сверхъестественных существ (духи, души и Боги).", 
	[
		new Answer('Анимизм', 1),
		new Answer("Магия", 0),
		new Answer("Вера ", 0),
		new Answer("Тотемизм", 0)
	]),
	new Question(" Это известная пещера-грот в горах Байсунтау (Сурхандарьинская область, Узбекистан).", 
	[
		new Answer('Окташ ', 0),
		new Answer("Байсун", 0),
		new Answer("Селенгур", 0),
		new Answer("Тешик-Таш", 1)
	]),
	new Question("Крупное галечное орудие из камня в древности еще называют ", 
	[
		new Answer('Галька ', 0),
		new Answer("Чопер", 1),
		new Answer("Микролит", 0),
		new Answer("Макролит", 0)
	]),
	new Question("Селенгур и Кальбулак это?", 
	[
		new Answer('пещеры периода паеолита  в Узбекистане ', 1),
		new Answer("Наскальные рисунки Франции ", 0),
		new Answer("Первобытные люди ", 0),
		new Answer("такие пещеры в Испании", 0)

	]),

	new Question(" Этот период  каменного века датируеться (12тыс - 7 тыс до н.э) представляет собой временной отрезок между палеолитом и неолитом.", 
	[
		new Answer('Неолит', 0),
		new Answer("Энеолит ", 0),
		new Answer("Палеолит", 0),
		new Answer("Мезолит", 1)
	]),
	new Question("  Этот  период (7-5 тыс до н.э ) называют  завершающим периодом каменного века и появлением  металлических изделиямй.", 
	[
		new Answer('Неолит', 1),
		new Answer("Энеолит", 0),
		new Answer("Палеолит ", 0),
		new Answer("Мезолит", 0)
	]),
	new Question(" Эта эпоха охватывают период 2800–900 лет до н. э. Именно тогда люди научились делать изделия и орудия труда из сплавов  олова и меди", 
	[
		new Answer('Железный век ', 0),
		new Answer("Энеолит", 0),
		new Answer("Неолит", 0),
		new Answer("Бронза", 1)
	]),
	new Question("Мелкое  остроконечное  орудие из камня в древности еще называют ", 
	[
		new Answer('Галька ', 0),
		new Answer("Микролит", 1),
		new Answer("Неолит", 0),
		new Answer("Макролит", 0)
	]),
	new Question("Селенгур и Кальбулак это?", 
	[
		new Answer('пещеры периода паеолита  в Узбекистане ', 1),
		new Answer("Наскальные рисунки Франции ", 0),
		new Answer("Первобытные люди ", 0),
		new Answer("такие пещеры в Испании", 0)

	]),

	new Question("  В качестве правителя-бога он являлся посредником между народом и его богами...", 
	[
		new Answer('Правитель Амон-Ра', 0),
		new Answer("Наполеон", 0),
		new Answer("Номатор", 0),
		new Answer("Фараон", 1)
	]),
	new Question("это такие государства в древности в пределах небольшой территории со столицей в городе-государстве...", 
	[
		new Answer('Номы', 1),
		new Answer("Номархи", 0),
		new Answer("Нубия", 0),
		new Answer("Мемфис", 0)
	]),
	new Question("Первоначально назывался «Белые стены». В период Раннего и Древнего царств был общеегипетской столицей.", 
	[
		new Answer('Александрия', 0),
		new Answer("Афины", 0),
		new Answer("Фивы ", 0),
		new Answer("Мемфис", 1)
	]),
	new Question(" Древние историки изображают их... ордами, вторгшимися и захватившими часть Египта.  ", 
	[
		new Answer('Хетты', 0),
		new Answer("Гиксосы", 1),
		new Answer("Ассирия", 0),
		new Answer("Персия", 0)
	]),
	new Question("фараон Древнего Египта из XVIII династии, сын фараона Тутмоса II  Вошел в историю как мудрый и дальновидный правитель, который за пятьдесят четыре года своего царствования поднял империю ", 
	[
		new Answer('Тутмос III ', 1),
		new Answer("Тутмос II", 0),
		new Answer("Тутмос I", 0),
		new Answer("Это не он", 0)

	]),

	new Question("  Это посредник в общении между людьми и богами. Считается, что они служили помощниками правителя-фараона.", 
	[
		new Answer('Мумии', 0),
		new Answer("Фараоны-бармалеи", 0),
		new Answer("Войны", 0),
		new Answer("Жрецы", 1)
	]),
	new Question("В Египте —  это специальный процесс создания мумии из тела умершего человека (или животного).", 
	[
		new Answer('Бальзамировние', 1),
		new Answer("Мумия", 0),
		new Answer("Захоронение", 0),
		new Answer("Египесткая казнь", 0)
	]),
	new Question("Материал для письма, в древности использовавшийся в Египте и других странах Средиземноморья. ", 
	[
		new Answer('Ветки кедра', 0),
		new Answer("Камыш", 0),
		new Answer("Пальма ", 0),
		new Answer("Папирус", 1)
	]),
	new Question(" Стела из гранодиорита, найденная в 1799 году в Египте возле небольшого города Розетта (теперь Рашид),ключ к изучению Египетских иероглифов  ", 
	[
		new Answer('Античный камень', 0),
		new Answer("Розетский камень", 1),
		new Answer("Сильверстоун", 0),
		new Answer("Антанта", 0)
	]),
	new Question("Египетский «царский локоть» был равен 7 ладоням или примерно ... см ", 
	[
		new Answer('52,5 см ', 1),
		new Answer("2,5 см", 0),
		new Answer("25,5 см", 0),
		new Answer("157,5 см", 0)

	]),




	new Question("Бог творец - он создал всех богов в Египте а еще он покравитель города Мемфис", 
	[
		new Answer('Кукареку', 0),
		new Answer("Птах", 1),
		new Answer("Петух", 0),
		new Answer("гусь", 0)
	]),
	new Question("Бог реки Нил чедовек с головой крокодила ", 
	[
		new Answer('Хаги', 0),
		new Answer("Хапи", 1),
		new Answer("Ра", 0),
		new Answer("Хари", 0)
	]),
	new Question("Женщина -кошка в Египте богиня радости и крастоты ", 
	[
		new Answer('Кошка', 0),
		new Answer("Бастет", 1),
		new Answer("Сфинкс", 0),
		new Answer("Кира", 0)
	]),
	new Question("Первый фараон обединивший Египет в единое царство ", 
	[
		new Answer('Тутмос', 0),
		new Answer("Менес", 1),
		new Answer("Сет", 0),
		new Answer("Камбиз", 0)
	]),
	new Question("Кто такие гиксосы ", 
	[
		new Answer('Кочевники с Востока', 1),
		new Answer("кто-то", 0),
		new Answer("Захавтчики с Юга", 0),
		new Answer("Они грабили пирамиды", 0)
	]),
	new Question("Как звали жену фараона Аменхотепа ", 
	[
		new Answer('Клеопатра', 0),
		new Answer("Нефинтити", 0),
		new Answer("Нефертити", 1),
		new Answer("Хатшепсут", 0)
	]),
	new Question("Кто по мнению историков назвал себя Бого всех богов в Египте Эхнатоном  ", 
	[
		new Answer('Анубис-1', 0),
		new Answer("Аменхотеп-4", 1),
		new Answer("Хеопс", 0),
		new Answer("Джоссер", 0)
	]),
	new Question("Когда впервые стали упоминаться сведения об истории Египта? ", 
	[
		new Answer('1000 тыс лет до.н.э', 0),
		new Answer("4000 тыс лет до.н.э", 1),
		new Answer("2000 тыс лет до.н.э", 0),
		new Answer("3000 тыс лет до.н.э", 0)
	]),
	new Question("Самая длинная река в Африке? ", 
	[
		new Answer('Рейн', 0),
		new Answer("Амазонка", 0),
		new Answer("Нил", 1),
		new Answer("Окс", 0)
	]),
	new Question("Егпетский Бог - Гор это? ", 
	[
		new Answer('Бог неба и земли', 0),
		new Answer("Бог Неба и Охоты", 1),
		new Answer("Бог царства мертвых", 0),
		new Answer("Бог птиц и насекомых", 0)
	]),
	new Question("Самый могущественный фараон древнего царства в Египте", 
	[
		new Answer('Тутмос -1', 0),
		new Answer("Тутмос -3", 1),
		new Answer("Тутмос -2", 0),
		new Answer("Тутмос -4", 0)
	]),
	new Question("Какую тему по истории мы будем проходить в начале второй четверти? ", 
	[
		new Answer('Египет', 0),
		new Answer("Мессопотамия", 1),
		new Answer("Индия", 0),
		new Answer("Китай", 0)
	]),
	new Question("Что именно не могли знать древние Египтяне в древности? ", 
	[
		new Answer('Золото и серебро', 0),
		new Answer("Оружие", 0),
		new Answer("Железо и Колесо", 1),
		new Answer("Инопланетян", 0)
	]),
	new Question("Как называют людей изучающие историю Египта ", 
	[
		new Answer('Археологи', 0),
		new Answer("Египтологи", 1),
		new Answer("Антрапологи", 0),
		new Answer("Этнографы", 0)
	]),
	new Question("Столица Нижниего Египта принято считать город? ", 
	[
		new Answer('Фивы', 0),
		new Answer("Мемфис", 1),
		new Answer("Рим", 0),
		new Answer("Лондон", 0)
	]),


];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



