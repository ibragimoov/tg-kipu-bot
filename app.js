import dotenv from "dotenv";
import procces from "process";
import express from "express";
import { Markup, Telegraf } from "telegraf";
import * as buttons from "./markup/keywords.js";
import { Action } from "./constant/action.js";
import mysql from "mysql2";
import { label } from "./controllers/label_controller.js";

const app = express();

dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "magstep",
    port: 3306,
    password: "eldorado123rulit",
});

connection.connect();

app.get("/", async (req, res) => {
    res.send("MagStep");
});

const bot = new Telegraf(procces.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.replyWithHTML(
        `<b>Привет, ${ctx.from.first_name}</b>\nЯ помогаю студентам, абитуриентам КИПУ имени Февзи Якубова быстро находить нужную информацию.`,
        buttons.MAIN_MENU()
    );
});

bot.on("text", async (ctx) => {
    ctx.reply("Ожидайте несколько секунд");
    ctx.reply(await label.label_get(ctx.message.text));
});

bot.on("voice", (ctx) => {
    ctx.reply("Какой чудный голос");
});

bot.on("sticker", (ctx) => {
    ctx.reply("Прикольный стикер");
});

bot.on("edited_message", (ctx) => {
    ctx.reply("Вы успешно изменили сообщение");
});

bot.action(Action.ADMISSION, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Выберите", buttons.ENTRANCE());
});

bot.action(Action.UNIVERSITY, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Выберите", buttons.UNIVERSITY());
});

bot.action(Action.BACK, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Меню:", buttons.MAIN_MENU());
});

bot.action(Action.BACK_FROM_ADMISSTION, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Выберите:", buttons.ENTRANCE());
});

bot.action(Action.BACK_FROM_UNIVERSITY, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Выберите", buttons.UNIVERSITY());
});

bot.action(Action.BACK_FROM_MAGISTRANCY, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Выберите", buttons.MAGISTRACY1());
});

bot.action("Магистратура", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Магистратура", buttons.MAGISTRACY1());
});

bot.action("u6", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Крымский инженерно-педагогический университет имени Февзи Якубова</b>🌆 - высшее учебное заведения Симферополя, основанное в 1993 году с учётом потребностей возвращающихся из депортации крымских татар. Прежние названия: Крымский государственный инженерно-педагогический университет, Крымский государственный индустриально-педагогический институт.🏬 Функционируют филиалы в Джанкое, Керчи и Евпатории. При университете создан Научно-исследовательский центр крымскотатарского языка и литературы (директор — Исмаил Асанович Керимов, д.ф.н., профессор).🔬\n\nИсточник: https://kipu-rc.ru/",
        buttons.BACK_FROM_UNIVERSITY()
    );
});

bot.action("1", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Магистратуру</b> принято определять как некую академическую степень (в некоторых странах как ученую степень), которая следует за бакалавриатом и присваивается магистрантам — студентам, успешно закончившим обучение на данном уровне.🆙\n\nДлительность магистратуры варьируется в зависимости от университета и учебной программы. В среднем — 1.5-2 года.⌛\n\nВ европейских странах магистратура считается одним из трех элементов Болонской системы высшего образования, наряду с бакалавриатом и аспирантурой.🎓\n\nЭта система призвана облегчить интеграцию студентов из разных стран в другие европейские университеты за счет системы оценивания и кредитования учебного процесса.👨‍🏫\n\nФормат магистерского диплома, полученного в рамках Болонской системы, позволяет без проблем расширять и углублять свою квалификацию в любой другой стране, участвующей в Болонском процессе.🗾",
        buttons.BACK_FROM_MAGISTRANCY()
    );
});

