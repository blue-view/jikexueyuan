-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 11 月 25 日 03:50
-- 服务器版本: 5.5.40
-- PHP 版本: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `newstype` int(11) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` datetime NOT NULL,
  `newssrc` char(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES
(1, 5, 'nodejs版本-精选', 'img/pic.png', '2016-11-01 00:00:00', '百度新闻'),
(2, 2, 'nodejs版本-百家', 'img/pic2.jpeg', '2016-11-18 00:00:00', '百家新闻'),
(3, 3, 'nodejs版本-本地', 'img/pic.png', '2016-11-10 00:00:00', '本地新闻'),
(4, 4, 'nodejs版本-娱乐', 'img/pic.png', '2016-11-10 00:00:00', '娱乐新闻'),
(5, 5, 'nodejs版本-社会', 'img/pic.png', '2016-11-12 00:00:00', '社会新闻'),
(6, 6, 'nodejs版本-军事', 'img/pic.png', '2016-11-10 00:00:00', '军事新闻'),
(7, 7, 'nodejs版本-女人', 'img/pic.png', '2016-11-09 00:00:00', '女人新闻'),
(8, 8, 'nodejs版本-搞笑', 'img/pic.png', '2016-11-11 00:00:00', '搞笑新闻'),
(9, 9, 'nodejs版本-互联网', 'img/pic2.jpeg', '2016-11-17 00:00:00', '互联网新闻'),
(10, 10, 'nodejs版本-科技', 'img/pic.png', '2016-11-11 00:00:00', '科技新闻'),
(11, 1, 'nodejs=测试更新-新闻类型-图片', 'img/pic2.jpeg', '2016-11-07 00:00:00', '更新功能'),
(12, 2, '测试数据是否重复', 'img/pic2.jpeg', '2016-11-09 00:00:00', '极客学院'),
(13, 3, '测试数据是否重复-2', 'img/pic2.jpeg', '2016-11-09 14:50:00', '极客学院'),
(17, 4, '测试特殊<>&&&''''""7', 'img/pic.png', '2016-11-10 00:00:00', '特殊字符'),
(20, 5, '测试数据2', 'img/pic2.jpeg', '2016-11-05 00:00:00', '数据库连接'),
(21, 2, '测试数据21', 'img/pic.png', '2016-11-08 10:10:00', '新闻来源'),
(22, 1, '测试123', 'img/pic.png', '2016-11-11 06:35:00', '新闻来源'),
(24, 1, '测试数据1', 'img/pic.png', '2016-11-03 06:30:00', '百度新闻'),
(25, 1, '测试日期控件', 'img/pic.png', '2016-11-10 10:45:00', '百度百科'),
(28, 1, '<script>alert(''1'');</script>', 'img/pic.png', '2016-11-02 05:25:00', '百度新闻'),
(29, 2, '测试数据233', 'img/pic.png', '2016-11-09 07:35:00', '<script>alert(''1'');</script>');

-- --------------------------------------------------------

--
-- 表的结构 `newstype`
--

CREATE TABLE IF NOT EXISTS `newstype` (
  `id` int(11) NOT NULL,
  `name` char(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `newstype`
--

INSERT INTO `newstype` (`id`, `name`) VALUES
(1, '精选'),
(2, '百家'),
(3, '本地'),
(4, '娱乐'),
(4, '娱乐'),
(5, '社会'),
(6, '军事'),
(7, '女人'),
(8, '搞笑'),
(9, '互联网'),
(10, '科技');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
