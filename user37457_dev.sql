-- phpMyAdmin SQL Dump
-- version 3.3.7deb7
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Мар 20 2013 г., 07:58
-- Версия сервера: 5.5.30
-- Версия PHP: 5.3.22-1~dotdeb.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `user37457_dev`
--

-- --------------------------------------------------------

--
-- Структура таблицы `options`
--

CREATE TABLE IF NOT EXISTS `options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `qid` (`question_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=49 ;

--
-- Дамп данных таблицы `options`
--

INSERT INTO `options` (`id`, `question_id`, `text`) VALUES
(1, 1, 'сбор князем дани с подвластных ему земель'),
(2, 1, 'собрание княжеской дружины'),
(4, 1, 'княжеский суд над общинниками'),
(3, 1, 'ополчение, состоящее из всех мужчин племени'),
(6, 2, 'крещение Руси'),
(7, 2, 'походы князя Олега на Византию'),
(8, 2, 'начало кодификации древнерусских законов'),
(9, 2, 'призвание варягов'),
(10, 3, 'десятина'),
(11, 3, 'урок'),
(12, 3, 'подушная подать'),
(13, 3, 'пожилое'),
(14, 4, 'Русская Правда'),
(15, 4, 'Соборное уложение'),
(16, 4, 'Стоглав'),
(17, 4, 'Судебник'),
(18, 5, 'Крещение Руси'),
(19, 5, '123'),
(20, 5, '321'),
(21, 5, '4321'),
(22, 7, '6'),
(23, 7, '38'),
(24, 7, 'An unlimited number '),
(25, 8, '&&'),
(26, 8, '||'),
(27, 8, '!'),
(28, 10, 'class aClass{public:int x;};'),
(29, 10, '/* A comment */'),
(30, 10, 'char x=12;'),
(31, 11, 'int main()'),
(32, 11, 'int main(int argc, char *argv[])'),
(33, 11, 'They both work'),
(34, 12, 'True'),
(35, 12, 'False'),
(36, 12, 'Invalid statement'),
(37, 13, 'char *a=new char[20];'),
(38, 13, 'char a=new char[20];'),
(39, 13, 'char a=new char(20.0);'),
(40, 14, '->'),
(41, 14, '>>'),
(42, 14, '*'),
(43, 15, 'sin()'),
(44, 15, 'kbhit()'),
(45, 15, 'tmpnam()'),
(46, 16, 'True'),
(47, 16, 'False'),
(48, 16, 'It depends on the variable type');

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL DEFAULT '',
  `text` varchar(255) NOT NULL DEFAULT '',
  `type` varchar(16) NOT NULL DEFAULT '',
  `answer` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id` (`test_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `questions`
--

INSERT INTO `questions` (`id`, `test_id`, `name`, `text`, `type`, `answer`) VALUES
(1, 1, 'Вопрос 1', 'Что в Древней Руси называлось полюдьем:', 'comparison', '0,1'),
(2, 1, 'Вопрос 2', 'Какое из событий произошло позже всех остальных:', 'one', '1'),
(3, 1, 'Вопрос 3', 'В Древней Руси налог в пользу церкви назывался:', 'one', '0'),
(5, 1, 'Вопрос 4', 'Что изображено на картинке:<br><img src="img/kresh1.jpg">', 'one', '0'),
(4, 1, 'Вопрос 5', 'Свод законов Древней Руси назывался:', 'many', '0,1,2,3'),
(7, 2, 'Question #1', 'What number of digits that can be accurately stored in a float (based on the IEEE Standard 754)?', 'one', '0'),
(8, 2, 'Question #2', 'Which of the following is evaluated first:', 'one', '2'),
(9, 2, 'Question #3', 'What does <img src="img/rav.jpg">equal (in C and C++)?', 'word', '0'),
(10, 2, 'Question #4', 'Which is not valid in C?', 'one', '0'),
(11, 2, 'Question #5', 'Which of the following is not a valid declaration for main()?', 'one', '2'),
(12, 2, 'Question #6', 'Evaluate the following as true or false: !(1 &&0 || !1)', 'one', '0'),
(13, 2, 'Question #7', 'Which command properly allocates memory?', 'one', '0'),
(14, 2, 'Question #8', 'What operator is used to access a struct through a pointer?', 'one', '0'),
(15, 2, 'Question #9', 'Which is not an ANSI C++ function?', 'one', '1'),
(16, 2, 'Question #10', 'True or false: If you continuously increment a variable, it will become negative?', 'one', '2');

-- --------------------------------------------------------

--
-- Структура таблицы `tests`
--

CREATE TABLE IF NOT EXISTS `tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `tests`
--

INSERT INTO `tests` (`id`, `name`) VALUES
(1, 'История'),
(2, 'C++');