bot.action("2", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        '<b>Вариантов ответов много</b>, размещаю по частоте ответов студетов, начиная с самых популярных:\n\n•    найти хорошую работу\n•    для получения знаний (на уточняющий вопрос о том, а почему не получить нужные знания самостоятельно, студенты обычно не готовы быстро и складно ответить)\n	для получения навыков (каких именно, студенты не назовут)\n•    для получия "корочек". <b>По крайней мере, откровенно</b>\n•	для продвижения по службе (обычно так говорят те, для кого важно иметь диплом магистра, например, для юристов)\n•	чтобы начать думать как магистр.',
        buttons.BACK_FROM_MAGISTRANCY()
    );
});

bot.action("3", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Закон не запрещает</b> студенту параллельно учиться в двух институтах или на двух разных факультетах,\nполучая базовое высшее образование, например, на дневном и на заочном отделении.\nОднако на бюджете можно учиться только в одном месте, второе или параллельное высшее образование будет платным.\n\nБудет ли вторая магистратура платной для обучающегося? Здесь действует то же правило, что и для базового высшего образования.\n\n«Если имеется в виду образование одного уровня (высшее, среднее специальное), то дважды обучаться на бюджете нельзя",
        buttons.BACK_FROM_MAGISTRANCY()
    );
});

bot.action("4", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Институты повышения квалификации и переподготовки кадров</b>> обычно включены в образовательную систему.\n\nЧаще всего подобные учреждения размещаются при высших и средних профессиональных учебных заведениях.\n\nВажно знать, что диплом профессиональной переподготовки по специальности можно получить исключительно в образовательном учреждении, имеющем лицензию на дополнительное профобразование.\n\nПовышение профессиональной квалификации занимает меньше времени, чем переподготовка, и котируется немного ниже последней.\n\nПрофпереподготовка и повышение квалификации персонала - основные особенности. №. Наименование обучения.",
        buttons.BACK_FROM_MAGISTRANCY()
    );
});

bot.action("5", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "Поэтому, прежде чем <b>приступать к выбору магистратуры</b>, постарайтесь четко ответить на вопрос,\n\nчем вы хотите заниматься в дальнейшем и какие знания вам для этого нужны.\nИменно это и должно стать отправной точкой при выборе вуза.",
        buttons.BACK_FROM_MAGISTRANCY()
    );
});

bot.action("6", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Магистратура</b> – это отличный способ освоить новую для себя профессию.\n\nНо не стоит заниматься кардинальной сменой...\n\nВсе же лучше выбирать смежные специальности или те, которые кажутся необходимы для дополнения бакалавриата",
        buttons.BACK_FROM_MAGISTRANCY()
    );
});

// Библиотека
bot.action("u3", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>В структуре Научной библиотеки КИПУ имени Февзи Якубова</b>:\n\nЧитальные залы:\n1 зал –  издания по естественным и техническим наукам;\n2 зал – экономические, педагогические и психологические науки;\n3 зал – издания по гуманитарным и филологическим наукам, литература по искусству.\n\nИсточник: http://cepulib.ru/index.php/ru/biblioteka/struktura",
        buttons.BACK_TO_UNIVERSITY()
    );
});

// Факультеты/Кафедры
bot.action("u1", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Факультеты</b>\n\n•    Факультет экономики, менеджмента и информационных технологий\n•    Факультет филологии\n•    Инженерно-технологический\n•    Факультет истории, искусств,крымскотатарского языка и литературы\n•    Факультет психологии и педагогческого образования\n\nИсточник:https://kipu-rc.ru/",
        buttons.BACK_TO_UNIVERSITY()
    );
});

// Практика
bot.action("u2", (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Факультеты</b>\n\n•    Институт гуманитарный\n•    Институт медицинского образования\n•    Институт непрерывного педагогического образования\n•    Институт политехнический\n•    Институт сельского хозяйства и природных ресурсов\n•    Институт электронных и информационных систем\n•    Институт экономики и управления\n\nИсточник: https://www.abitura.pro/directory/velikiy-novgorod/novgu#department-1452",
        buttons.BACK_TO_UNIVERSITY()
    );
});

bot.action(Action.BACK_TO_UNIVERSITY, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Выберите", buttons.UNIVERSITY());
});

