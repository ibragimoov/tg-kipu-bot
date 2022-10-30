import mysql from "mysql2/promise";
import axios from "axios";

let connection;
(async function () {
    connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "magstep",
        password: "eldorado123rulit",
    });
})();

//парсинг предложения в метки
export class label {
    static async label_get(text) {
        let str = text.replace(/[.,?!]/g, "");
        let label = str.split(" ");
        let labels = [];
        for (let key2 of label) {
            let word = await check_speller(key2);
            await vocabulary(word);
            word = await morf_form(word);
            labels.push(word);
        }
        //console.log(labels)
        return (
            (await get_answer(labels)) +
            "\n" +
            "\n" +
            "Если ответ не соответствует заданному вопросу, пожалуйста, проверьте правильность написания вопроса или поищите информацию в меню бота."
        );
    }
}

//вывод нужной морфологической формы
async function morf_form(word) {
    try {
        let url = "https://how-to-all.com/морфология:" + word;
        url = encodeURI(url);
        let new_word = (await axios.get(url)).data;
        new_word = await new_word.split(
            '</div></div></div><div class="goo1links"></div></div></div><div class="goo3a"'
        )[0];
        new_word = await new_word.split(
            'Начальная форма: </strong></div><div class="chrd">'
        )[1];
        //await console.log('ОТВЕТ САЙТИКА: ', new_word)
        return new_word;
    } catch (err) {
        console.log(err);
    }
}

//исправление ошибок пользователя через апишку спеллера
async function check_speller(word) {
    try {
        let url =
            "https://speller.yandex.net/services/spellservice.json/checkText?text=" +
            word +
            "&lang=ru";
        url = encodeURI(url);
        // console.log((await axios.get(url)).data[0])
        if (typeof (await axios.get(url)).data[0] !== "undefined") {
            let new_word = (await axios.get(url)).data[0]["s"][0];
            //await console.log('ОТВЕТ САЙТИКА: ', ((await axios.get(url)).data[0]['s'][0]))
            return new_word;
        } else {
            return word;
        }
    } catch (err) {
        //console.log(err)
    }
}

//занести в словарик бд
async function vocabulary(word) {
    let counter = 0;
    console.log("начальное слово:", word);
    try {
        let data = await connection.query("SELECT bad_word FROM vocabulary");
        for (const row of data[0]) {
            if (row["bad_word"] === word) {
                counter++;
                console.log(row["bad_word"], counter);
            }
        }
        if (counter === 0) {
            let good_word = await morf_form(word);
            if (typeof good_word !== "undefined") {
                console.log("правильное слово: ", good_word);
                if (good_word !== word) {
                    await connection.query(
                        "INSERT INTO vocabulary(bad_word, good_word) VALUES (?, ?)",
                        [word, good_word]
                    );
                }
            }
        }
    } catch (err) {
        // console.log(err)
    }
}

//вывод ответа бота
async function get_answer(labels) {
    let DB = [];
    let data = await connection.query("SELECT * FROM labels");
    let max_match_len = 0;
    let answer;
    let find_match = function (arr1, arr2) {
        return arr1.filter(function (n) {
            return arr2.indexOf(n) !== -1;
        });
    };

    for (const row of data[0]) {
        let lbl = row.labels.split(",");
        for (let i = 0; i < lbl.length; i++) {
            lbl[i] = lbl[i].replace("\t", "");
        }

        console.log(lbl, " : ", find_match(labels, lbl).length);

        //часть ниже позволяет обновлять метки в соответствии с начальной формой, нужно раскоммитить и запустить в случае обновления меток
        /* let lbl1 = lbl.split(',');
         let lbl2 = []
         for (let key of lbl1) {
             lbl2.push(await morf_form(key))
         }
         lbl2 = lbl2.join(',')
        if (row.id > 177) {
            try {
                connection.query("UPDATE labels SET labels =? WHERE id =?", [lbl2, row.id])
                console.log('UPDATE labels SET labels =', lbl2, 'WHERE id =', row.id)
            } catch (err) {
                console.log(err)
            }
        }*/
        // console.log(find_match(labels, lbl).length);
        if (max_match_len < find_match(labels, lbl).length) {
            max_match_len = find_match(labels, lbl).length;
            answer = row.answer;
        }
    }
    //если ответ не найден
    if (max_match_len === 0) {
        answer =
            "Я пока что не могу дать ответ на ваш вопрос. Вы можете воспользоваться меню для поиска интересующей вас темы";
    }
    // console.log(answer)
    return answer;
}
