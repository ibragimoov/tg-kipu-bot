import { Markup } from "telegraf";
import { Action } from "../constant/action.js";

export function BACK_FROM_ADMISSTION() {
    return Markup.inlineKeyboard([
        [{ text: "Назад", callback_data: Action.BACK_FROM_ADMISSTION }],
    ]);
}

export function BACK_FROM_UNIVERSITY() {
    return Markup.inlineKeyboard([
        [{ text: "Назад", callback_data: Action.BACK_FROM_UNIVERSITY }],
    ]);
}

export function BACK_FROM_MAGISTRANCY() {
    return Markup.inlineKeyboard([
        [{ text: "Назад", callback_data: Action.BACK_FROM_MAGISTRANCY }],
    ]);
}

export function BACK_TO_UNIVERSITY() {
    return Markup.inlineKeyboard([
        [{ text: "Назад", callback_data: Action.BACK_TO_UNIVERSITY }],
    ]);
}

export function BACK_TO_MENU() {
    return Markup.inlineKeyboard([
        [{ text: "Назад", callback_data: Action.BACK }],
    ]);
}

export function MAIN_MENU() {
    return Markup.inlineKeyboard([
        [
            { text: Action.UNIVERSITY, callback_data: Action.UNIVERSITY },
            { text: Action.ADMISSION, callback_data: Action.ADMISSION },
        ],
        [
            { text: Action.SCIENCE, callback_data: Action.SCIENCE },
            { text: Action.HOSTEL, callback_data: Action.HOSTEL },
        ],
    ]).resize();
}

export function ENTRANCE() {
    return Markup.inlineKeyboard([
        [
            { text: Action.MAGISTRACY, callback_data: "Магистратура" },
            { text: Action.ASPIRANTURA, callback_data: Action.ASPIRANTURA },
        ],
        [
            { text: Action.DOCTORANTURA, callback_data: Action.DOCTORANTURA },
            { text: Action.STUDENTS, callback_data: Action.STUDENTS },
        ],
        [{ text: Action.BACK, callback_data: Action.BACK }],
    ]);
}

export function UNIVERSITY() {
    return Markup.inlineKeyboard([
        [
            { text: "Факультеты", callback_data: "u1" },
            { text: "Библиотека", callback_data: "u3" },
        ],
        [{ text: "Об университете", callback_data: "u6" }],
        [{ text: Action.BACK, callback_data: Action.BACK }],
    ]);
}

export function MAGISTRACY1() {
    return Markup.inlineKeyboard([
        [{ text: "Что такое магистратура?", callback_data: "1" }],
        [{ text: "Зачем магистратура?", callback_data: "2" }],
        [
            {
                text: "Можно ли учиться сразу в двух магистратурах?",
                callback_data: "3",
            },
        ],
        [
            {
                text: "Магистратура, повышение квалификации и профессиональная переподготовка: как разобраться?",
                callback_data: "4",
            },
        ],
        [
            {
                text: "Выбор магистратуры – проверяй, но доверяй?",
                callback_data: "5",
            },
        ],
        [
            {
                text: "Как не выбрать умирающую специальность магистратуры?",
                callback_data: "6",
            },
        ],
        [
            {
                text: Action.BACK_FROM_ADMISSTION,
                callback_data: Action.BACK_FROM_ADMISSTION,
            },
        ],
    ]);
}