// Наука
bot.action(Action.SCIENCE, (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Полезные материалы</b>\n\n- <a href='https://kipu-rc.ru/nauka1/konkursy-granty'>Конкурсы/Гранты</a>\n- <a href='https://kipu-rc.ru/nauka1/sborniki'>Издания университета</a>\n- <a href='http://uz.kipu-rc.ru/'>Ученые записи</a>\n- <a href='https://kipu-rc.ru/nauka1/dissertatsionnyj-sovet-d-99-2-081-02'>Диссертационный совет</a>\n\nИсточник https://kipu-rc.ru/",
        buttons.BACK_TO_MENU()
    );
});

// Школьникам
bot.action(Action.STUDENTS, (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Полезные материалы</b>\n\n- <a href='https://kipu-rc.ru/downloads/2022/pk/perechen_dokov.pdf'>Перечень необходимых документов абитуриенту</a>\n- <a href='https://priem.kipu-rc.ru:9443/bak.html'>Конкурсные списки</a>- <a href='https://kipu-rc.ru/abiturientu/dovuzovskaya-podgotovka'>\n- Подготовительные курсы к ЕГЭ</a>\n- <a href='https://kipu-rc.ru/abiturientu/pravila-priema-v-aspiranturu-na-2022-2023-uchebnyj-god'>Правила приема 2023</a>\n\nИсточник https://kipu-rc.ru/",
        buttons.BACK_FROM_ADMISSTION()
    );
});

// Аспирантура
bot.action(Action.ASPIRANTURA, (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Перечень направлений подготовки в аспирантуре КИПУ имени Февзи Якубова</b>\n\n•    Теория и методика обучения и воспитания (информатика)\n•    Русский язык. Языки народов России\n•    Русская литература и литературы народов Российской Федерации\n•    Методология и технология профессионального образования\n•    Технология и оборудование механической и физико-технической обработки\n•    Мировая экономика\n•    Всеобщая история \n•    Археология\n•    ООбщая психология, психология личности, история психологии\n•    Возрастная психология\n•    Социальная психология, политическая и экономическая психологии\n•    Языки народов зарубежных стран (германские языки)\n•    Теоретическая, прикладная и сравнительно-сопоставительная лингвистика\n•    Общая педагогика, история педагогики и образования\n•    Региональная и отраслевая экономика\n•Отечественная история\n•Программа вступительного испытания по иностранному языку (английскому)\n\nИсточник: https://kipu-rc.ru/abiturientu/pravila-priema-v-aspiranturu-na-2022-2023-uchebnyj-god",
        buttons.BACK_FROM_ADMISSTION()
    );
});

// Докторантура
bot.action(Action.DOCTORANTURA, (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>В докторантуру принимаются лица, имеющие степень кандидата наук.\n\nСрок подготовки докторантов – три года, форма обучения – очная.</b>\n\n•    13.00.01 - общая педагогика, история педагогики и образования;\n•    13.00.08 - теория и методика профессионального образования;\n•    10.02.01 - русский язык;\n•    10.02.19 - теория языка;\n•    01.04.02 - теоретическая физика;\n•    01.04.07 - физика конденсированного состояния.\n\nИсточник: https://www.novsu.ru/graduate_student/doctorate/",
        buttons.BACK_FROM_ADMISSTION()
    );
});

// Общежитие
bot.action(Action.HOSTEL, (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(
        "<b>Места в общежитиях предоставляются</b>\n\nиногородним студентам и иностранным обучающимся очной формы по основным образовательным программам (студентам, аспирантам, ординаторам), а также обучающимся заочной формы на период аттестации.\n\nВ общежитии есть все для комфортной жизни: уютные комнаты, учебные комнаты для индивидуальных занятий, кухни, душевые, постирочные, спортивные залы.\n\nИсточник: https://kipu-rc.ru/",
        buttons.BACK_TO_MENU()
    );
});

app.listen(procces.env.PORT, () => {
    console.log(`My server is running on port ${procces.env.PORT}`);
    bot.launch();
});
